import React, { memo, useState } from "react";
import {
  ReactGrid,
  Column,
  Id,
  MenuOption,
  CellLocation,
} from "@silevis/reactgrid";
import dataGrid from "./reactgrid.json";

function ReactGridField() {
  // --- Helper: Flatten rows based on expanded state ---
  const getVisibleRows = (rows: any[]): any[] => {
    const result: any[] = [];

    const pushRow = (row: any) => {
      // Clone the row to modify the first cell for chevron display
      const newRow = { ...row, cells: [...row.cells] };
      console.log("Toggling expand for rowId:", row);
      if (row.isParent) {
        const chevron = row.expanded ? "▼ " : "▶ ";
        newRow.cells[0] = {
          ...newRow.cells[0],
          text: chevron + newRow.cells[0].text,
        };
      }

      result.push(newRow);

      if (row.isParent && row.expanded && row.children?.length) {
        row.children.forEach(pushRow);
      }
    };

    rows.forEach(pushRow);
    return result;
  };

  // --- State for visible rows ---
  const [visibleRows, setVisibleRows] = useState(() =>
    getVisibleRows(dataGrid.rows)
  );
  const [allRows, setAllRows] = useState(dataGrid.rows);

  // --- State for columns (with resize) ---
  const [columns, setColumns] = useState<Column[]>(dataGrid.columns);

  const handleColumnResize = (
    ci: string | number,
    width: number,
    selectedColIds: (string | number)[]
  ) => {
    setColumns((prevColumns) => {
      const index = prevColumns.findIndex((el) => el.columnId === ci);
      if (index === -1) return prevColumns;
      const updated = [...prevColumns];
      updated[index] = { ...updated[index], width };
      return updated;
    });
  };

  // --- Toggle expand/collapse for a parent row ---
  // function toggleExpand(rowId: string) {
  //   console.log("tesystu");
  //   const updateExpanded = (rows: any[]): any[] =>
  //     rows.map((row) => {
  //       if (row.rowId === rowId) {
  //         return { ...row, expanded: !row.expanded };
  //       } else if (row.children) {
  //         return { ...row, children: updateExpanded(row.children) };
  //       }
  //       return row;
  //     });

  //   const newAllRows = updateExpanded(allRows);
  //   setAllRows(newAllRows);
  //   setVisibleRows(getVisibleRows(newAllRows));
  // }

  // --- Render a clickable chevron in first column ---
  const renderRowsWithClick = visibleRows.map((row) => {
    console.log("Row:", row);
    if (row.isParent) {
      return {
        ...row,
        cells: [
          {
            ...row.cells[0],
            // Add click handler for chevron
            // onClick: () => toggleExpand(row.rowId),
            style: { cursor: "pointer" },
          },
          ...row.cells.slice(1),
        ],
      };
    }
    return row;
  });

  // console.log("Rendering ReactGrid with rows:", renderRowsWithClick);
  return (
    <div>
      <ReactGrid
        rows={renderRowsWithClick}
        columns={columns}
        onColumnResized={handleColumnResize}
        enableFillHandle
        enableRangeSelection

        // enableRowSelection={false}
      />
    </div>
  );
}

export default memo(ReactGridField);
