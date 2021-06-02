import axios from "axios";

export default axios.create({
  baseURL: "http://jsonplaceholder.typicode.com/",
  params: {
    _limit: 10,
  },
});
