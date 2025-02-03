import { render, screen, fireEvent } from "@testing-library/react";
import AutoComplete from "./AutoComplete";

jest.mock("../../../hooks/useOutsideClick", () => ({
  useOutsideClick: jest.fn(() => ({
    ref: { current: null },
    isOpen: true,
    setIsOpen: jest.fn(),
  })),
}));

const mockSuggestions = [
  { id: 1, label: "London" },
  { id: 2, label: "Paris" },
];

describe("AutoComplete", () => {
  const defaultProps = {
    value: "",
    onChange: jest.fn(),
    onSelect: jest.fn(),
    suggestions: mockSuggestions,
    placeholder: "Search...",
  };

  it("renders input with placeholder", () => {
    render(<AutoComplete {...defaultProps} />);
    expect(screen.getByTestId("autocomplete-input")).toHaveAttribute(
      "placeholder",
      "Search..."
    );
  });

  it("shows suggestions when input has value", () => {
    render(<AutoComplete {...defaultProps} value="L" />);

    expect(screen.getByTestId("suggestions-list")).toBeInTheDocument();
    expect(screen.getByTestId("suggestion-1")).toHaveTextContent("London");
    expect(screen.getByTestId("suggestion-2")).toHaveTextContent("Paris");
  });

  it("shows loading state", () => {
    render(<AutoComplete {...defaultProps} isLoading value="L" />);
    expect(screen.getByTestId("autocomplete-loading")).toHaveTextContent(
      "Searching..."
    );
  });

  it("calls onSelect when suggestion is clicked", () => {
    render(<AutoComplete {...defaultProps} value="L" />);
    fireEvent.click(screen.getByTestId("suggestion-1"));
    expect(defaultProps.onSelect).toHaveBeenCalledWith(mockSuggestions[0]);
  });

  it("shows no results message when no suggestions match", () => {
    render(<AutoComplete {...defaultProps} suggestions={[]} value="xyz" />);
    expect(screen.getByTestId("no-results")).toHaveTextContent(
      "No results found"
    );
  });
});
