import { resolver } from "../resolver";

export const logout = resolver(
  { method: "POST", authenticate: true },
  async ({ session }) => {
    await session.deleteAccessToken();
    return new Request("/");
  }
);
