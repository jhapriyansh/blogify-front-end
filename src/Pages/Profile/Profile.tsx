import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Posts from "../../Components/Posts";
import Comments from "../../Components/Comments";
import Navbar from "../../Components/Navbar";

const Profile = () => {
  const navigate = useNavigate();
  const [activeState, setActiveState] = useState<boolean>(false);
  const [user, setUser] = useState<{
    _id: string;
    email: string;
    userName: string;
  }>({ _id: "", email: "", userName: "" });
  useEffect(() => {
    const data = localStorage.getItem("blogify");
    if (!data) {
      navigate("/");
      return;
    }
    const user = JSON.parse(data);
    console.log(user.data.user);
    setUser(user.data.user);
  }, [navigate]);

  return (
    <>
      <Navbar userId={user._id} userName={user.userName} />
      <div className="bg-[#f5f5dc] min-h-screen w-full flex flex-col justify-center items-center py-8">
        <div className="w-[70%] h-full flex flex-col justify-center items-center relative">
          <div className="flex flex-row w-[50%] justify-evenly items-center m-5 fixed top-6">
            <button
              onClick={() => {
                setActiveState(true);
              }}
              className="bg-[#c6ac8f] flex text-xl justify-center items-center cursor-default w-[30%] h-[10%] rounded-2xl hover:bg-[#523c23] hover:text-white transition-all duration-150 ease-in p-1"
            >
              Posts
            </button>
            <button
              onClick={() => {
                setActiveState(false);
              }}
              className="bg-[#c6ac8f] flex text-xl justify-center items-center cursor-default w-[30%] h-[10%] rounded-2xl hover:bg-[#523c23] hover:text-white transition-all duration-150 ease-in p-1"
            >
              Comments
            </button>
          </div>
          {activeState ? <Posts /> : <Comments />}
        </div>
      </div>
    </>
  );
};

export default Profile;
