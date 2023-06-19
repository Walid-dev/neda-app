// /pages/HomePage.test.tsx

import { render, screen } from "@testing-library/react";
import HomePage from "./index";

test("renders welcome message", () => {
  render(<HomePage />);
  const linkElement = screen.getByText(/Welcome to our Shopping App/i);
  expect(linkElement).toBeInTheDocument();
});
