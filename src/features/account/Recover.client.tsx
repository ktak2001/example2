import { FC } from "react";
import { Heading } from "../../components/Heading.client";
import { Link } from "../../components/Link.client";
import { Form } from "@shopify/hydrogen/foundation/Form/Form.client";
import { useValidation } from "../../hooks/useValidation";
import { RecoverSchema } from "../../schemas/RecoverSchema";
import { Responsive } from "../../components/Responsive.client";
import { Submit } from "../../components/forms/Submit.client";
import { Input } from "../../components/forms/Input.client";

interface FormData {
  email: string;
  emailConfirm: string;
}

export const Recover: FC = () => (
  <Responsive desktop={DesktopRecover} mobile={MobileRecover} />
);

const DesktopRecover = () => (
  <div className="wrapper flex justify-center">
    <div className="mt-10 flex flex-col items-center justify-center">
      <div className="mt-1 mb-4">
        <Heading title="パスワードをリセット" subTitle="RESET" />
      </div>
      <div className="bg-attention pt-10 pb-8 w-full mb-4">
        <p className="text-center text-black text-sm mb-8">
          パスワードをリセットするためのメールを送信します。 <br />
          届いたメールをご確認いただき、指示の通りにパスワード変更を行ってください。
        </p>
        <div className="px-48">
          <RecoverForm />
        </div>
      </div>
      <LoginLink />
      <div
        className="text-sm text-black mb-24 break-words"
        style={{ inlineSize: "800px" }}
      >
        <p className="mt-4">
          携帯キャリアメールアドレスで登録する場合、設定によりメールが届かないことがございます。迷惑メールの設定をご確認いただき、「@cocopet.jp」からのメールが受信できるよう設定してください。
        </p>
        <p className="mt-4">
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

const MobileRecover = () => (
  <div className="mt-10 flex flex-col items-center justify-center">
    <div className="mt-1 mb-4">
      <Heading title="パスワードをリセット" subTitle="RESET" />
    </div>
    <div className="bg-attention pt-10 pb-8 w-full mb-4 px-4">
      <p className="text-center text-black text-sm mb-8">
        パスワードをリセットするためのメールを送信します。 <br />
        届いたメールをご確認いただき、指示の通りにパスワード変更を行ってください。
      </p>
      <div>
        <RecoverForm />
      </div>
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

const RecoverForm = () => {
  const { register, errors, isValid, submit } =
    useValidation<FormData>(RecoverSchema);

  return (
    <Form action="/account/recover" method="post" onSubmit={submit}>
      {({ loading }) => (
        <>
          <Input
            type="email"
            title="メールアドレス"
            register={register("email")}
            error={errors.email?.message}
            className="mb-5"
          />
          <Input
            type="email"
            title="メールアドレス（確認）"
            register={register("email")}
            error={errors.email?.message}
            className="mb-8"
          />
          <Submit
            title="メール送信"
            subTitle="MAIL"
            disabled={!isValid || loading}
            className="flex justify-center mb-[11px]"
          />
          <Link route="login">
            <p className="text-center text-sm text-link font-bold">
              キャンセル
            </p>
          </Link>
        </>
      )}
    </Form>
  );
};

const LoginLink = () => (
  <div className="bg-attention py-8 w-full text-center mb-8">
    <p className="text-sm text-black">まだ会員登録がお済みでない方</p>
    <Link route="register">
      <p className="font-bold text-link">新規会員登録はこちら</p>
    </Link>
  </div>
);
