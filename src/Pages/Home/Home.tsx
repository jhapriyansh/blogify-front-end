import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-[#f5f5dc] flex justify-center items-center h-screen w-screen">
      <div className="bg-[#ded1b6] w-[50vw] h-[70vh] flex justify-center items-center flex-col rounded-3xl gap-[2rem] shadow-2xl">
        <p className="text-6xl text-[#211f1c]">Blogify</p>
        <p className="text-2xl text-black">
          Share your thoughts with the world.
        </p>
        <div className="flex h-[10vh] w-[70%] mx-y justify-around rounded-3xl items-center ">
          <Link
            to="/register"
            className="bg-[#c6ac8f] flex justify-center items-center cursor-default w-[20%] h-[50%] rounded-2xl hover:bg-[#523c23] hover:text-white transition-all duration-150 ease-in"
          >
            <button>Register</button>
          </Link>
          <Link
            to="/login"
            className="bg-[#c6ac8f] flex justify-center items-center cursor-default w-[20%] h-[50%] rounded-2xl hover:bg-[#523c23] hover:text-white transition-all duration-150 ease-in"
          >
            <button>Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
