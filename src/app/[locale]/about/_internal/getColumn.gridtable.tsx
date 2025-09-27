import { Column } from "@silevis/reactgrid";

export function getColumns(val: any[]): Column[] {
  if (!Array.isArray(val) || val.length === 0) return []; // return empty only if invalid

  const keysVal = Object.keys(val[0]);
  return keysVal
    .filter((key) => key && key !== "id") // omit 'id'
    .map((key) => ({
      columnId: key,
      width: 150,
    }));
}
