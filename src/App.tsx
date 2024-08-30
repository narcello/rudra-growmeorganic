import { useEffect } from "react";
import useData from "./hooks/useData";

function App() {
  const { data, getData, pagination, isLoading } = useData();

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <h3>{isLoading ? "Loading" : "Done"}</h3>
      <h3>Pagination</h3>
      <center>{JSON.stringify(pagination)}</center>
      <br />
      {data.map((item) => JSON.stringify(item))}
    </>
  );
}

export default App;
