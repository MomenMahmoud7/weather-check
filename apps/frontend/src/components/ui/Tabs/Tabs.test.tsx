import { render, screen, fireEvent } from "@testing-library/react";
import Tabs from "./Tabs";

const mockTabs = [
  { label: "Tab 1", content: <div data-testid="content-1">Content 1</div> },
  { label: "Tab 2", content: <div data-testid="content-2">Content 2</div> },
];

describe("Tabs", () => {
  it("renders all tab labels", () => {
    render(<Tabs tabs={mockTabs} activeTab={0} onTabChange={() => {}} />);

    expect(screen.getByTestId("tabs-container")).toBeInTheDocument();
    expect(screen.getByTestId("tab-0")).toHaveTextContent("Tab 1");
    expect(screen.getByTestId("tab-1")).toHaveTextContent("Tab 2");
  });

  it("displays active tab content", () => {
    render(<Tabs tabs={mockTabs} activeTab={0} onTabChange={() => {}} />);

    expect(screen.getByTestId("content-1")).toBeInTheDocument();
    expect(screen.queryByTestId("content-2")).not.toBeInTheDocument();
  });

  it("calls onTabChange when clicking a tab", () => {
    const handleTabChange = jest.fn();
    render(
      <Tabs tabs={mockTabs} activeTab={0} onTabChange={handleTabChange} />
    );

    fireEvent.click(screen.getByTestId("tab-1"));
    expect(handleTabChange).toHaveBeenCalledWith(1);
  });
});
