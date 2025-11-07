import LoginForm from "@/components/LoginForm";

const LoginPage = () => {
  return (
    <div className="h-screen flex md:flex-col-reverse sm:flex-col-reverse">
      <section className="flex-1 md:">LoginPage</section>
      <section className="flex-1">
        <LoginForm />
      </section>
    </div>
  );
};

export default LoginPage;
