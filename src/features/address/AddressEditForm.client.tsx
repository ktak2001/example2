import { Form } from "@shopify/hydrogen/foundation/Form/Form.client";
import { FC } from "react";
import { useValidation } from "../../hooks/useValidation";
import { AddressSchema } from "../../schemas/AddressSchema";
import { Prefecture, getPrefectureName } from "../../constants/Prefecture";
import { AddressListConnectionFragment } from "../../gql/graphql";
import { Input } from "../../components/forms/Input.client";
import { Select } from "../../components/forms/Select.client";
import { Submit } from "../../components/forms/Submit.client";
import { useIsDesktop } from "../../hooks/useIsDesktop";
import clsx from "clsx";
import { Link } from "../../components/Link.client";
import { LinkButton } from "../../components/buttons/LinkButton.client";

type FormData = Required<
  Omit<
    AddressListConnectionFragment["nodes"][number],
    "id" | "formatted" | "company"
  >
>;

interface Props {
  address?: AddressListConnectionFragment["nodes"][number];
}

export const AddressEditForm: FC<Props> = ({ address }) => {
  const { register, errors, isValid, submit } = useValidation<FormData>(
    AddressSchema,
    address
  );
  const isDesktop = useIsDesktop();

  const action = address
    ? `/account/address/${encodeURIComponent(address.id)}/edit`
    : "/account/address/new";

  return (
    <Form action={action} method="post" onSubmit={submit}>
      {({ loading }) => (
        <>
          <div className={isDesktop ? "grid grid-cols-2 gap-4 mb-5" : ""}>
            <Input
              title="お名前（姓）"
              type="text"
              register={register("lastName")}
              error={errors.lastName?.message}
              className="flex-grow"
            />
            <Input
              title="お名前（名）"
              type="text"
              register={register("firstName")}
              error={errors.firstName?.message}
              className="flex-grow"
            />
          </div>
          <Select
            title="国・地域"
            options={[{ label: "日本", value: "Japan" }]}
            register={register("country")}
            error={errors.country?.message}
            className="mb-5"
          />
          <div className={isDesktop ? "grid grid-cols-2 gap-4 mb-5" : ""}>
            <Input
              title="郵便番号"
              type="tel"
              register={register("zip")}
              error={errors.zip?.message}
              className="flex-grow"
            />
            <Select
              title="都道府県"
              options={Object.values(Prefecture).map((prefecture) => ({
                label: getPrefectureName(prefecture),
                value: prefecture,
              }))}
              register={register("province")}
              error={errors.province?.message}
              className="flex-grow"
            />
          </div>
          <Input
            title="市区町村"
            type="text"
            register={register("city")}
            error={errors.city?.message}
            className="mb-5"
          />
          <Input
            title="町名・番地"
            type="text"
            register={register("address1")}
            error={errors.address1?.message}
            className="mb-5"
          />
          <Input
            title="建物名・部屋番号"
            type="text"
            register={register("address2")}
            error={errors.address2?.message}
            className="mb-5"
          />
          <Input
            title="電話番号"
            type="tel"
            register={register("phone")}
            error={errors.phone?.message}
            className="mb-7"
          />
          <div
            className={clsx(
              "grid grid-cols-2 gap-4 mb-5",
              isDesktop ? "" : "px-5"
            )}
          >
            <Link route="address">
              <LinkButton
                title="キャンセル"
                subTitle="CANCEL"
                size="small"
                className="bg-link"
              />
            </Link>
            <Submit
              title="保存"
              subTitle="SAVE"
              disabled={!isValid || loading}
              className="flex justify-center"
              buttonClassName={!isValid || loading ? "bg-link/80" : "bg-link"}
              size="small"
            />
          </div>
        </>
      )}
    </Form>
  );
};
