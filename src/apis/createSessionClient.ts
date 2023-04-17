import { HydrogenApiRouteOptions } from "@shopify/hydrogen";
import { Errors } from "./Errors";
import { SessionKey } from "../constants/SessionKey";

type Session = NonNullable<HydrogenApiRouteOptions["session"]>;

export const createSessionClient = (session: Session) => ({
  setError: (error: Errors) => session.set(SessionKey.DisplayError, error),
  getAccessToken: () =>
    session.get().then((data) => data[SessionKey.AccessToken]),
  setAccessToken: (token: string) => session.set(SessionKey.AccessToken, token),
  deleteAccessToken: () => session.set(SessionKey.AccessToken, ""),
});
