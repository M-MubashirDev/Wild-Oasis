import styled from "styled-components";
import useRecentBooking from "./useRecentBooking";
import Spinner from "../../ui/Spinner";
import useRecentStays from "./useRecentStays";
import Stats from "./Stats";
import useCabin from "../cabins/useCabin";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
const StyledDashboardLayout = styled.div`
  /* display: grid; */
  display: flex;
  flex-direction: column;
  /* grid-template-columns: 1fr 1fr 1fr 1 fr;
  grid-template-rows: auto auto auto; */
  gap: 2.4rem;
`;
const Div = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;
function DashboardLayout() {
  const { bookingRecent, isRecentLoad } = useRecentBooking();
  const { recentStays, isStayLoad, filterStays, numDays } = useRecentStays();
  const { cabinData, isLoading } = useCabin();
  if (isRecentLoad || isStayLoad || isLoading) return <Spinner />;
  return (
    <StyledDashboardLayout>
      <Div>
        <Stats
          filterStays={filterStays}
          numDays={numDays}
          bookingRecent={bookingRecent}
          cabinCount={cabinData.length}
        />
      </Div>
      <DurationChart filterStays={filterStays} />
      <SalesChart bookingRecent={bookingRecent} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
