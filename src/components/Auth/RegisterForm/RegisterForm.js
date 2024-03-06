import { useFormik } from "formik";
import { Form, Message } from "semantic-ui-react";
import { initialValues, validationSchema } from "./RegisterForm.form";
import { Auth } from "@/api";
import { useState } from "react";
import { useRouter } from "next/router";

const authControler = new Auth();

export function RegisterForm() {
  const [hasRegisterError, setHasRegisterError] = useState(false);
  const [errorMessageState, setErrorMessageState] = useState("");
  const router = useRouter();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const { status, errorMessage } = await authControler.register(
          formValue
        );

        if (status !== 200) {
          setHasRegisterError(true);
          setErrorMessageState((prev) => {
            return errorMessage ? errorMessage : "Oops! an error has ocurred";
          });
          return;
        }

        setHasRegisterError(false);
        setErrorMessageState("");
        router.push("/join/sign-in");
      } catch (error) {
        console.log("error on submit register: ", error);
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group widths="equal">
        <Form.Input
          name="email"
          type="text"
          placeholder="Correo electrónico"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.errors.email}
        />
        <Form.Input
          name="username"
          type="text"
          placeholder="Nombre de usuario"
          value={formik.values.username}
          onChange={formik.handleChange}
          error={formik.errors.username}
        />
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Input
          name="name"
          type="text"
          placeholder="Nombre y apellido"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.errors.name}
        />
        <Form.Input
          name="password"
          type="password"
          placeholder="Contraseña"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.errors.password}
        />
      </Form.Group>
      {hasRegisterError && (
        <Message error={false} content={errorMessageState} />
      )}

      <Form.Button type="submit" fluid loading={formik.isSubmitting}>
        Registrarse
      </Form.Button>
    </Form>
  );
}
