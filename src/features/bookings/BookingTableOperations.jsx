import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function BookingTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="status"
        option={[
          { value: "all", content: "All" },
          { value: "checked-out", content: "Checked out" },
          { value: "checked-in", content: "Checked in" },
          { value: "unconfirmed", content: "Unconfirmed" },
        ]}
      />

      <SortBy
        option={[
          { value: "startDate-desc", content: "Sort by date (recent first)" },
          { value: "startDate-asc", content: "Sort by date (earlier first)" },
          {
            value: "totalPrice-desc",
            content: "Sort by amount (high first)",
          },
          { value: "totalPrice-asc", content: "Sort by amount (low first)" },
        ]}
      />
    </TableOperations>
  );
}

export default BookingTableOperations;
