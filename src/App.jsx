import { useState } from "react";
import "./app.scss";
import CurrentDailyTasks from "./pages/CurrentDailyTasks";
import DailyTaskPool from "./pages/DailyTaskPool";
import WeeklyTaskPool from "./pages/WeeklyTaskPool";
import CurrentWeeklyTasks from "./pages/CurrentWeeklyTasks";
import Profile from "./pages/Profile";

function App() {
  const [view, setView] = useState("daily");
  // const [tab, setTab] = useState(1)

  const renderView = () => {
    switch (view) {
      case "daily":
        return <CurrentDailyTasks />;

      case "dailyPool":
        return <DailyTaskPool />;

      case "weekly":
        return <CurrentWeeklyTasks />;

      case "weeklyPool":
        return <WeeklyTaskPool />;

      case "profile":
        return <Profile />;

      default:
        return <CurrentDailyTasks />;
    }
  };
  return (
    <div className="section">
      <div className="leftContainer">
        <div className="profile" onClick={() => setView("profile")}></div>

        <div
          className={`${view === "daily" ? "currentTab" : ""} dailyWeekly`}
          onClick={() => setView("daily")}
        >
          Dailies
          <div
            className={`${view === "dailyPool" ? "currentTab" : ""} edit`}
            onClick={(e) => {
              setView("dailyPool");
              e.stopPropagation();
            }}
          >
            <div className={`${view === "dailyPool" ? "currentEdit" : ""}`}>
              Edit
            </div>
          </div>
        </div>

        <div
          className={`${view === "weekly" ? "currentTab" : ""} dailyWeekly`}
          onClick={() => setView("weekly")}
        >
          Weeklies
          <div
            className={`${view === "weeklyPool" ? "currentTab" : ""} edit`}
            onClick={(e) => {
              setView("weeklyPool");
              e.stopPropagation();
            }}
          >
            <div className={`${view === "weeklyPool" ? "currentEdit" : ""}`}>
              Edit
            </div>
          </div>
        </div>
      </div>

      {renderView()}
    </div>
  );
}

export default App;
