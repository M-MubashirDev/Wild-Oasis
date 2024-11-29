import Filter from "../../ui/Filter";

function DashboardFilter() {
  return (
    <Filter
      filterField="last"
      option={[
        { value: "7", content: "Last 7 days" },
        { value: "30", content: "Last 30 days" },
        { value: "90", content: "Last 90 days" },
      ]}
    />
  );
}

export default DashboardFilter;
