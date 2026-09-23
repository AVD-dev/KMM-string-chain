import "./add-item-card.scss";
import { Card } from "../card/card";
import { ButtonChip } from "../button-chip/button-chip";
import { useState } from "react";

export type AddItemCardProps = {
  onCancel: () => void;
  onSubmit: (label: string) => void;
};

export function AddItemCard({ onCancel, onSubmit }: AddItemCardProps) {
  const [value, setValue] = useState("");

  const submitting = (label: string) => {
    onSubmit(label);
    onCancel();
  };

  return (
    <div className="add-item">
      <Card
        className="add-item__card"
        subheader={"Add item to list"}
        footer={
          <div className="card-actions">
            <ButtonChip onClick={() => submitting(value)}>ADD</ButtonChip>
            <ButtonChip onClick={onCancel} outlined={true}>
              CANCEL
            </ButtonChip>
          </div>
        }
      >
        <input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Type the text here..."
          className="add-item__field"
          type="text"
        ></input>
      </Card>
    </div>
  );
}
