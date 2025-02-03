import { AutoCompletePropsT, AutoCompleteOptionT } from "./AutoComplete.types";
import { useOutsideClick } from "../../../hooks/useOutsideClick";
import Input from "../Input";

const AutoComplete = <T extends AutoCompleteOptionT>({
  value,
  onChange,
  onSelect,
  suggestions = [],
  placeholder,
  isLoading,
}: AutoCompletePropsT<T>) => {
  const { ref, isOpen, setIsOpen } = useOutsideClick();

  return (
    <div data-testid="autocomplete" ref={ref} className="relative">
      <Input
        data-testid="autocomplete-input"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setIsOpen(true);
        }}
        placeholder={placeholder}
      />

      {isOpen && (value.trim() || isLoading) && (
        <ul
          data-testid="suggestions-list"
          className="absolute z-10 w-full p-3 mt-2 bg-white border border-zinc-200 rounded-lg shadow-zinc-100 shadow-2xl max-h-60 overflow-auto"
        >
          {isLoading ? (
            <li
              data-testid="autocomplete-loading"
              className="px-4 py-2 text-zinc-500 text-center"
            >
              Searching...
            </li>
          ) : suggestions.length > 0 ? (
            suggestions.map((suggestion, index) => (
              <li
                key={suggestion.id}
                data-testid={`suggestion-${index + 1}`}
                onClick={() => {
                  onSelect(suggestion);
                  setIsOpen(false);
                }}
                className="px-4 py-2 rounded-md hover:bg-zinc-100 cursor-pointer"
              >
                {suggestion.label}
              </li>
            ))
          ) : (
            <li
              data-testid="no-results"
              className="px-4 py-2 text-zinc-500 text-center"
            >
              No results found
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default AutoComplete;
