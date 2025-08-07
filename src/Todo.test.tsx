import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TodoList } from "./Todo";

describe("TodoList Component", () => {
  test("Initial state: shows empty message", () => {
    render(<TodoList />);
    expect(screen.getByTestId("empty-message")).toHaveTextContent(
      "No tasks yet."
    );
  });

  test("Adding a task", async () => {
    render(<TodoList />);

    const input = screen.getByPlaceholderText("Add a task");
    const addBtn = screen.getByLabelText("add-button");

    await userEvent.type(input, "Buy milk");
    fireEvent.click(addBtn);

    // Check that the task appears in the list
    expect(screen.getByText("Buy milk")).toBeInTheDocument();

    // Empty message should disappear
    expect(screen.queryByTestId("empty-message")).toBeNull();
  });

  test("Marking task as done and undone", async () => {
    render(<TodoList />);

    const input = screen.getByPlaceholderText("Add a task");
    const addBtn = screen.getByLabelText("add-button");

    await userEvent.type(input, "Workout");
    fireEvent.click(addBtn);

    const doneBtn = screen.getByText("Done");
    fireEvent.click(doneBtn);

    // Should now show "Undo"
    expect(screen.getByText("Undo")).toBeInTheDocument();

    // Text should have line-through
    const todoText = screen.getByTestId("todo-text");
    expect(todoText).toHaveStyle("text-decoration: line-through");

    // Toggle back
    fireEvent.click(screen.getByText("Undo"));
    expect(screen.getByText("Done")).toBeInTheDocument();
    expect(todoText).toHaveStyle("text-decoration: none");
  });

  test("Removing a task", async () => {
    render(<TodoList />);

    const input = screen.getByPlaceholderText("Add a task");
    const addBtn = screen.getByLabelText("add-button");

    await userEvent.type(input, "Learn Jest");
    fireEvent.click(addBtn);

    // Use getByRole with name instead of getByText for buttons — it's more reliable and accessible.
    const removeBtn = screen.getByRole("button", { name: /remove/i });
    fireEvent.click(removeBtn);

    // Task should be gone
    expect(screen.queryByText("Learn Jest")).toBeNull();
    // Empty message should return
    expect(screen.getByTestId("empty-message")).toBeInTheDocument();
  });
});
