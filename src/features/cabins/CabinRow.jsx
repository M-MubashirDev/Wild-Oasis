import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import CreateCabinForm from "./CreateCabinForm";
import useDeleteCabin from "./useDeleteCabin";
import { HiSquare2Stack } from "react-icons/hi2";
import { BiPencil, BiTrash } from "react-icons/bi";
import useCreateCabin from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;
function CabinRow({ cabin }) {
  const { CreateCabin } = useCreateCabin();
  const { deleteCabin, deleteloading } = useDeleteCabin();
  function handleCopyCabin() {
    console.log(cabin);
    CreateCabin({
      maxCapacity: cabin.maxCapacity,
      regularPrice: cabin.regularPrice,
      image: cabin.image,
      description: cabin.description,
      name: `copy of ${cabin.name}`,
      discount: cabin.discount,
      // isCopy: true,
    });
  }
  const {
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    id: cabinId,
  } = cabin;
  return (
    <Table.Row>
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      <Discount>{formatCurrency(discount)}</Discount>
      <div>
        <button onClick={handleCopyCabin}>
          <HiSquare2Stack />
        </button>
        <Modal>
          <Modal.Open opens="modal-delete">
            <button>
              <BiTrash />
            </button>
          </Modal.Open>
          <Modal.Window name="modal-delete">
            <ConfirmDelete
              disabled={deleteloading}
              onConfirm={() => deleteCabin(cabinId)}
            />
          </Modal.Window>
        </Modal>
        <Modal>
          <Modal.Open opens="modal-edit">
            <button>
              <BiPencil />
            </button>
          </Modal.Open>
          <Modal.Window name="modal-edit">
            <CreateCabinForm editCabin={cabin} />
          </Modal.Window>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default CabinRow;
