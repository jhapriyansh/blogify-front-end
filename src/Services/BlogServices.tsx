import axios from "axios";
const lst = localStorage.getItem("blogify");
let user;
if (lst) {
  user = JSON.parse(lst);
}

// if (user && user.token) {
axios.defaults.headers.common["Authorization"] = `Bearer ${user.data.token}`;
// }

const createBlog = async (data: {
  title: string;
  body: string;
  createdBy: string;
}) => {
  return axios.post("http://localhost:3002/api/v1/blog/create", data);
};

const BlogServices = { createBlog };
export default BlogServices;
