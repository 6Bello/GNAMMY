import axios from "axios";

let user;

export const updateUserData = (data) => {
  user = data;
  console.log(user);
};

export async function getNameByUsername(username) {
  try {
    const response = await axios.get(`http://localhost:port/getName/${username}`);
    if (response.status === 200) {
      const user = response.data;
      const name = user.name;
      console.log(`The user's name is: ${name}`);
    } else {
      console.log('User not found');
    }
  } catch (error) {
    console.error('An error occurred while retrieving the user:', error);
  }
}
