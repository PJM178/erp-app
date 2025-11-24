"use server"

export async function loginUser(formData: FormData) {
  const username = formData.get("username");
  const password = formData.get("password");

  await new Promise((res) => setTimeout(res, 2000));
  console.log(username);
  console.log(password);
}