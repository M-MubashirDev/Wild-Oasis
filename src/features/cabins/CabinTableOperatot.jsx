import Filter from "../../ui/Filter";
import Sortby from "../../ui/SortBy";
// import Sortby from "../../";
import TableOperations from "../../ui/TableOperations";

function CabinTableOperatot() {
  return (
    <TableOperations>
      <Filter
        filterField="filter"
        option={[
          { content: "All", value: "All" },
          { content: "With Discount", value: "discount" },
          { content: "Without Discount", value: "without-discount" },
        ]}
      />
      <Sortby
        option={[
          { content: "Sort by name(A-Z)", value: "name-asc" },
          { content: "Sort by name(Z-A)", value: "name-desc" },
          { content: "Sort by price(high first)", value: "regularPrice-desc" },
          { content: "Sort by price(low first)", value: "regularPrice-asc" },
          { content: "Sort by capacity(low first)", value: "maxCapacity-asc" },
          {
            content: "Sort by capacity(high first)",
            value: "maxCapacity-desc",
          },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperatot;
