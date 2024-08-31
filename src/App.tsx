import { useEffect } from "react";
import useData from "./hooks/useData";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

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
      <DataTable
        lazy
        value={data}
        rows={pagination?.limit}
        paginator
        totalRecords={pagination?.total}
        tableStyle={{ minWidth: "50rem" }}
      >
        <Column field="title" header="Title"></Column>
        <Column field="place_of_origin" header="Origin"></Column>
        <Column field="artist_display" header="Artist"></Column>
        <Column field="inscriptions" header="Inscriptions"></Column>
        <Column field="date_start" header="Start Date"></Column>
        <Column field="date_end" header="End Date"></Column>
      </DataTable>
    </>
  );
}

export default App;
