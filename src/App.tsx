import { useEffect } from "react";
import useData from "./hooks/useData";
import { DataTable, DataTableStateEvent } from "primereact/datatable";
import { Column } from "primereact/column";

function App() {
  const { data, getData, pagination, isLoading } = useData();

  useEffect(() => {
    getData();
  }, []);

  const handlePagination = (statePagination: DataTableStateEvent) => {
    getData({ page: statePagination.page! + 1 });
  };

  return (
    <DataTable
      lazy
      paginator
      stripedRows
      value={data}
      loading={isLoading}
      rows={pagination?.limit}
      totalRecords={pagination?.total}
      first={pagination?.offset}
      onPage={handlePagination}
      size="small"
    >
      <Column field="title" header="Title"></Column>
      <Column field="place_of_origin" header="Origin"></Column>
      <Column field="artist_display" header="Artist"></Column>
      <Column field="inscriptions" header="Inscriptions"></Column>
      <Column field="date_start" header="Start Date"></Column>
      <Column field="date_end" header="End Date"></Column>
    </DataTable>
  );
}

export default App;
