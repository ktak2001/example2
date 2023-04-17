export enum Country {
  Japan = "Japan",
}

export const getCountryName = (country: Country) =>
  ({
    [Country.Japan]: "日本",
  }[country]);
