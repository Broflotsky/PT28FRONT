import RegisterForm from "@/components/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="h-screen flex md:flex-col-reverse sm:flex-col-reverse">
      <section className="flex-1 md:">RegisterPage</section>
      <section className="flex-1">
        <RegisterForm />
      </section>
    </div>
  );
};

export default RegisterPage;
