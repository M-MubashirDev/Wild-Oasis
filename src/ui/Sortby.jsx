import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function Sortby({ option }) {
  const [sortOptParam, setSortOptParam] = useSearchParams();
  const paramValue = sortOptParam.get("sort");
  function onChange(e) {
    console.log(e.target.value, "pakistan");
    sortOptParam.set("sort", e.target.value);
    setSortOptParam(sortOptParam);
  }
  return (
    <Select
      option={option}
      value={paramValue}
      onChange={onChange}
      type="white"
    />
  );
}

export default Sortby;
