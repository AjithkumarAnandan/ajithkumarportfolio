import { putFeedback } from "@/redux/feedback/feedback.action";
import { AnyCellChange, PersonGridProps } from "./type.grid";
import { AppDispatch } from "@/redux/store";

export const applyChangesToPeople = (
  cellChanges: AnyCellChange[],
  prevPeople: PersonGridProps[],
  dispatch: AppDispatch
): PersonGridProps[] => {
  const updated = [...prevPeople];
  cellChanges.forEach((change: any) => {
    const personIndex = updated.findIndex(
      (p: any) => Number(p.id) === Number(change.previousCell.id)
    );

    if (personIndex === -1) return;
    const person: PersonGridProps | undefined = { ...updated[personIndex] };

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

    dispatch(putFeedback(person));
    updated[personIndex] = person;
  });

  return updated;
};
