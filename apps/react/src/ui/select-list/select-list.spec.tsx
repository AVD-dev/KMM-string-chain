import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { SelectList, type Item } from "./select-list";

const items: Item[] = [
  { id: 1, label: "User one", selected: false },
  { id: 2, label: "User two", selected: true },
  { id: 3, label: "User three", selected: false },
];

describe("SelectList", () => {
  afterEach(() => cleanup());

  it("SHOULD renders all items", () => {
    render(<SelectList items={items} onSelectedChange={vi.fn()} />);

    expect(screen.getByText("User one")).toBeInTheDocument();
    expect(screen.getByText("User two")).toBeInTheDocument();
    expect(screen.getByText("User three")).toBeInTheDocument();
  });

  it("SHOULD renders selected items as checked", () => {
    render(<SelectList items={items} onSelectedChange={vi.fn()} />);

    const checkboxes = screen.getAllByRole("checkbox");

    expect(checkboxes[0]).not.toBeChecked();
    expect(checkboxes[1]).toBeChecked();
    expect(checkboxes[2]).not.toBeChecked();
  });

  it("SHOULD notifies selection when clicking an item", async () => {
    const user = userEvent.setup();
    const onSelectedChange = vi.fn();

    render(<SelectList items={items} onSelectedChange={onSelectedChange} />);

    await user.click(screen.getByText("User one"));

    expect(onSelectedChange).toHaveBeenCalledOnce();
    expect(onSelectedChange).toHaveBeenCalledWith(1, true);
  });

  it("SHOULD notifies selection when clicking the checkbox", async () => {
    const user = userEvent.setup();
    const onSelectedChange = vi.fn();

    render(<SelectList items={items} onSelectedChange={onSelectedChange} />);

    const checkboxes = screen.getAllByRole("checkbox");

    await user.click(checkboxes[0]);

    expect(onSelectedChange).toHaveBeenCalledOnce();
    expect(onSelectedChange).toHaveBeenCalledWith(1, true);
  });

  it("SHOULD notifies deselection when clicking a selected item", async () => {
    const user = userEvent.setup();
    const onSelectedChange = vi.fn();

    render(<SelectList items={items} onSelectedChange={onSelectedChange} />);

    await user.click(screen.getByText("User two"));

    expect(onSelectedChange).toHaveBeenCalledOnce();
    expect(onSelectedChange).toHaveBeenCalledWith(2, false);
  });
});
