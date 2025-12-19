"use client"

import { useUser } from "@/context/user-context";

const UserInfo = () => {
  const { userInfo } = useUser();

  return (
    <div>
      <span>Hello </span>
      <span>{userInfo?.firstName}</span>
      <span> {userInfo?.lastName}</span>
    </div>
  );
};

export default UserInfo;