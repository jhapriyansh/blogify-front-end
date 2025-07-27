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

const FeedServices = { feed };

export default FeedServices;
