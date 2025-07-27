import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthServices from "../../Services/AuthServices";
import toast from "react-hot-toast";

const Register = () => {
  const [email, setEmail] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const data = { email, password, userName };
      const result = await AuthServices.registerService(data);
      toast.success(result.data.message);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-[#f5f5dc] h-screen w-screen flex justify-center items-center">
      <div className="h-[70vh] bg-[#ded1b6] w-[30vw] rounded-3xl flex flex-col justify-center items-center gap-6 shadow-2xl">
        <p className="text-4xl mb-6">Register</p>

        <input
          type="text"
          value={userName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUserName(e.target.value)
          }
          placeholder="UserName"
          className="focus:outline-none focus:ring-0 focus:border-transparent bg-white w-[70%] rounded-2xl text-center h-[10%] m-1 text-xl"
        />
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
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;
