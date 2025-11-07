import * as Yup from "yup";

// Definimos interfaz de los valores del formulario
export interface RegisterFormValuesInterface {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  address: string;
  phone: string;
}

// definimos los valores iniciales.

export const registerInitialValues = {
  email: "",
  password: "",
  confirmPassword: "",
  name: "",
  address: "",
  phone: "",
};

// Esquema de validaciones de nuestro formulario.

export const registerValidationSchema = Yup.object({
  email: Yup.string()
    .email("Correo electronico invalido.")
    .required("El email es un campo obligatorio."),
  password: Yup.string()
    .min(6, "La contraseña debe tener por lo menos 6 caracteres.")
    .required("La contraseña es un campo obligatorio."),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Las 2 contraseñas deben coincidir.")
    .required("Este campo es requerido."),
  name: Yup.string().required("Este campo es requerido."),
  address: Yup.string().required("Este campo es requerido."),
  phone: Yup.string().matches(
    /^[0-9+\-\s()]+$/,
    "El teléfono debe contener solo números y caracteres válidos"
  ),
});
