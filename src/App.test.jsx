import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { tools } from "./data/tools";

describe("AI Drop", () => {
  it("renders the AI Drop heading", () => {
    render(<App />);
    expect(screen.getByText(/your next favorite ai tool/i)).toBeInTheDocument();
  });

  it("renders all curated tool names", () => {
    render(<App />);
    for (const tool of tools) {
      expect(screen.getByText(tool.name)).toBeInTheDocument();
    }
  });
});