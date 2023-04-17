export const convertToLegacyId = (id: string) =>
  id.split("/").pop()!.split("?")[0];
