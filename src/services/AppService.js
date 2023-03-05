import axios from "axios";

export const getUsers = async () => {
  const res = await axios.get("https://jsonplaceholder.typicode.com/users");
  return res;
};

export const getUserPosts = async (id) => {
  let res = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${id}/posts`
  );
  if (res.status === 200) {
    res = {
      ...res,
      data: res.data.map((item) => ({ ...item, sharedUsers: [item.userId] })),
    };
  }

  return res;
};
