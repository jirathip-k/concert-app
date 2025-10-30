"use client";

import { FaUser, FaTrash } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useConcerts } from "@/context/concert";
import { useState } from "react";
import { deleteConcert } from "./actions";
import { Notification } from "@/components/notification";
import { ConfirmationModal } from "@/components/confirmation-modal";

const Page = () => {
  const { concerts } = useConcerts();
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [concertIdToActOn, setConcertIdToActOn] = useState<number | null>(null);

  const checkIfReserved = (reservations: Array<any>) => {
    return reservations.some(
      (reservation) => reservation.action === "reserved",
    );
  };
  // Handle reservation action
  const handleDelete = async (concertId: number) => {
    try {
      await deleteConcert(concertId);
      setNotification({
        message: "Delete successfully",
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
  const openConfirmationModal = (concertId: number) => {
    setConcertIdToActOn(concertId);
    setIsModalOpen(true);
  };

  return (
    <div className="w-full">
      {notification && (
        <Notification message={notification.message} type={notification.type} />
      )}

      {concerts.map(({ id, name, description, seats }) => (
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
            <button
              onClick={() => openConfirmationModal(id)}
              className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 flex items-center"
            >
              <RiDeleteBin6Line className="mr-2" />

              <span> Delete</span>
            </button>
          </div>
        </div>
      ))}
      <ConfirmationModal
        isOpen={isModalOpen}
        action="delete"
        onConfirm={() => {
          if (concertIdToActOn) {
            handleDelete(concertIdToActOn);
          }
        }}
        onCancel={() => setIsModalOpen(false)}
        type="error"
      />
    </div>
  );
};
export default Page;
