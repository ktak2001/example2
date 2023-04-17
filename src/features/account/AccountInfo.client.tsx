import { Form } from "@shopify/hydrogen/foundation/Form/Form.client";
import clsx from "clsx";
import { Heading } from "../../components/Heading.client";
import { Link } from "../../components/Link.client";
import { LinkButton } from "../../components/buttons/LinkButton.client";
import { Responsive } from "../../components/Responsive.client";
import { SubHeading } from "../../components/SubHeading.client";
import { Input } from "../../components/forms/Input.client";
import { Submit } from "../../components/forms/Submit.client";
import { useIsDesktop } from "../../hooks/useIsDesktop";
import { useValidation } from "../../hooks/useValidation";
import { InfoSchema } from "../../schemas/InfoSchema";
import { AccountMenu } from "./AccountMenu.client";

export const AccountInfo = () => (
  <div>
    <Responsive desktop={DesktopAccountInfo} mobile={MobileAccountInfo} />
    <div className="mb-10">
      <AccountMenu selected="loginInfo" />
    </div>
  </div>
);

const DesktopAccountInfo = () => (
  <div className="flex flex-col">
    <div className="mt-10 mb-3">
      <Heading title="マイページ" subTitle="MY PAGE" />
    </div>
    <div className="bg-attention pt-12 pb-10 mb-12">
      <div className="flex justify-center">
        <div className="flex flex-col">
          <div className="mb-2">
            <SubHeading title="MY ADDRESS" subTitle="登録住所" />
          </div>
          <div className="bg-white flex justify-center py-10 wrapper">
            <EditInfoForm />
          </div>
        </div>
      </div>
    </div>
  </div>
);

const MobileAccountInfo = () => (
  <div className="flex flex-col">
    <div className="mt-10 mb-3">
      <Heading title="マイページ" subTitle="MY PAGE" />
    </div>
    <div className="bg-attention pt-7 pb-14 px-5 mb-14">
      <div className="flex flex-col">
        <div className="mb-2">
          <SubHeading title="MY ADDRESS" subTitle="登録住所" />
        </div>
        <div className="bg-white px-5 pt-7 pb-11">
          <EditInfoForm />
        </div>
      </div>
    </div>
  </div>
);

interface FormData {
  email: string;
  password: string;
}

const EditInfoForm = () => {
  const { register, errors, isValid, submit } =
    useValidation<FormData>(InfoSchema);
  const isDesktop = useIsDesktop();

  return (
    <Form action="/account/info" method="post" onSubmit={submit}>
      {({ loading }) => (
        <>
          <Input
            title="メールアドレス"
            type="email"
            register={register("email")}
            error={errors.email?.message}
            className="mb-5"
          />
          <Input
            title="パスワード"
            type="password"
            register={register("password")}
            error={errors.password?.message}
            className="mb-5"
          />
          <div
            className={clsx("grid grid-cols-2 gap-4", isDesktop ? "" : "px-5")}
          >
            <Link route="account">
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
              className="w-full"
              buttonClassName={clsx(
                "w-full h-full",
                !isValid || loading ? "bg-link/80" : "bg-link"
              )}
              size="small"
            />
          </div>
        </>
      )}
    </Form>
  );
};
