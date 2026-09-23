import { useState } from "react";
import { Card } from "../card/card";
import { SelectList, type Item } from "../select-list/select-list";
import "./undo-list.scss";
import { ButtonChip } from "../button-chip/button-chip";

export type UndoListProps = {
  items: Item[];
  onUndo: (ids: string[]) => void;
  onClose: () => void;
};
export function UndoList({ items, onUndo, onClose }: UndoListProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isClosing, setIsClosing] = useState(false);

  const selectableItems = items.map((item) => ({
    ...item,
    selected: selectedIds.includes(item.id),
  }));

  const handleSelectedChange = (id: string, selected: boolean) => {
    setSelectedIds((ids) =>
      selected ? [...ids, id] : ids.filter((selectedId) => selectedId !== id),
    );
  };

  const submitting = (selectedIds: string[]): void => {
    onUndo(selectedIds);
    onClose();
  };

  const handleAnimationEnd = (event: React.AnimationEvent<HTMLDivElement>) => {
    if (!isClosing || event.target !== event.currentTarget) {
      return;
    }

    onClose();
  };

  return (
    <div
      className={isClosing ? "undo-list undo-list--closing" : "undo-list"}
      onAnimationEnd={handleAnimationEnd}
    >
      <Card
        className="undo-list__card"
        subheader={"The last 10 deleted items"}
        footer={
          <div>
            <ButtonChip onClick={() => setIsClosing(true)} outlined={true}>
              CANCEL
            </ButtonChip>
            <ButtonChip
              onClick={() => submitting(selectedIds)}
              disabled={!selectedIds.length}
            >
              ACCEPT
            </ButtonChip>
          </div>
        }
      >
        <SelectList
          items={selectableItems}
          onSelectedChange={handleSelectedChange}
        ></SelectList>
      </Card>
    </div>
  );
}
