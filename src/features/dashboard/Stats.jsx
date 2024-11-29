import { HiOutlineBriefcase, HiOutlineChartBar } from "react-icons/hi";
import Stat from "./Stat";
import { HiOutlineBanknotes, HiOutlineCalendarDays } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";
function Stats({ bookingRecent, filterStays, numDays, cabinCount }) {
  //1
  const numbBook = bookingRecent.length;
  //2
  const sales = bookingRecent?.reduce((acc, cur) => acc + cur.totalPrice, 0);
  //3
  const checkin = filterStays.length;
  //4
  const occuption = filterStays?.reduce(
    (acc, cur) =>
      (acc + Number(cur.numNight)) / (Number(numDays) * Number(cabinCount)),
    0
  );
  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numbBook}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkin}
      />
      <Stat
        title="Occupancy Rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={`${Math.round(occuption * 100)}%`}
      />
    </>
  );
}

export default Stats;
