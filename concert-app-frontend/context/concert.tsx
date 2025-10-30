"use client";
import { createContext, useContext } from "react";

type Reservation = {
  id: number;
  action: "reserved" | "canceled";
};
type Concert = {
  id: number;
  name: string;
  description: string;
  totalSeats: number;
  reservations: Reservation[];
};

const ConcertContext = createContext<{ concerts: Concert[] }>({ concerts: [] });

export function ConcertProvider({
  concerts,
  children,
}: {
  concerts: Concert[];
  children: React.ReactNode;
}) {
  return (
    <ConcertContext.Provider value={{ concerts }}>
      {children}
    </ConcertContext.Provider>
  );
}

export const useConcerts = () => useContext(ConcertContext);
