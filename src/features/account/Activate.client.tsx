import { Form } from "@shopify/hydrogen/foundation/Form/Form.client";
import { FC } from "react";
import { useValidation } from "../../hooks/useValidation";
import { ActivateSchema } from "../../schemas/ActivateSchema";

interface Props {
  id: string;
  activationToken: string;
}

interface FormData {
  password: string;
  passwordConfirm: string;
}

export const Activate: FC<Props> = ({ id, activationToken }) => {
  const { register, errors, submit } = useValidation<FormData>(ActivateSchema);

  return (
    <Form action="/account/activate" method="post" onSubmit={submit}>
      {({ loading }) => (
        <>
          <input type="hidden" name="id" value={id} />
          <input type="hidden" name="activationToken" value={activationToken} />
          <div>
            <label>Password</label>
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
