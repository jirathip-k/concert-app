"use client";
import { FaUser, FaCheck, FaTimes } from "react-icons/fa";
import { reserveConcert } from "./actions";
import { useState } from "react";

import { useConcerts } from "@/context/concert";
import { Notification } from "@/components/notification";
import { ConfirmationModal } from "@/components/confirmation-modal";

const Page = () => {
  const { concerts } = useConcerts();
  const userId = 10000;
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionType, setActionType] = useState<string | null>(null);
  const [concertIdToActOn, setConcertIdToActOn] = useState<number | null>(null);

  const checkIfReserved = (reservations: Array<any>) => {
    return reservations.some(
      (reservation) => reservation.action === "reserved",
    );
  };
  // Handle reservation action
  const handleReservationAction = async (action: string, concertId: number) => {
    try {
      await reserveConcert(userId, concertId, action);
      setNotification({
        message:
          action === "reserved"
            ? "Concert Reserved Successfully!"
            : "Reservation Canceled.",
        type: "success",
      });
      setIsModalOpen(false); // Close the modal after action
    } catch (error) {
      setNotification({
        message: "Something went wrong!",
        type: "error",
      });
      setIsModalOpen(false); // Close the modal in case of an error
    }
  };

  // Open confirmation modal
  const openConfirmationModal = (action: string, concertId: number) => {
    setActionType(action);
    setConcertIdToActOn(concertId);
    setIsModalOpen(true);
  };

  return (
    <div className="w-full">
      {notification && (
        <Notification message={notification.message} type={notification.type} />
      )}

      {concerts.map(({ id, name, description, seats, reservations }) => {
        const isReserved = checkIfReserved(reservations);
        return (
          <div
            key={id}
            className="border border-gray-100  rounded-md p-4 mb-4 shadow-sm bg-white"
          >
            <h3 className="text-blue-600 font-semibold mb-2 cursor-pointer hover:underline">
              {name}
            </h3>
            <p className="text-gray-700 mb-3">{description}</p>

            <div className="flex items-center justify-between text-gray-600 text-sm">
              <div className="flex items-center">
                <FaUser className="mr-1" />
                <span>{seats}</span>
              </div>
              <div className="flex space-x-2">
                {isReserved ? (
                  <button
                    onClick={() => openConfirmationModal("canceled", id)}
                    className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 flex items-center"
                  >
                    Cancel
                  </button>
                ) : (
                  <button
                    onClick={() => openConfirmationModal("reserved", id)}
                    className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 flex items-center"
                  >
                    Reserve
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
      {/* Confirmation Modal */}

      <ConfirmationModal
        isOpen={isModalOpen}
        action={actionType ?? "action"}
        onConfirm={() => {
          if (concertIdToActOn && actionType) {
            handleReservationAction(actionType, concertIdToActOn);
          }
        }}
        onCancel={() => setIsModalOpen(false)}
        type={actionType === "reserved" ? "success" : "error"}
      />
    </div>
  );
};
export default Page;
