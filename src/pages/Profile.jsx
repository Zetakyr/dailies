import React from "react";
import { useSelector, useDispatch } from "react-redux";

const Profile = () => {
  const dispatch = useDispatch();
  const { dailyStatistics } = useSelector((state) => state.dailies);
  console.log(dailyStatistics);

  return <div className="rightContainer">Profile</div>;
};

export default Profile;
