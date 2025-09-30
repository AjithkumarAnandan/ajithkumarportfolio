import { Row } from "@silevis/reactgrid";
import { PersonGridProps } from "./type.grid";

const headerRow = (people: PersonGridProps[]): Row => {
  const keys = Object.keys(
    people?.[0] ?? { name: "", email: "", comment: "" }
  ).filter((k) => k !== "id");

  const columnMap: Record<string, string> = keys.reduce((acc, key) => {
    acc[key] = key.charAt(0).toUpperCase() + key.slice(1);
    return acc;
  }, {} as Record<string, string>);

  return {
    rowId: "header",
    cells: [
      { type: "header", text: columnMap.name },
      { type: "header", text: columnMap.email },
      { type: "header", text: columnMap.comment },
    ],
  };
};

export const getRows = (people: PersonGridProps[] = []): Row[] => [
  headerRow(people),
  ...people.map<Row>((person, idx) => ({
    rowId: `row-${idx}`,
    cells: [
      {
        type: "text",
        text: person.name,
        // placeholder: "name",
        id: person.id,
        value: person.name,
      },
      {
        type: "text",
        text: person.email,
        // placeholder: "email",
        id: person.id,
        value: person.email,
      },
      {
        type: "text",
        text: person.comment,
        // placeholder: "comment",
        id: person.id,
        value: person.comment,
      },
    ],
  })),
];
