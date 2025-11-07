"use client";

import { useAuth } from "@/contexts/AuthContext";
import { loginUserService } from "@/services/auth.services";
import {
  initialValuesLogin,
  LoginFormValuesInterface,
  loginValidationSchema,
} from "@/validators/loginSchema";
import { useFormik } from "formik";

const LoginForm = () => {
  const { setDataUser } = useAuth();

  const formik = useFormik<LoginFormValuesInterface>({
    initialValues: initialValuesLogin,
    validationSchema: loginValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      const response = await loginUserService(values);
      setDataUser(response);
      // TODO: AGREGAR LA LÓGICA DE LA PERSISTENCIA DE LA SESIÓN
      console.log("Sesión iniciada", response);
      resetForm();
    },
  });

  return (
    <div className="bg-gray-400 h-[800px] w-[800px] flex items-center justify-center">
      <form className="text-black" onSubmit={formik.handleSubmit}>
        <div className="flex flex-col">
          <label htmlFor="">Correo electronico</label>
          <input
            className="bg-white w-2xs"
            type="email"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.errors.email ? <p>{formik.errors.email}</p> : null}
        </div>
        <div className="flex flex-col">
          <label htmlFor="">Contraseña</label>
          <input
            className="bg-white w-2xs"
            type="password"
            id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {formik.errors.password ? <p>{formik.errors.password}</p> : null}
        </div>
        <button
          className="cursor-pointer"
          type="submit"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? "Iniciando sesión..." : "Inicia sesión."}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
