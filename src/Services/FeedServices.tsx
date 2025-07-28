import axios from "axios";
const lst = localStorage.getItem("blogify");
let user;
if (lst) {
  user = JSON.parse(lst);
}

// if (user && user.token) {
axios.defaults.headers.common["Authorization"] = `Bearer ${user.data.token}`;
// }

const feed = async (id: string) => {
  return axios.post("http://localhost:3002/api/v1/home/feed", { userId: id });
};

const addComment = async (data: {
  postId: string;
  userId: string;
  text: string;
}) => {
  return axios.post("http://localhost:3002/api/v1/home/postComment", data);
};
const deleteComment = async (data: { postId: string; commentId: string }) => {
  return axios.post("http://localhost:3002/api/v1/home/postComment", data);
};

const likePost = async (data: { userId: string; postId: string }) => {
  return axios.post("http://localhost:3002/api/v1/home/likePost", data);
};

const dislikePost = async (data: { userId: string; postId: string }) => {
  return axios.post("http://localhost:3002/api/v1/home/dislikePost", data);
};

const getUserName = async (userId: string) => {
  return axios.get(`http://localhost:3002/api/v1/user/getUser/${userId}`);
};

const FeedServices = {
  feed,
  addComment,
  deleteComment,
  likePost,
  dislikePost,
  getUserName,
};

export default FeedServices;
