import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import Table from "../../ui/Table";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useCabin from "./useCabin";
function CabinTable() {
  // const {
  //   data: cabinData,
  //   isLoading,
  //   error,
  // } = useQuery({
  //   queryKey: ["cabins"],
  //   queryFn: apiCabins,

  // });
  const { cabinData, isLoading } = useCabin();
  const [filterParams] = useSearchParams();
  const [filterCabin, setFilterCabin] = useState(cabinData);
  const paramStatefilter = filterParams.get("filter") || "All";
  //
  useEffect(
    function () {
      if (paramStatefilter === "All") setFilterCabin(cabinData);
      if (paramStatefilter === "discount")
        setFilterCabin(cabinData?.filter((value) => value?.discount));
      if (paramStatefilter === "without-discount")
        setFilterCabin(cabinData?.filter((value) => value?.discount === 0));
    },
    [cabinData, paramStatefilter]
  );
  //.............
  // const [head, tail] = filterParams.get("sort");
  // filterCabin.sort((a,b)=>)
  // console.log(head, tail);
  const [head, tail] = filterParams.get("sort")?.split("-") || ["name", "asc"];

  const converter = tail === "asc" ? 1 : -1;
  const sortCabin = filterCabin?.sort(
    (a, b) => (a[head] - b[head]) * converter
  );
  if (isLoading) return <Spinner />;
  return (
    <>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body>
          {sortCabin?.map((val) => (
            <CabinRow cabin={val} key={val.id} />
          ))}
        </Table.Body>
      </Table>
    </>
  );
}

export default CabinTable;
