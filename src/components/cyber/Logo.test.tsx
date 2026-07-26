import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Logo } from "./Logo";

describe("Logo Component", () => {
  it("renders correctly with the brand name", () => {
    render(<Logo />);
    expect(screen.getByText(/cyberhawk UG/i)).toBeInTheDocument();
    expect(screen.getByText(/Intelligence \/\/ v2.6/i)).toBeInTheDocument();
  });

  it("renders the shield emoji icon", () => {
    render(<Logo />);
    expect(screen.getByText("🛡")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = vi.fn();
    render(<Logo onClick={handleClick} />);
    const logoElement = screen.getByText(/cyberhawk UG/i).closest("div")?.parentElement;
    logoElement?.click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
