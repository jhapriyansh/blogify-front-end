import { useEffect, useState } from "react";
import BlogServices from "../Services/BlogServices";
import CommentServices from "../Services/CommentServices";

const Posts = () => {
  const [commentArray, setCommentArray] = useState<
    Array<{ user: string; text: string }>
  >([]);
  const [visibleCommentId, setVisibleCommentId] = useState<string | null>(null);

  const [postArr, setPostArr] = useState<
    Array<{
      _id: string;
      title: string;
      createdBy: string;
      body: string;
      likecount: number;
      comments: string;
      createdAt: string;
    }>
  >();
  const handleComments = async (id: string) => {
    if (visibleCommentId === id) {
      setVisibleCommentId(null);
      return;
    }
    try {
      const result = await CommentServices.getPostComment(id);
      setCommentArray(result.data.comments);
      setVisibleCommentId(id);
    } catch (error) {
      console.log(error);
    }
  };
  const getPosts = async (id: string) => {
    try {
      const res = await BlogServices.getUserPosts(id);
      console.log("API Response:", res);
      setPostArr(res.data.blogs);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  const deletePost = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirmDelete) return;

    try {
      const res = await BlogServices.deletePost(id);
      console.log("Response:", res);
      setPostArr((prev) => prev?.filter((post) => post._id !== id));
    } catch (error) {
      console.error("Delete error", error);
    }
  };

  useEffect(() => {
    const stored = localStorage.getItem("blogify");

    if (stored) {
      const parsed = JSON.parse(stored);
      const userData = parsed?.data?.user;
      console.log(userData);
      if (userData && userData.id) {
        getPosts(userData.id);
      } else {
        console.error("Invalid user data in localStorage");
      }
    } else {
      console.error("No blogify data in localStorage");
    }
  }, []);

  return (
    <div className="flex flex-col gap-6 mt-20 items-center">
      <p className="text-4xl">Posts</p>
      {postArr?.map((item, key) => {
        return (
          <div
            key={key}
            className="bg-[#fafaec] shadow-xl p-6 rounded-3xl w-[100%] border-gray-200 border-2"
          >
            <div className="flex justify-between">
              <p className="text-2xl ">{item.title}</p>
              <p onClick={() => deletePost(item._id)}>
                <i className="fa-solid fa-trash text-red-300 p-2 border-2 border-black rounded-full hover:bg-red-300 hover:text-black transition-all duration-300" />
              </p>
            </div>
            <p className="text-lg p-2">{item.body}</p>
            <div className="flex justify-around items-center">
              <p>
                <i className="fa-solid fa-heart" />
                &nbsp;{item.likecount}
              </p>
              <p
                onClick={() => handleComments(item._id)}
                className=" cursor-pointer"
              >
                <i className="fa-solid fa-comment" />
                &nbsp;{item.comments.length}
              </p>
            </div>
            {visibleCommentId === item._id && (
              <div className="px-6 pb-4">
                <h4 className="font-semibold mb-2">Comments:</h4>
                {commentArray.length === 0 && <h1>No Comments Yet</h1>}
                {commentArray.map((comment, key) => (
                  <div key={key} className="text-sm mb-2">
                    <p className="font-medium text-gray-800">{comment.user}</p>
                    <p className="text-gray-600 ml-2">{comment.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Posts;
