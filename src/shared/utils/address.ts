type PlaceType = {
  address_components?: {
    long_name: string;
    short_name: string;
    types: string[];
  }[];
};
type MappingType = Record<string, string>;

export const formatGooglePlaceAddress = (place: PlaceType, mapping: MappingType) => {
  const formattedStreetParts: Record<string, string> = {};
  if (place.address_components && place.address_components.length > 0) {
    // We may spend here some time to simplify it later
    // eslint-disable-next-line no-restricted-syntax
    for (const component of place.address_components) {
      const addressType = component.types[0];
      if (mapping[addressType]) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        formattedStreetParts[addressType] = component[mapping[addressType]];
      }
    }
  }
  return formattedStreetParts;
};
