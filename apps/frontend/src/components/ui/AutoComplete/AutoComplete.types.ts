export interface AutoCompleteOptionT {
  id: number | string;
  label: string;
}

export interface AutoCompletePropsT<T> {
  suggestions: T[];
  isLoading?: boolean;
  onChange: (value: string) => void;
  onSelect: (option: T) => void;
  value: string;
  placeholder?: string;
}
