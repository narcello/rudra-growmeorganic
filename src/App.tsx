import { SyntheticEvent, useEffect, useRef, useState } from "react";
import useData from "./hooks/useData";
import { DataTable, DataTableStateEvent } from "primereact/datatable";
import { Column } from "primereact/column";
import { OverlayPanel } from "primereact/overlaypanel";
import "./app.css";

import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { ArtworksType } from "./types";

function App() {
  const overlayPanel = useRef<OverlayPanel>(null);
  const { data, getData, pagination, isLoading } = useData();
  const [selectedItems, setSelectedItems] = useState<ArtworksType[]>([]);
  let [rowsNumberSelected, setRowsNumberSelected] = useState(0);
  const [needToSelectMoreItems, setNeedToSelectMoreItems] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (needToSelectMoreItems) handleSelectItemsBasedOnInputValue();
  }, [pagination.current_page]);

  const handlePagination = (statePagination: DataTableStateEvent) => {
    getData({ page: statePagination.page! + 1 });
  };

  const handleSubmitRowsSelected = (ev: SyntheticEvent<Element, Event>) => {
    ev.preventDefault();
    setNeedToSelectMoreItems(true);
    overlayPanel.current?.toggle(ev);
    handleSelectItemsBasedOnInputValue();
  };

  const handleSelectItemsBasedOnInputValue = () => {
    if (!data?.length) return;

    const cloneCurrentData = [...data];
    let preSelectedItems = new Set<ArtworksType>(selectedItems);
    const selectedCount = selectedItems.length;
    let missingSpots = Math.max(rowsNumberSelected - selectedCount, 0);

    if (missingSpots === 0) {
      if (rowsNumberSelected < selectedCount) {
        preSelectedItems = new Set<ArtworksType>();
        missingSpots = rowsNumberSelected;
      } else return setSelectedItems([...preSelectedItems]);
    }

    while (missingSpots > 0 && cloneCurrentData.length > 0) {
      const artwork = cloneCurrentData.shift();
      if (artwork && !preSelectedItems.has(artwork)) {
        preSelectedItems.add(artwork);
        missingSpots--;
      }
    }

    if (missingSpots === 0 && preSelectedItems.size === rowsNumberSelected) {
      setNeedToSelectMoreItems(false);
    }

    setSelectedItems([...preSelectedItems]);
  };

  return (
    <>
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
        selectionMode="checkbox"
        selection={selectedItems}
        onSelectionChange={(e) => setSelectedItems(e.value)}
        dataKey="id"
      >
        <Column
          header={
            <i
              className="pi pi-chevron-down"
              onClick={(e) => overlayPanel.current!.toggle(e)}
            />
          }
          selectionMode="multiple"
          headerClassName="checkbox-header"
        />
        <Column field="title" header="Title" />
        <Column field="place_of_origin" header="Origin" />
        <Column field="artist_display" header="Artist" />
        <Column field="inscriptions" header="Inscriptions" />
        <Column field="date_start" header="Start Date" />
        <Column field="date_end" header="End Date" />
      </DataTable>
      <OverlayPanel id="overlay" ref={overlayPanel}>
        <form onSubmit={handleSubmitRowsSelected}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "end",
              gap: "6px",
            }}
          >
            <InputText
              placeholder="Select rows..."
              type="number"
              value={rowsNumberSelected.toString()}
              onChange={(e) => setRowsNumberSelected(parseInt(e.target.value))}
            />
            <Button onClick={handleSubmitRowsSelected}>Submit</Button>
          </div>
        </form>
      </OverlayPanel>
    </>
  );
}

export default App;
