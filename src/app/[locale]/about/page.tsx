"use client";
import React, { memo, useEffect, useState } from "react";
import { ReactGrid, Column } from "@silevis/reactgrid";
import "@silevis/reactgrid/styles.css";
import { PersonGridProps } from "./_internal/type.grid";
import { getRows } from "./_internal/getRows.gridtable";
import { applyChangesToPeople } from "./_internal/applyChangesToPeople";
import { getServerSideFeedback } from "@/redux/getServerSideProducts";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";

function Page() {
  const dispatch: AppDispatch = useDispatch();
  const [people, setPeople] = useState<PersonGridProps[]>([]);
  const [columns, setColumns] = useState<Column[]>([
    { columnId: "name", resizable: true },
    { columnId: "email", resizable: true },
    { columnId: "comment", resizable: true },
  ]);

  useEffect(() => {
    async function peopleFetch() {
      try {
        const state = await getServerSideFeedback();
        const feedback = state?.feedback?.data?.data ?? [];
        const error = state?.feedback?.error;
        if (error) {
          console.error("Error fetching feedback:", error);
          return [];
        }
        setPeople(feedback);
      } catch (err) {
        console.error("Unexpected error while fetching feedback:", err);
        return [];
      }
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
    // console.log("cellChanges,cellChanges", cellChanges);
    setPeople((prevPeople) =>
      applyChangesToPeople(cellChanges, prevPeople, dispatch)
    );
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
