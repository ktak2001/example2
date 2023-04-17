import { HydrogenApiRouteOptions, HydrogenRequest } from "@shopify/hydrogen";
import { createSessionClient } from "./createSessionClient";
import { Errors } from "./Errors";

interface Options {
  method: "GET" | "POST" | "DELETE";
  authenticate?: boolean;
}

export const resolver =
  <Params = {}, FormData = {}>(
    { method, authenticate }: Options,
    handler: (args: {
      params: Params;
      formData: FormData;
      session: ReturnType<typeof createSessionClient>;
      queryShop: HydrogenApiRouteOptions["queryShop"];
    }) => Promise<Request>
  ) =>
  async (
    request: HydrogenRequest,
    { queryShop, ...options }: HydrogenApiRouteOptions
  ) => {
    if (!options.session) {
      return new Request("/");
    }

    const session = createSessionClient(options.session);

    if (request.method !== method) {
      await session.setError(Errors.InvalidMethod);
      return new Request("/");
    }

    if (authenticate) {
      const accessToken = await session.getAccessToken();
      if (!accessToken) return new Request("/");
    }

    const params = options.params as Params;

    const formData =
      method === "POST"
        ? await request
            .formData()
            .then((data) => Object.fromEntries(data.entries()) as FormData)
        : ({} as FormData);

    return handler({ params, formData, session, queryShop });
  };
