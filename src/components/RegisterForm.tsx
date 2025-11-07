"use client";

import { registerUserService } from "@/services/auth.services";
import {
  RegisterFormValuesInterface,
  registerInitialValues,
  registerValidationSchema,
} from "@/validators/registerSchema";
import { useFormik } from "formik";

const RegisterForm = () => {
  // email, password, confirmPassword, name, address, phone.

  const formik = useFormik<RegisterFormValuesInterface>({
    initialValues: registerInitialValues,
    validationSchema: registerValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      const response = await registerUserService(values);
      console.log("Información procesada", response);
      resetForm();
    },
  });

  return (
    <div className="bg-gray-400 h-[800px] w-[800px] flex items-center justify-center">
      <form onSubmit={formik.handleSubmit} className="text-black">
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
        <div className="flex flex-col">
          <label htmlFor="">Confirmación de contraseña</label>
          <input
            className="bg-white w-2xs"
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
          />
          {formik.errors.confirmPassword ? (
            <p>{formik.errors.confirmPassword}</p>
          ) : null}
        </div>
        <div className="flex flex-col">
          <label htmlFor="">Nombre</label>
          <input
            className="bg-white w-2xs"
            type="text"
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          {formik.errors.name ? <p>{formik.errors.name}</p> : null}
        </div>
        <div className="flex flex-col">
          <label htmlFor="">Dirección</label>
          <input
            className="bg-white w-2xs"
            type="text"
            id="address"
            name="address"
            value={formik.values.address}
            onChange={formik.handleChange}
          />
          {formik.errors.address ? <p>{formik.errors.address}</p> : null}
        </div>
        <div className="flex flex-col">
          <label htmlFor="">Telefono</label>
          <input
            className="bg-white w-2xs"
            type="text"
            id="phone"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
          />
          {formik.errors.phone ? <p>{formik.errors.phone}</p> : null}
        </div>
        <button
          className="cursor-pointer"
          type="submit"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? "Registrando..." : "Registrate"}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
