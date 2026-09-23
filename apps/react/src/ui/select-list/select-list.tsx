import "./select-list.scss";

export type Item = {
  id: string;
  label: string;
  selected: boolean;
};

export type SelectListProps = {
  items: Item[];
  onSelectedChange: (id: string, selected: boolean) => void;
};

export function SelectList({ items, onSelectedChange }: SelectListProps) {
  return (
    <ul className="select-list">
      {items.map((i) => (
        <li
          onClick={() => onSelectedChange(i.id, !i.selected)}
          key={i.id}
          className={
            i.selected
              ? "select-list__item select-list__item--selected"
              : "select-list__item"
          }
        >
          <input type="checkbox" checked={i.selected} readOnly />
          <span>{i.label}</span>
        </li>
      ))}
    </ul>
  );
}
