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
  const [isClosing, setIsClosing] = useState(false);

  const submitting = (label: string) => {
    onSubmit(label);
    close();
  };

  const close = () => {
    setIsClosing(true);
  };

  const handleAnimationEnd = (event: React.AnimationEvent<HTMLDivElement>) => {
    if (!isClosing || event.target !== event.currentTarget) {
      return;
    }

    onCancel();
  };

  return (
    <div
      className={isClosing ? "add-item add-item--closing" : "add-item"}
      onAnimationEnd={handleAnimationEnd}
    >
      <Card
        className="add-item__card"
        subheader={"Add item to list"}
        footer={
          <div className="card-actions">
            <ButtonChip onClick={() => submitting(value)} disabled={!value}>
              ADD
            </ButtonChip>
            <ButtonChip onClick={close} outlined={true}>
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
