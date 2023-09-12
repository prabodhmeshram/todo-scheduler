import Header from "../Components/Header";
import Footer from "../Components/Footer";
import LoginForm from "../Components/LoginForm";

export default function LoginPage() {
  return (
    <div>
      <Header></Header>
      <div>
        <div className="mt-16">
          <LoginForm></LoginForm>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
