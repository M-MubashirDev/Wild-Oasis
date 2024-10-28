import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import { useState } from "react";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
import Button from "../ui/Button";
function Cabins() {
  const [isForms, setIsFroms] = useState(false);
  return (
    <>
      <Row type="horizantol">
        <Heading as="h1">All cabins</Heading>
        <p>sort / init</p>
      </Row>
      <Row>
        <CabinTable />
        <Button onClick={() => setIsFroms(!isForms)}>Add Cabin</Button>
        {isForms && <CreateCabinForm />}
      </Row>
    </>
  );
}

export default Cabins;
