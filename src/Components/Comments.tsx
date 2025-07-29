import { useEffect, useState } from "react";
import BlogServices from "../Services/BlogServices";

const Comments = () => {
  const [blogArr, setBlogArr] = useState<
    Array<{
      comment: { text: string },
      post: {
        title: string;
        body: string;
        likecount: number;
        comments: string;
      };
    }>
  >();
  const getComments = async (id: string) => {
    try {
      const res = await BlogServices.getComments(id);
      console.log("API Response:", res.data.commentPosts);
      setBlogArr(res.data.commentPosts);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  useEffect(() => {
    const stored = localStorage.getItem("blogify");
    if (stored) {
      const parsed = JSON.parse(stored);
      const userData = parsed?.data?.user;
      if (userData && userData.id) {
        getComments(userData.id);
      } else {
        console.error("Invalid user data in localStorage");
      }
    } else {
      console.error("No blogify data in localStorage");
    }
  }, []);

  return (
    <div className="flex flex-col gap-6 mt-20 items-center">
      <p className="text-4xl">Comments</p>
      {blogArr?.map((item, key) => {
        return (
          <div
            key={key}
            className="bg-[#fafaec] shadow-xl p-6 rounded-3xl w-[100%] border-gray-200 border-2"
          >
            <div className="flex justify-between">
              <p className="text-2xl ">{item.post.title}</p>
            </div>
            <p className="text-lg p-2">{item.post.body}</p>
            <div className="flex justify-around items-center">
              <p>
                <i className="fa-solid fa-heart" />
                &nbsp;{item.post.likecount}
              </p>
              <p>
                <i className="fa-solid fa-comment" />
                &nbsp;{item.post.comments.length}
              </p>
            </div>
            <div className="px-6 pb-4">
              <p className="font-medium text-gray-800 m-3">My comment: {item.comment.text}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Comments;
