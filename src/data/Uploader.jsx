import { useState } from "react";
import { isFuture, isPast, isToday } from "date-fns";
import supabase from "../services/supabase";
import Button from "../ui/Button";
import { subtractDates } from "../utils/helpers";

import { Bookings } from "./data-Bookings";
import { cabins } from "./data-cabins";
import { guests } from "./data-guests";

// const originalSettings = {
//   minBookingLength: 3,
//   maxBookingLength: 30,
//   maxGuestsPerBooking: 10,
//   breakfastPrice: 15,
// };

async function deleteGuests() {
  const { error } = await supabase.from("guests").delete().gt("id", 0);
  if (error) console.log(error.message);
}

async function deleteCabins() {
  const { error } = await supabase.from("cabins").delete().gt("id", 0);
  if (error) console.log(error.message);
}

async function deleteBookings() {
  const { error } = await supabase.from("Bookings").delete().gt("id", 0);
  if (error) console.log(error.message);
}

async function createGuests() {
  const { error } = await supabase.from("guests").insert(guests);
  if (error) console.log(error.message);
}

async function createCabins() {
  const { error } = await supabase.from("cabins").insert(cabins);
  if (error) console.log(error.message);
}

async function createBookings() {
  // Bookings need a guestid and a cabinid. We can't tell Supabase IDs for each object, it will calculate them on its own. So it might be different for different people, especially after multiple uploads. Therefore, we need to first get all guestids and cabinids, and then replace the original IDs in the Booking data with the actual ones from the DB
  const { data: guestsIds } = await supabase
    .from("guests")
    .select("id")
    .order("id");
  const allGuestids = guestsIds.map((cabin) => cabin.id);
  const { data: cabinsIds } = await supabase
    .from("cabins")
    .select("id")
    .order("id");
  const allCabinids = cabinsIds.map((cabin) => cabin.id);

  const finalBookings = Bookings.map((Booking) => {
    // Here relying on the order of cabins, as they don't have and ID yet
    const cabin = cabins.at(Booking.cabinid - 1);
    const numNight = subtractDates(Booking.endDate, Booking.startDate);
    const cabinPrice = numNight * (cabin.regularPrice - cabin.discount);
    const extrasPrice = Booking.hasBreakfast
      ? numNight * 15 * Booking.numGuests
      : 0; // hardcoded breakfast price
    const totalPrice = cabinPrice + extrasPrice;

    let status;
    if (
      isPast(new Date(Booking.endDate)) &&
      !isToday(new Date(Booking.endDate))
    )
      status = "checked-out";
    if (
      isFuture(new Date(Booking.startDate)) ||
      isToday(new Date(Booking.startDate))
    )
      status = "unconfirmed";
    if (
      (isFuture(new Date(Booking.endDate)) ||
        isToday(new Date(Booking.endDate))) &&
      isPast(new Date(Booking.startDate)) &&
      !isToday(new Date(Booking.startDate))
    )
      status = "checked-in";

    return {
      ...Booking,
      numNight,
      cabinPrice,
      extrasPrice,
      totalPrice,
      guestid: allGuestids.at(Booking.guestid - 1),
      cabinid: allCabinids.at(Booking.cabinid - 1),
      status,
    };
  });

  console.log(finalBookings);

  const { error } = await supabase.from("Bookings").insert(finalBookings);
  if (error) console.log(error.message);
}

function Uploader() {
  const [isLoading, setIsLoading] = useState(false);

  async function uploadAll() {
    setIsLoading(true);
    // Bookings need to be deleted FIRST
    await deleteBookings();
    await deleteGuests();
    await deleteCabins();

    // Bookings need to be created LAST
    await createGuests();
    await createCabins();
    await createBookings();

    setIsLoading(false);
  }

  async function uploadBookings() {
    setIsLoading(true);
    await deleteBookings();
    await createBookings();
    setIsLoading(false);
  }

  return (
    <div
      style={{
        marginTop: "auto",
        backgroundColor: "#e0e7ff",
        padding: "8px",
        borderRadius: "5px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <h3>SAMPLE DATA</h3>

      <Button onClick={uploadAll} disabled={isLoading}>
        Upload ALL
      </Button>

      <Button onClick={uploadBookings} disabled={isLoading}>
        Upload Bookings ONLY
      </Button>
    </div>
  );
}

export default Uploader;
