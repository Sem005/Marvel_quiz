import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders app header", () => {
  render(<App />);
  const header = screen.getByText(/Ultimate Marvel Quiz/i);
  expect(header).toBeInTheDocument();
});
