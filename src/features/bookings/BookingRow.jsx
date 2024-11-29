import styled from "styled-components";
import { format, isToday } from "date-fns";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import { HiCash, HiEye, HiTrash } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useCheckOut } from "./useCheckOut";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Modal from "../../ui/Modal";
import { useDelete } from "./useDelete";
const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({
  booking: {
    id: bookingId,
    created_at,
    startDate,
    endDate,
    numNight,
    numGuests,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  },
}) {
  const navigate = useNavigate();
  const { deleteBookings, loadDelBook } = useDelete();
  const { checkedOut, isCheckedOut } = useCheckOut();
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
  return (
    <Modal>
      <Table.Row>
        <Cabin>{cabinName}</Cabin>

        <Stacked>
          <span>{guestName}</span>
          <span>{email}</span>
        </Stacked>

        <Stacked>
          <span>
            {isToday(new Date(startDate))
              ? "Today"
              : formatDistanceFromNow(startDate)}{" "}
            &rarr; {numNight} night stay
          </span>
          <span>
            {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
            {format(new Date(endDate), "MMM dd yyyy")}
          </span>
        </Stacked>
        {/* bookingId */}
        <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

        <Amount>{formatCurrency(totalPrice)}</Amount>
        <div>
          <button onClick={() => navigate(`/booking/${bookingId}`)}>
            <HiEye />
          </button>
          {status === "unconfirmed" ? (
            <button onClick={() => navigate(`/checkin/${bookingId}`)}>
              <HiCash />
            </button>
          ) : (
            ""
          )}
          {status === "checked-in" ? (
            <button
              disabled={isCheckedOut}
              onClick={() => checkedOut(bookingId)}
            >
              <HiCash />
            </button>
          ) : (
            ""
          )}

          <Modal.Open opens="bookDelete">
            <button>
              <HiTrash />
            </button>
          </Modal.Open>
        </div>
        <Modal.Window name="bookDelete">
          <ConfirmDelete
            resourceName="mubashir"
            onConfirm={() => deleteBookings(bookingId)}
            disabled={loadDelBook}
          />
        </Modal.Window>
      </Table.Row>
    </Modal>
  );
}

export default BookingRow;
