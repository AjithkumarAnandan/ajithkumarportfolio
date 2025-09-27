import { Row } from "@silevis/reactgrid";
import { PersonGridProps } from "./type.grid";
import { getServerSideFeedback } from "@/redux/dashboard/getServerSideProducts";

const headerRow: Row = {
  rowId: "header",
  cells: [
    { type: "header", text: "Name" },
    { type: "header", text: "email" },
    { type: "header", text: "comment" },
  ],
};

// export const getPeople = async(): PersonGridProps[] =>
export const getPeople = async () => {
  try {
    const state = await getServerSideFeedback();
    const feedback = state?.feedback?.data?.data ?? [];
    const error = state?.feedback?.error;

    if (error) {
      return [];
    }

    return feedback;
  } catch (err) {
    console.error("getPeople failed:", err);
    return [];
  }
};
// export const rows = getRows(people);
//   Array.from({ length: 3 }, (_, i) => {
//     return { name: "", email: "", comment: "" };
//   });

export const getRows = (people: PersonGridProps[] = []): Row[] => [
  headerRow,
  ...people.map<Row>((person, idx) => ({
    rowId: `row-${idx}`,
    cells: [
      { type: "text", text: person.name, placeholder: "name" },
      { type: "text", text: person.email, placeholder: "email" },
      { type: "text", text: person.comment, placeholder: "comment" },
    ],
  })),
];
