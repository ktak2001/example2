export enum SortKey {
  Recommend = "recommend",
  Latest = "latest",
  Cheapness = "cheapness",
  Height = "height",
}

export const sortOptionLabel = (sortKey: SortKey) =>
  ({
    [SortKey.Recommend]: "おすすめ順",
    [SortKey.Latest]: "新着順",
    [SortKey.Cheapness]: "価格が安い順",
    [SortKey.Height]: "価格が高い順",
  }[sortKey]);

export const getSortVariables = <T>(sortKey?: SortKey) => {
  switch (sortKey) {
    case SortKey.Recommend:
      return {
        sortKey: "BEST_SELLING" as T,
      };
    case SortKey.Latest:
      return {
        sortKey: "CREATED_AT" as T,
        reverse: true,
      };
    case SortKey.Cheapness:
      return {
        sortKey: "PRICE" as T,
      };
    case SortKey.Height:
      return {
        sortKey: "PRICE" as T,
        reverse: true,
      };
    default:
      return {
        sortKey: "RELEVANCE" as T,
      };
  }
};
