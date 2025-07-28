import { useState } from "react";
import BlogServices from "../Services/BlogServices";
import toast from "react-hot-toast";

const Newpost = (props: {
  userId: string;
  setNewPost: (value: boolean) => void;
}) => {
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const handleNewPost = async () => {
    try {
      const data = {
        title: title,
        body: body,
        createdBy: props.userId,
      };
      const result = await BlogServices.createBlog(data);
      toast.success(result.data.message);
      props.setNewPost(false);
    } catch (error) {
      console.log(error);
      props.setNewPost(false);
    }
  };
  return (
    <div className="absolute top-0 right-0 h-screen w-screen bg-black/50 flex items-center justify-center">
      <div className="bg-[#ded1b6] gap-2 h-[70vh] w-[40vw] flex flex-col justify-center items-center rounded-3xl">
        <p className="text-4xl mb-6">New Blog</p>
        <input
          value={title}
          type="text"
          className="focus:outline-none focus:ring-0 focus:border-transparent bg-white w-[70%] rounded-2xl text-center h-[10%] m-1 text-xl"
          placeholder="Title"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <textarea
          value={body}
          className="focus:outline-none focus:ring-0 focus:border-transparent bg-white w-[70%] rounded-2xl text-center h-[40%] m-1 text-xl"
          onChange={(e) => {
            setBody(e.target.value);
          }}
          placeholder="Share your thoughts..."
        />
        <button
          type="submit"
          className="g-[#c6ac8f] flex text-xl justify-center items-center cursor-default w-[70%] h-[10%] rounded-2xl bg-[#b59877] hover:bg-[#523c23] hover:text-white transition-all duration-150 ease-in"
          onClick={() => {
            setBody("");
            setTitle("");
            props.setNewPost(false);
          }}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="g-[#c6ac8f] flex text-xl justify-center items-center cursor-default w-[70%] h-[10%] rounded-2xl bg-[#b59877] hover:bg-[#523c23] hover:text-white transition-all duration-150 ease-in"
          onClick={handleNewPost}
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default Newpost;
