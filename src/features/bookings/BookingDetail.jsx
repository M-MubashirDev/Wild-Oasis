import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooked } from "./useBookeds";
import { HiCash } from "react-icons/hi";
import { useCheckOut } from "./useCheckOut";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  // const booking = {};
  const { checkedOut, isCheckedOut } = useCheckOut();

  const status = "checked-in";
  const { bookedData, isbookedLoad } = useBooked();
  const moveBack = useMoveBack();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #X</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={bookedData} isbookedLoad={isbookedLoad} />

      <ButtonGroup>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
        {status === "checked-in" ? (
          <Button
            disabled={isCheckedOut}
            onClick={() => checkedOut(bookedData.id)}
          >
            <HiCash />
          </Button>
        ) : (
          ""
        )}
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
