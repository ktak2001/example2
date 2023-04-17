import { FC } from "react";
import { Link } from "../../components/Link.client";
import { Heading } from "../../components/Heading.client";
import { Responsive } from "../../components/Responsive.client";
import { Form } from "@shopify/hydrogen/foundation/Form/Form.client";
import { useValidation } from "../../hooks/useValidation";
import { LoginSchema } from "../../schemas/LoginSchema";
import { Input } from "../../components/forms/Input.client";
import { Submit } from "../../components/forms/Submit.client";

interface FormData {
  email: string;
  password: string;
}

export const Login: FC = () => (
  <Responsive desktop={DesktopLogin} mobile={MobileLogin} />
);

const DesktopLogin = () => (
  <div className="wrapper flex justify-center">
    <div className="mt-10 flex flex-col items-center justify-center">
      <div className="mt-1 mb-4">
        <Heading title="ログイン" subTitle="LOG IN" />
      </div>
      <div className="bg-attention px-48 py-10 w-full mb-4">
        <LoginForm />
      </div>
      <RegisterLink />
    </div>
  </div>
);

const MobileLogin = () => (
  <div className="mt-10 flex flex-col items-center justify-center">
    <div className="mt-1 mb-4">
      <Heading title="ログイン" subTitle="LOG IN" />
    </div>
    <div className="bg-attention px-4 py-10 w-full mb-4">
      <LoginForm />
    </div>
    <RegisterLink />
  </div>
);

const LoginForm = () => {
  const { register, errors, isValid, submit } =
    useValidation<FormData>(LoginSchema);

  return (
    <Form action="/login" method="post" onSubmit={submit}>
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
          <Link route="recover">
            <p className="text-sm text-link text-center mb-8 font-bold">
              パスワードをお忘れですか？
            </p>
          </Link>
          <Submit
            title="ログイン"
            subTitle="LOG IN"
            disabled={!isValid || loading}
            className="flex justify-center"
          />
        </>
      )}
    </Form>
  );
};

const RegisterLink = () => (
  <div className="bg-attention py-8 w-full text-center mb-24">
    <p className="text-sm text-black">まだ会員登録がお済みでない方</p>
    <Link route="register">
      <p className="font-bold text-link">新規会員登録はこちら</p>
    </Link>
  </div>
);
