export interface Location {
  id: number;
  name: string;
  region: string;
  country: string;
}

export interface CityAutocompleteProps {
  onSelect: (value: string) => void;
  placeholder?: string;
}
