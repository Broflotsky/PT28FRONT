import * as Yup from "yup";

// 1- Definimos la interfaz de los valores del formulario, en nuestro caso es Login.
export interface LoginFormValuesInterface {
  email: string;
  password: string;
}

// 2- Definimos los valores iniciales de mi formulario Login.
export const initialValuesLogin: LoginFormValuesInterface = {
  email: "",
  password: "",
};

// 3- Esquema de validaciones para este formulario, con YUP
export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email("Correo electronico invalido.")
    .required("El email es un campo obligatorio."),
  password: Yup.string()
    .min(6, "La contraseña debe tener por lo menos 6 caracteres.")
    .required("La contraseña es un campo obligatorio."),
});
