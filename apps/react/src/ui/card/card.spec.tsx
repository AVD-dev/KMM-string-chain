import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Card, type CardProps } from "./card";

const MOCK_CONTENT_TEXT = "Content";

const renderCard = (props: Partial<CardProps> = {}) => {
  render(
    <Card {...props}>
      {props.children ?? <span>{MOCK_CONTENT_TEXT}</span>}
    </Card>,
  );

  return {
    content: screen.getByText("Content"),
  };
};
describe("Card", () => {
  afterEach(() => cleanup());

  it("SHOULD renders its content", () => {
    renderCard();

    expect(screen.getByText(MOCK_CONTENT_TEXT)).toBeInTheDocument();
  });

  it("SHOULD render the header", () => {
    renderCard({ header: <h1>Title</h1> });

    expect(screen.getByRole("heading")).toBeInTheDocument();
  });

  it("SHOULD render the subheader", () => {
    const subheaderValue = "Description";
    renderCard({ subheader: subheaderValue });

    expect(screen.getByText(subheaderValue)).toBeInTheDocument();
  });

  it("SHOULD render the footer", () => {
    const footerText = "Description";

    renderCard({ footer: <span>{footerText}</span> });

    expect(screen.getByText(footerText)).toBeInTheDocument();
  });

  it("SHOULD render the custom class", () => {
    const className = "custom-class";

    const { content } = renderCard({ className });

    expect(content.parentElement).toHaveClass(`card ${className}`);
  });
});
