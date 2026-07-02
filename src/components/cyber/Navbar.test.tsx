import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { Navbar } from "./Navbar";

describe("Navbar Component", () => {
  it("renders the Logo and navigation links", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Navbar />
      </MemoryRouter>
    );
    expect(screen.getByText(/cyberhawk UG/i)).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("News")).toBeInTheDocument();
  });

  it("marks the active link based on the path", () => {
    render(
      <MemoryRouter initialEntries={["/news"]}>
        <Navbar />
      </MemoryRouter>
    );
    const newsLink = screen.getByText("News");
    expect(newsLink).toHaveClass("active");
  });

  it("toggles the mobile menu when clicking the menu button", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Navbar />
      </MemoryRouter>
    );
    const toggleButton = screen.getByLabelText("Toggle menu");
    fireEvent.click(toggleButton);
    expect(screen.getByText("✕")).toBeInTheDocument(); 
    
    // In mobile menu
    const mobileHomeLink = screen.getAllByText("Home")[1]; // One in desktop, one in mobile
    expect(mobileHomeLink).toBeVisible();
  });
});
