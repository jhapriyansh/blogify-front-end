import axios from "axios";
const lst = localStorage.getItem("blogify");
let user;
if (lst) {
  user = JSON.parse(lst);
}

if (user && user.token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${user.data.token}`;
}

const createBlog = async (data: {
  title: string;
  body: string;
  createdBy: string;
}) => {
  return axios.post("http://localhost:3002/api/v1/blog/create", data);
};

const getUserPosts = async (id: string) => {
  return axios.get(`http://localhost:3002/api/v1/blog/getUserBlogs/${id}`);
};

const deletePost =  async (id:string) => {
  return axios.delete(`http://localhost:3002/api/v1/blog/delete/${id}`);
}
const getComments =  async (id:string) => {
  return axios.get(`http://localhost:3002/api/v1/comments/getUserComments/${id}`);
}

const BlogServices = { createBlog, getUserPosts, deletePost, getComments };
export default BlogServices;
