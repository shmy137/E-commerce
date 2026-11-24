import axios from "axios";

const USER_API = "http://localhost:3000/users";

export async function registerUser(data) {
  const response = await axios.get(
    `${USER_API}?email=${encodeURIComponent(data.email)}`,
  );

  if (response.data.length > 0) {
    throw new Error("Email already Registered");
  }

  const newUser = await axios.post(USER_API, data);

  return newUser.data;
}

export async function loginUser(email, password) {
  const response = await axios.get(USER_API, {
    params: {
      email: email.trim(),
    },
  });
  console.log("API Response:", response.data);

  const loggedUser = response.data.find(
    (user) =>
      user.email.trim().toLowerCase() === email.trim().toLowerCase() &&
      user.password === password,
  );

  if (!loggedUser) {
    throw new Error("Invalid Credentials");
  }

  return loggedUser;
}
export async function updateUser(userId, updatedData) {
  const response = await axios.patch(
    `${USER_API}/${userId}`,
    updatedData
  );

  return response.data;
}