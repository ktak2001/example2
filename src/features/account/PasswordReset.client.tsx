import { FC } from "react";
import { useValidation } from "../../hooks/useValidation";
import { ResetSchema } from "../../schemas/ResetSchema";
import { Form } from "@shopify/hydrogen/foundation/Form/Form.client";

interface FormData {
  id: string;
  resetToken: string;
  password: string;
  passwordConfirm: string;
}

interface Props {
  id: string;
  resetToken: string;
}

export const PasswordReset: FC<Props> = ({ id, resetToken }) => {
  const { register, errors, submit } = useValidation<FormData>(ResetSchema);

  return (
    <Form action="/account/reset" method="POST" onSubmit={submit}>
      {({ loading }) => (
        <>
          <div>
            <input type="hidden" value={id} name="id" />
            <input type="hidden" value={resetToken} name="resetToken" />
          </div>
          <div>
            <label>New password</label>
            <input type="password" {...register("password")} />
            {errors.password && <p>{errors.password.message}</p>}
          </div>
          <div>
            <label>Password Confirm</label>
            <input type="password" {...register("passwordConfirm")} />
            {errors.passwordConfirm && <p>{errors.passwordConfirm.message}</p>}
          </div>
          {loading && <p>loading...</p>}
          <button type="submit" disabled={loading}>
            Submit
          </button>
        </>
      )}
    </Form>
  );
};
