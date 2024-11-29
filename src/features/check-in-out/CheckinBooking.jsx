import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import Spinner from "../../ui/Spinner";
import { useBooked } from "../bookings/useBookeds";
import Checkbox from "../../ui/Checkbox";
import { useState } from "react";
import { useBookedupdate } from "../bookings/useBookedupdate";
import { useSetting } from "../settings/useSetting";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [isCheck, setIsCheck] = useState(false);
  const [islunch, setIslunch] = useState(false);
  const { mutatebooked } = useBookedupdate();
  const { bookedData: booking, isbookedLoad: isCheckinLoad } = useBooked();
  const { data: { breakFastPrice } = {} } = useSetting();
  const moveBack = useMoveBack();
  if (isCheckinLoad) return <Spinner />;
  const {
    id: bookingId,
    status,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;
  const optionalBreakFastPrice = numNights * breakFastPrice * numGuests;

  function handleCheckin() {
    if (!bookingId) return;
    if (islunch) {
      mutatebooked({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakFastPrice,
          totalPrice: totalPrice + optionalBreakFastPrice,
        },
      });
    } else {
      mutatebooked({ bookingId, breakfast: {} });
    }
  }
  function handleLunch() {
    setIslunch(!islunch);
    setIsCheck(false);
  }
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <Box>
        <Checkbox checked={islunch} onChange={() => handleLunch()}>
          Request the lunch {breakFastPrice}
        </Checkbox>
      </Box>

      <Box>
        <Checkbox
          checked={isCheck}
          disabled={isCheck}
          onChange={() => setIsCheck(!isCheck)}
        >
          I confirm that {guests.fullName} has paid the dues{" "}
          {islunch ? optionalBreakFastPrice + totalPrice : totalPrice}.{" "}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!isCheck}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
