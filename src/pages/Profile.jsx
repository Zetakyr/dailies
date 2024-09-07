import React from "react";
import { useSelector, useDispatch } from "react-redux";
import DisplayYear from "../components/DisplayYear";
import "../profile.scss";

const Profile = () => {
  const dispatch = useDispatch();
  const { dailyStatistics } = useSelector((state) => state.dailies);
  console.log(dailyStatistics);

  const displayYear = (year) => {
    return <div>
      <div className="yearContainer">
        <h1>{year}</h1>
      </div>
      <div className="monthContainer">
        
      </div>
    </div>
  }

  return <div className="rightContainer">
        {Object.keys(dailyStatistics).map((year) => (
      <DisplayYear key={year} year={year} />
    ))}
  </div>;
};

export default Profile;
