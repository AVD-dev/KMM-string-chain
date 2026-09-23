import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { AddItemCard } from "./add-item-card";

describe("AddItemCard", () => {
  afterEach(() => cleanup());

  it("renders the input", () => {
    render(<AddItemCard onCancel={vi.fn()} onSubmit={vi.fn()} />);

    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("SHOULD allow typing a value", async () => {
    const user = userEvent.setup();

    render(<AddItemCard onCancel={vi.fn()} onSubmit={vi.fn()} />);

    const input = screen.getByRole("textbox");

    await user.type(input, "New item");

    expect(input).toHaveValue("New item");
  });

  it("SHOULD close after the exit animation when cancel is clicked", async () => {
    const user = userEvent.setup();
    const onCancel = vi.fn();

    const { container } = render(
      <AddItemCard onCancel={onCancel} onSubmit={vi.fn()} />,
    );

    await user.click(screen.getByRole("button", { name: "CANCEL" }));

    expect(onCancel).not.toHaveBeenCalled();

    const root = container.firstElementChild!;

    expect(root).toHaveClass("add-item--closing");

    fireEvent.animationEnd(root);

    expect(onCancel).toHaveBeenCalledOnce();
  });

  it("SHOULD submit the current value and close after the exit animation", async () => {
    const user = userEvent.setup();

    const onSubmit = vi.fn();
    const onCancel = vi.fn();

    const { container } = render(
      <AddItemCard onCancel={onCancel} onSubmit={onSubmit} />,
    );

    await user.type(screen.getByRole("textbox"), "New item");

    await user.click(screen.getByRole("button", { name: "ADD" }));

    expect(onSubmit).toHaveBeenCalledOnce();
    expect(onSubmit).toHaveBeenCalledWith("New item");

    expect(onCancel).not.toHaveBeenCalled();

    const root = container.firstElementChild!;

    expect(root).toHaveClass("add-item--closing");

    fireEvent.animationEnd(root);

    expect(onCancel).toHaveBeenCalledOnce();
  });
});
