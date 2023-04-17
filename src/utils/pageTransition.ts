export const pageTransition =
  (
    navigate: (path: string) => void,
    path: string,
    commonParams: { [key: string]: any }
  ) =>
  (specificParams: { [key: string]: any }) => {
    const allParams = { ...commonParams, ...specificParams };
    const params = Object.keys(allParams)
      .filter((key) => !!allParams[key as keyof typeof allParams])
      .map((key) => `${key}=${allParams[key as keyof typeof allParams]}`)
      .join("&");
    navigate(`${path}${params ? `?${params}` : ""}`);
  };
