import {
  CellChange,
  CheckboxCell,
  DateCell,
  NumberCell,
  TextCell,
} from "@silevis/reactgrid";

export interface PersonGridProps {
  id?: number | string;
  name: string;
  email: string;
  comment: string;
}

export type AnyCellChange =
  | CellChange<TextCell>
  | CellChange<CheckboxCell>
  | CellChange<NumberCell>
  | CellChange<DateCell>;
