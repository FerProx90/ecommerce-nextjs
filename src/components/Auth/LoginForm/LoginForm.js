import { useFormik } from "formik";
import { Form, Message } from "semantic-ui-react";
import { initialValues, validationSchema } from "./LoginForm.form";
import { Auth } from "@/api";
import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks";

const authControl = new Auth();

export function LoginForm() {
  const { login } = useAuth();
  const [hasRegisterError, setHasRegisterError] = useState(false);
  const [errorMessageState, setErrorMessageState] = useState("");
  const router = useRouter();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const { status, errorMessage, dataQuery } = await authControl.login(
          formValue
        );

        if (status !== 200) {
          setHasRegisterError(true);
          setErrorMessageState(() => {
            return errorMessage ? errorMessage : "Oop! something went wrong";
          });
          return;
        }

        login(dataQuery.jwt);
        // router.push("/");
      } catch (error) {
        console.log("login error:", error);
      }
    },
  });
  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Input
        name="identifier"
        type="text"
        placeholder="Usuario o correo electrónico"
        value={formik.values.identifier}
        onChange={formik.handleChange}
        error={formik.errors.identifier}
      />
      <Form.Input
        name="password"
        type="password"
        placeholder="contraseña"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.errors.password}
      />
      {hasRegisterError && (
        <Message error={false} content={errorMessageState} />
      )}
      <Form.Button type="submit" fluid loading={formik.isSubmitting}>
        Iniciar sesión
      </Form.Button>
    </Form>
  );
}
