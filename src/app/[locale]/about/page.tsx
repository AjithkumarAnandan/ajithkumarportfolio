"use client";
import React, { memo, useEffect } from "react";
import { ReactGrid, Column } from "@silevis/reactgrid";
import "@silevis/reactgrid/styles.css";
import { AnyCellChange, PersonGridProps } from "./_internal/type.grid";
import { getPeople, getRows } from "./_internal/getRows.gridtable";
import { applyChangesToPeople } from "./_internal/applyChangesToPeople";

function Page() {
  // console.log("getPeople", test);
  const [people, setPeople] = React.useState<PersonGridProps[]>([]);
  const [columns, setColumns] = React.useState<Column[]>([
    { columnId: "name", resizable: true },
    { columnId: "email", resizable: true },
    { columnId: "comment", resizable: true },
  ]);

  useEffect(() => {
    async function peopleFetch() {
      const data = await getPeople();
      console.log("data", data);
      setPeople(data);
    }
    peopleFetch();
  }, []);

  const handleColumnResize = (
    ci: string | number,
    width: number,
    selectedColIds: (string | number)[]
  ): void => {
    setColumns((prevColumns) => {
      const index = prevColumns.findIndex((el) => el.columnId === ci);
      if (index === -1) return prevColumns;
      const updated = [...prevColumns];
      updated[index] = { ...updated[index], width };
      return updated;
    });
  };

  const rows = getRows(people);

  const handleChanges = (cellChanges: any): void => {
    console.log("cellChanges,cellChanges", cellChanges);
    setPeople((prevPeople) => applyChangesToPeople(cellChanges, prevPeople));
  };

  // const simpleHandleContextMenu = (
  //   selectedRowIds: Id[],
  //   selectedColIds: Id[],
  //   selectionMode: SelectionMode,
  //   menuOptions: MenuOption[]
  // ): MenuOption[] => {
  //   return menuOptions;
  // };

  return (
    <>
      <div style={{ width: "auto", height: "auto" }}>
        <h1 className="font-bold text-5xl mb-4 flex justify-center">
          Feedback Table
          <span className="text-sm mt-5 ml-3">(readonly)</span>
        </h1>

        <ReactGrid
          rows={rows}
          columns={columns}
          onColumnResized={handleColumnResize}
          onCellsChanged={handleChanges}
          enableFillHandle
          enableRangeSelection
          // onContextMenu={simpleHandleContextMenu}
          enableGroupIdRender
        />
      </div>
    </>
  );
}

export default memo(Page);
