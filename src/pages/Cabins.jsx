import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import AddCabin from "../features/cabins/AddCabin";
import CabinTableOperatot from "../features/cabins/CabinTableOperatot";

function Cabins() {
  return (
    <>
      <Row type="horizantol">
        <Heading as="h1">All cabins</Heading>
        <CabinTableOperatot />
      </Row>
      <Row>
        <CabinTable />
        <AddCabin />
      </Row>
    </>
  );
}

export default Cabins;
