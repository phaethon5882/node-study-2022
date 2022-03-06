import axios from "axios";
import IUser from "./types/json-placeholder/user.interface";

const API_PREFIX = 'https://jsonplaceholder.typicode.com';
enum EndPoints {
  USERS = 'users',
  POSTS = 'posts',
  ALBUMS = 'albums',
}

async function fetchUsers() {
  const apiUrl = `${API_PREFIX}/${EndPoints.USERS}`;
  const { data: users } = await axios.get<IUser[]>(apiUrl);
  return users;
}

function toJSON(obj: any): string {
  try {
    return JSON.stringify(obj, null, 2);
  } catch (e) {
    console.log(e);
    return 'Error Occurred!';
  }
}

// (async () => {
//   const users = await fetchUsers();
//   console.log(toJSON(users));
// })();

(async () => {
  // const [users, posts, albums] = await Promise.all(Object.values(EndPoints).map(async (endpoint: string) => {
  //   return axios.get(`${API_PREFIX}/${endpoint}`).then((res) => res.data);
  // }));

  const result: any[] = [];
  for await (let api of Object.values(EndPoints).map((endPoint: string) => axios.get(`${API_PREFIX}/${endPoint}`))) {
    const { data } = await api;
    result.push(data);
  }

  const [users, posts, albums] = result;
  console.log({ users, posts, albums });
})();