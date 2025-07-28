import { useEffect, useState } from "react";
import FeedServices from "../../Services/FeedServices";
import CommentServices from "../../Services/CommentServices";
import toast from "react-hot-toast";
import Navbar from "../../Components/Navbar";

const Feed = () => {
  const [feedArray, setFeedArray] = useState<
    Array<{
      _id: string;
      title: string;
      body: string;
      createdAt: string;
      likecount: number;
      likedBy: string[];
      comments: string[];
    }>
  >([]);

  const [commentArray, setCommentArray] = useState<
    Array<{ user: string; text: string }>
  >([]);
  const [visibleCommentId, setVisibleCommentId] = useState<string | null>(null);
  const [newComment, setNewComment] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [userName, setUserName] = useState<string>("");

  const likePost = async (postId: string) => {
    try {
      const data = { postId: postId, userId: userId };
      const result = await FeedServices.likePost(data);
      toast.success(result.data.message);
      setFeedArray((prev) =>
        prev.map((item) =>
          item._id === postId
            ? {
                ...item,
                likecount: item.likedBy.includes(userId)
                  ? item.likecount - 1
                  : item.likecount + 1,
                likedBy: item.likedBy.includes(userId)
                  ? item.likedBy.filter((id) => id !== userId)
                  : [...item.likedBy, userId],
              }
            : item
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const dislikePost = async (postId: string) => {
    try {
      const data = { postId: postId, userId: userId };
      const result = await FeedServices.dislikePost(data);
      console.log(result);
      toast.error(result.data.message);
      setFeedArray((prev) =>
        prev.map((item) =>
          item._id === postId
            ? {
                ...item,
                likecount: item.likedBy.includes(userId)
                  ? item.likecount - 1
                  : item.likecount + 1,
                likedBy: item.likedBy.includes(userId)
                  ? item.likedBy.filter((id) => id !== userId)
                  : [...item.likedBy, userId],
              }
            : item
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async (postId: string, likedArr: string[]) => {
    if (likedArr.includes(userId)) {
      dislikePost(postId);
    } else {
      likePost(postId);
    }
  };

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

  const handleAddComment = async (postId: string) => {
    if (!newComment.trim() || !userId) return;
    try {
      const data = {
        postId,
        text: newComment,
        userId,
      };
      await FeedServices.addComment(data);
      const updatedComments = await CommentServices.getPostComment(postId);
      setCommentArray(updatedComments.data.comments);
      setNewComment("");
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  useEffect(() => {
    (async () => {
      const lst = localStorage.getItem("blogify");
      if (lst) {
        const user = JSON.parse(lst);
        const id = user?.data?.user?.id;
        const userName = user?.data?.user?.userName;
        setUserName(userName);
        setUserId(id);
        try {
          const result = await FeedServices.feed(id);
          setFeedArray(result.data.feed);
        } catch (err) {
          console.error("Error fetching feed:", err);
        }
      } else {
        console.warn("No blogify item in localStorage");
      }
    })();
  }, []);

  return (
    <>
      <Navbar userName={userName} userId={userId} />
      <div className="bg-[#f5f5dc] min-h-screen w-full flex flex-col justify-center items-center py-8">
        {feedArray.map((item) => (
          <div
            key={item._id}
            className="w-[90%] md:w-[60%] lg:w-[50%] m-4 flex flex-col rounded-2xl bg-[#fafaec] shadow-2xl"
          >
            <div className="flex justify-between">
              <p className="p-4 font-bold text-4xl">{item.title}</p>
              <p className="self-end text-l pr-4 text-gray-500">
                {item.createdAt.substring(0, 10)}
              </p>
            </div>
            <hr />
            <p className="p-8 text-wrap text-l text-gray-700">{item.body}</p>
            <div className="reviews p-4 gap-4 flex items-center">
              <i
                className="fa-solid fa-heart text-red-600 cursor-pointer"
                onClick={() => {
                  // likePost(item._id);
                  handleLike(item._id, item.likedBy);
                }}
              >
                &nbsp;{item.likecount}
              </i>
              <i
                className="fa-solid fa-comment text-blue-600 cursor-pointer"
                onClick={() => handleComments(item._id)}
              >
                &nbsp;{item.comments.length}
              </i>
            </div>

            {visibleCommentId === item._id && (
              <div className="px-6 pb-4">
                <h4 className="font-semibold mb-2">Comments:</h4>
                {commentArray.map((comment, key) => (
                  <div key={key} className="text-sm mb-2">
                    <p className="font-medium text-gray-800">{comment.user}</p>
                    <p className="text-gray-600 ml-2">{comment.text}</p>
                  </div>
                ))}

                <div className="flex mt-4 gap-2">
                  <input
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment..."
                    className="flex-1 px-3 py-2 rounded-md border border-gray-300"
                  />
                  <button
                    onClick={() => handleAddComment(item._id)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md"
                  >
                    Add
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default Feed;

