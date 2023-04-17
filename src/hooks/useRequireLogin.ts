import { useSession, HydrogenResponse } from "@shopify/hydrogen";

export const useRequireLogin = (response: HydrogenResponse) => {
  const { customerAccessToken } = useSession();
  if (!customerAccessToken) response.redirect("/login");
  return { customerAccessToken };
};
