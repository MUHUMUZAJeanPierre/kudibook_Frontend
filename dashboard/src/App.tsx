import React from "react";

import Completed from "./pages/completed/Completed";
import InReview from "./pages/inReview/InReview";
import OnProgress from "./pages/onProgress/OnProgress";
import './index.css';
import ToDo from "./pages/toDo/Todo";
import Topbar from "./components/Topbar/TopBar";
import Sidebar from "./components/Sidebar/SideBar";

const App: React.FC = () => {
  return (
    <>
      <div className="md:flex">
        <Sidebar />

        <div className="flex-1">
          <Topbar />
          <div className="flex-wrap md:justify-around justify-center flex dot-background p-2 gap-3 ">
            <ToDo />
            <OnProgress />
            <InReview />
            <Completed />
          </div>
        </div>

      </div>
    </>
  );
};

export default App;
