import axios from "axios";

export const findUser = async (username: string, password: string)=> {
  try {
    // const  = "malesuada.id@hotmail.org";
    // const  = "WFE64VTJ1BB";

    const token = Buffer.from(`${username}:${password}`, "utf8").toString(
      "base64"
    );
    const response = await axios.get(`http://localhost:3001/user/${username}`, {
      headers: {
        Authorization: `Basic ${token}`,
      },
    });
   
    const user = response.data.payload;
    return {name:user.name, email: user.email};
  } catch (error) {
    return error;
  }
};
