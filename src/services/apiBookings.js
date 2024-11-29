// import { useQueryClient } from "@tanstack/react-query";
import { Page_Size } from "../utils/Constant";
import { getToday } from "../utils/helpers";
import supabase from "./supabase";

export async function getBooked({ cabinId }) {
  const { data, error } = await supabase
    .from("Bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", cabinId)
    .single();
  if (error) {
    throw new Error("Booking not found");
  }
  return data;
}
export async function getBooking({ filter, sort, startCount }) {
  let query;
  query = supabase
    .from("Bookings")
    .select(
      "id,created_at,startDate,endDate,numNight,numGuests,status,totalPrice,cabins(name),guests(fullName,email)",
      { count: "exact" }
    );
  //filter
  if (filter.statusValue && filter.statusValue !== "all")
    query.eq(filter.statusName, filter.statusValue);
  //sort
  if (sort)
    query.order(sort.sortColumn, { ascending: sort.sortDirect === "asc" });
  // pagination
  if (startCount) {
    const from = (startCount - 1) * 10 + 1;
    const to = from + Page_Size - 1;
    query = query.range(from, to);
  }
  const { data, error, count } = await query;
  if (error) {
    throw new Error("Booking not found");
  }
  return { data, count };
}

// Returns all Bookings that are were created after the given date. Useful to get Bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from("Bookings")
    .select("created_at, totalPrice, extrasPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("Bookings")
    // .select('*')
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("Bookings")
    .select("*, guests(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order("created_at");

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL Bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}

export async function updateBooking(id, obj) {
  console.log(id, obj, "check");
  const { data, error } = await supabase
    .from("Bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

export async function deleteBooking(id) {
  // REMEMBER RLS POLICIES

  const { data, error } = await supabase.from("Bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}
