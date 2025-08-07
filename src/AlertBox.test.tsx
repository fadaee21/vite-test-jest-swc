import { render, screen } from "@testing-library/react";
import { AlertBox } from "./AlertBox";

describe("AlertBox Component", () => {
  test("renders error message (RTL test)", () => { //React Testing Library (RTL)
    render(<AlertBox type="error" message="Something went wrong." closable />);

    // Regular assertion
    expect(screen.getByRole("alert")).toHaveTextContent(
      "Error: Something went wrong."
    );

    // Check for close button
    expect(screen.getByLabelText("close-button")).toBeInTheDocument();
  });

  // https://jestjs.io/docs/snapshot-testing
  test("matches snapshot: error + closable", () => {
    const { asFragment } = render(
      <AlertBox type="error" message="Error message" closable />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("matches snapshot: success + not closable", () => {
    const { asFragment } = render(
      <AlertBox type="success" message="It worked!" />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
