import { useForm, DefaultValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import i18next from "i18next";
import { Schema } from "zod";
import { zodI18nMap } from "zod-i18n-map";
import translation from "../../zod.json";

i18next.init({
  lng: "ja",
  resources: {
    ja: { zod: translation },
  },
  interpolation: {
    skipOnVariables: false,
  },
});

export const useValidation = <T extends Record<string, any>>(
  schema: Schema,
  defaultValues?: DefaultValues<T>
) => {
  const {
    register,
    formState: { errors },
  } = useForm<T>({
    mode: "onBlur",
    resolver: zodResolver(schema, { errorMap: zodI18nMap }),
    defaultValues,
  });

  const isValid = !Object.keys(errors).length;

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    if (!isValid) event.preventDefault();
  };

  return {
    register,
    errors,
    isValid,
    submit,
  };
};
