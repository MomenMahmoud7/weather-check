import { FC, useState } from "react";
import useLocationSearchQuery from "../../hooks/queries/useLocationSearchQuery";
import useCityQuery from "../../hooks/queries/useCityQuery";
import { CityAutocompleteProps, Location } from "./CityAutocomplete.types";
import AutoComplete from "../ui/AutoComplete/AutoComplete";

const CityAutocomplete: FC<CityAutocompleteProps> = ({
  onSelect,
  placeholder,
}) => {
  const selectedCity = useCityQuery();
  const [searchText, setSearchText] = useState(selectedCity);
  const { data: results, isLoading } = useLocationSearchQuery(
    searchText.trim()
  );

  const formattedOptions =
    results?.map((location: Location) => ({
      ...location,
      label: `${location.name}, ${location.region}, ${location.country}`,
      ...location,
    })) ?? [];

  const handleSelect = (option: (typeof formattedOptions)[0]) => {
    setSearchText(option.label);
    onSelect(option.label);
  };

  return (
    <AutoComplete
      suggestions={formattedOptions}
      isLoading={isLoading}
      onSelect={handleSelect}
      onChange={setSearchText}
      value={searchText}
      placeholder={placeholder}
    />
  );
};

export default CityAutocomplete;
