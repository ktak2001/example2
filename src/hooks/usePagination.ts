import { useUrl } from "@shopify/hydrogen";

const PER_PAGE = 12;

export const usePagination = <T extends {}>(items: T[]) => {
  const { searchParams } = useUrl();
  const page = Number(searchParams.get("page")) || 1;

  return {
    items: items.slice((page - 1) * PER_PAGE, page * PER_PAGE),
    maxPage: Math.ceil(items.length / PER_PAGE),
    page,
  };
};
