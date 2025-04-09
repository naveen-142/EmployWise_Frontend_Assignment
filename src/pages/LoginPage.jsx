import LoginForm from '../components/LoginForm';

const LoginPage = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded shadow">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
