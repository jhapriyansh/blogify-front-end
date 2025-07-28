import axios from "axios";
const lst = localStorage.getItem("blogify");
let user;
if (lst) {
  user = JSON.parse(lst);
}

// if (user && user.token) {
axios.defaults.headers.common["Authorization"] = `Bearer ${user.data.token}`;
// }

const getPostComment = async (id: string) => {
  return axios.get(`http://localhost:3002/api/v1/comments/getComments/${id}`);
};

const CommentServices = { getPostComment };
export default CommentServices;
