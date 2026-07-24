import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import ToolGrid from "./ToolGrid";

describe("ToolGrid", () => {
  it("announces an empty state when there are no matching tools", () => {
    render(<ToolGrid tools={[]} />);

    const status = screen.getByRole("status");
    expect(status).toHaveTextContent("No tools match this filter yet.");
    expect(status).toHaveTextContent("Try a different category");
    expect(screen.queryByRole("article")).not.toBeInTheDocument();
  });
});
