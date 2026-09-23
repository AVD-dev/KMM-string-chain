import "./App.scss";
import { Card } from "./ui/card/card";
import { ButtonChip } from "./ui/button-chip/button-chip";
import UndoIcon from "./assets/icons/undo.svg?react";
import { SelectList, type Item } from "./ui/select-list/select-list";
import { useState } from "react";
import { AddItemCard } from "./ui/add-item-card/add-item-card";

function App() {
  const [items, setItems] = useState<Item[]>([
    { id: crypto.randomUUID(), label: "Luiggy", selected: false },
    { id: crypto.randomUUID(), label: "Mario", selected: false },
    { id: crypto.randomUUID(), label: "Browser", selected: false },
  ]);

  const [backupItems, setBackupItems] = useState<Item[]>([]);
  const [showAddItemCard, setShowAddItemCard] = useState<boolean>(false);

  const handleSelectedChange = (id: string, selected: boolean) => {
    setItems((items) =>
      items.map((i) => (i.id === id ? { ...i, selected } : i)),
    );
  };

  const updateItems = (label: string) => {
    const item: Item = { id: crypto.randomUUID(), selected: false, label };

    setItems((items) => [...items, { ...item }]);
  };

  const toggleAddItemCard = (show: boolean): void => {
    setShowAddItemCard(show);
  };

  const deleteAction = () => {
    const itemsToDelete = items.filter((i) => i.selected);

    if (!itemsToDelete.length) return;

    setBackupItems((backup) => [...backup, ...itemsToDelete].slice(-10));
    setItems((items) => items.filter((i) => !i.selected));
  };

  const undoAction = () => {
    console.log("undo");
  };

  return (
    <>
      <div className="app-container">
        <Card
          className="text-card"
          header={<h1>Hello world</h1>}
          subheader={
            <span>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Exercitationem odio ipsum aperiam at earum vitae magnam ipsa aut
              doloribus. Veniam neque quaerat ullam suscipit atque
              exercitationem quam accusantium esse officiis.
            </span>
          }
          footer={
            <div className="card-footer">
              <div className="card-footer__left-actions">
                <ButtonChip
                  outlined={true}
                  onClick={undoAction}
                  icon={<UndoIcon className="text-card__undo" />}
                ></ButtonChip>
                <ButtonChip
                  onClick={deleteAction}
                  severity="danger"
                  className="text-card__delete"
                >
                  DELETE
                </ButtonChip>
              </div>

              <ButtonChip
                onClick={() => toggleAddItemCard(true)}
                className="text-card__add"
              >
                ADD
              </ButtonChip>
            </div>
          }
        >
          <SelectList
            items={items}
            onSelectedChange={handleSelectedChange}
          ></SelectList>
        </Card>

        {showAddItemCard && (
          <AddItemCard
            onCancel={() => toggleAddItemCard(false)}
            onSubmit={updateItems}
          ></AddItemCard>
        )}
      </div>
    </>
  );
}

export default App;
