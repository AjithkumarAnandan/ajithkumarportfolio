import { AnyCellChange, PersonGridProps } from "./type.grid";
export const applyChangesToPeople = (
  cellChanges: AnyCellChange[],
  prevPeople: PersonGridProps[]
): PersonGridProps[] => {
  const updated = [...prevPeople];
  cellChanges.forEach((change: any) => {
    const personIndex = updated.findIndex(
      (p: any) => Number(p.id) - 1 === Number(change.rowId.split("-")?.[1])
    );

    if (personIndex === -1) return;
    const person = { ...updated[personIndex] };

    switch (change.type) {
      case "text":
        person[change.columnId as keyof PersonGridProps] = change.newCell
          .text as any;
        break;
      // case "checkbox":
      //   person[change.columnId as keyof PersonGridProps] = change.newCell
      //     .checked as any;
      //   break;
      // case "number":
      //   person[change.columnId as keyof PersonGridProps] = change.newCell
      //     .value as any;
      //   break;
    }
    updated[personIndex] = person;
  });

  return updated;
};
