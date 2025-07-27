import { useState } from "react";
import AuthServices from "../../Services/AuthServices";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const data = { email, password };
      const result = await AuthServices.loginService(data);
      localStorage.setItem("blogify", JSON.stringify(result));
      navigate("/feed");
      toast.success("Login Successful");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-[#f5f5dc] h-screen w-screen flex justify-center items-center">
      <div className="h-[70vh] bg-[#ded1b6] w-[30vw] rounded-3xl flex flex-col justify-center items-center gap-6 shadow-2xl">
        <p className="text-4xl mb-6">Welcome Back</p>
        <svg
          width="100px"
          height="100px"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <path
              d="M8 7C9.65685 7 11 5.65685 11 4C11 2.34315 9.65685 1 8 1C6.34315 1 5 2.34315 5 4C5 5.65685 6.34315 7 8 7Z"
              fill="#000000"
            ></path>{" "}
            <path
              d="M14 12C14 10.3431 12.6569 9 11 9H5C3.34315 9 2 10.3431 2 12V15H14V12Z"
              fill="#000000"
            ></path>{" "}
          </g>
        </svg>
        <input
          type="email"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          placeholder="Email"
          className="focus:outline-none focus:ring-0 focus:border-transparent bg-white w-[70%] rounded-2xl text-center h-[10%] m-1 text-xl"
        />
        <input
          type="password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value);
          }}
          placeholder="Password"
          className="focus:outline-none focus:ring-0 focus:border-transparent bg-white w-[70%] rounded-2xl text-center h-[10%] m-1 text-xl"
        />
        <button
          className="g-[#c6ac8f] flex text-xl justify-center items-center cursor-default w-[70%] h-[10%] rounded-2xl hover:bg-[#523c23] hover:text-white transition-all duration-150 ease-in"
          type="submit"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
