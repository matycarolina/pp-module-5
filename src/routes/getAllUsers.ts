import axios from "axios";

const BASE_URL = `http://localhost:3001/users`;

interface User {
  id: number;
  email: string;
  name: string;
  age: number;
}

export const fill = async (username: string, password: string) => {
  try {
    // const  = "malesuada.id@hotmail.org";
    // const  = "WFE64VTJ1BB";

    const token = Buffer.from(`${username}:${password}`, "utf8").toString(
      "base64"
    );
    const response = await axios.get(BASE_URL, {
      headers: {
        Authorization: `Basic ${token}`,
      },
    });
    return response.data.payload;
  } catch (error) {
    return [];
  }
};

export const orderAlpha = (list: User[]) => {
  return list
    .map((user: User) => user.name.split(/\s/)[1].toUpperCase())
    .sort((n1, n2) => n1.localeCompare(n2));
};

export const filterNames = (list: User[]) => {
  return list.filter((user: User) => user.name.match(/^[abc]/i));
};

export const countFilterNames = (list: User[]) => {
  //fix with forEach or reduce, both with dicts
  return list.reduce(
    (letters: { [key: string]: number }, elem) => {
      const i = elem.name.charAt(0).toLocaleLowerCase();
      if (Object.keys(letters).includes(i)) {
        letters[i]++;
      }
      return letters;
    },
    { a: 0, b: 0, c: 0 }
  );
};
