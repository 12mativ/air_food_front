'use client'

import ChosenFlight from "@/components/ChosenFlight";
import Flights from "@/components/Flights";
import { getFlights } from "@/utils/api";
import { useEffect, useState } from "react";

export interface Flight {
  airline_name: string
  takeoff_date: string
  takeoff_time: number
  flight_duration: number
}

export default function FlightMenu() {
  const [flights, setFlights] = useState<Flight[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [chosenFlight, setChosenFlight] = useState<Flight | undefined>(undefined)

  useEffect(() => {
    getFlights().then(res => {
      if (res?.data.flights.length === 0) {
        setFlights([
          { airline_name: 'Аэрофлот', takeoff_date: '2023-12-12', takeoff_time: 0.5, flight_duration: 3.5 },
          { airline_name: 'Аэрофлот', takeoff_date: '2023-12-12', takeoff_time: 1.5, flight_duration: 6.35 },
          { airline_name: 'Аэрофлот', takeoff_date: '2023-12-12', takeoff_time: 3.25, flight_duration: 1.75 }
        ])
        setIsLoading(false)
      } else {
        setFlights(res?.data.flights)
      }
    }).finally(() => setIsLoading(false))

  }, [])

  return (
    chosenFlight
      ? (
        <ChosenFlight setChosenFlight={setChosenFlight} {...chosenFlight} />
      )
      : (<Flights
        isLoading={isLoading}
        flights={flights}
        setChosenFlight={setChosenFlight}
      />)
  )
}