import { FC } from "react";
import { Link } from "../../components/Link.client";
import { Form } from "@shopify/hydrogen/foundation/Form/Form.client";
import { useValidation } from "../../hooks/useValidation";
import { RegisterSchema } from "../../schemas/RegisterSchema";
import { Responsive } from "../../components/Responsive.client";
import { Input } from "../../components/forms/Input.client";
import { Submit } from "../../components/forms/Submit.client";
import { Heading } from "../../components/Heading.client";
import { useIsDesktop } from "../../hooks/useIsDesktop";

interface FormData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export const Register: FC = () => (
  <Responsive desktop={DesktopRegister} mobile={MobileRegister} />
);

const DesktopRegister = () => (
  <div className="wrapper flex justify-center">
    <div className="mt-10 flex flex-col items-center justify-center">
      <div className="mt-1 mb-4">
        <Heading title="会員登録" subTitle="ENTRY" />
      </div>
      <div className="bg-attention px-32 py-10 w-full mb-4">
        <RegisterForm />
      </div>
      <LoginLink />
      <div
        className="text-sm text-black mb-24 break-words"
        style={{ inlineSize: "800px" }}
      >
        <p className="mb-4">
          携帯キャリアメールアドレスで登録する場合、設定によりメールが届かないことがございます。迷惑メールの設定をご確認いただき、「@cocopet.jp」からのメールが受信できるよう設定してください。
        </p>
        <p className="mb-4">
          弊社からのメールが「迷惑メール」フォルダに分類される可能性がございます。受信トレイにメールが届かない場合は、迷惑メールフォルダや、「プロモーション」フォルダに分類される場合がございます。メールが届いていない場合は、各フォルダをご確認ください。
        </p>
        <p>
          お問い合わせは、
          <Link route="contact">
            <span className="font-bold text-link">こちらより</span>
          </Link>
          ご連絡ください。
        </p>
      </div>
    </div>
  </div>
);

const MobileRegister = () => (
  <div className="mt-10 flex flex-col items-center justify-center">
    <div className="mt-1 mb-4">
      <Heading title="会員登録" subTitle="ENTRY" />
    </div>
    <div className="bg-attention px-4 py-10 w-full mb-4">
      <RegisterForm />
    </div>
    <LoginLink />
    <div className="text-sm text-black mb-24 mx-4">
      <p className="mb-4">
        携帯キャリアメールアドレスで登録する場合、設定によりメールが届かないことがございます。迷惑メールの設定をご確認いただき、「@cocopet.jp」からのメールが受信できるよう設定してください。
      </p>
      <p className="mb-4">
        弊社からのメールが「迷惑メール」フォルダに分類される可能性がございます。受信トレイにメールが届かない場合は、迷惑メールフォルダや、「プロモーション」フォルダに分類される場合がございます。メールが届いていない場合は、各フォルダをご確認ください。
      </p>
      <p>
        お問い合わせは、
        <Link route="contact">
          <span className="font-bold text-link">こちらより</span>
        </Link>
        ご連絡ください。
      </p>
    </div>
  </div>
);

const RegisterForm = () => {
  const { register, errors, isValid, submit } =
    useValidation<FormData>(RegisterSchema);
  const isDesktop = useIsDesktop();

  return (
    <Form action="/register" method="post" onSubmit={submit}>
      {({ loading }) => (
        <>
          <div className={isDesktop ? "grid grid-cols-2 gap-4 mb-5" : ""}>
            <Input
              type="text"
              title="お名前（姓）"
              register={register("lastName")}
              error={errors.lastName?.message}
              className={isDesktop ? "" : "mb-5"}
            />
            <Input
              type="text"
              title="お名前（名）"
              register={register("firstName")}
              error={errors.firstName?.message}
              className={isDesktop ? "" : "mb-5"}
            />
          </div>
          <Input
            type="email"
            title="メールアドレス"
            register={register("email")}
            error={errors.email?.message}
            className="mb-5"
          />
          <Input
            type="password"
            title="パスワード"
            register={register("password")}
            error={errors.password?.message}
            className="mb-8"
          />
          <Submit
            title="会員登録"
            subTitle="ENTRY"
            disabled={!isValid || loading}
            className="flex justify-center"
          />
        </>
      )}
    </Form>
  );
};

const LoginLink = () => (
  <div className="bg-attention py-8 w-full text-center mb-8">
    <p className="text-sm text-black">既に会員の方はこちら</p>
    <Link route="login">
      <p className="font-bold text-link">ログイン</p>
    </Link>
  </div>
);
