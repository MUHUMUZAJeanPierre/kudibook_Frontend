import React from "react";

import Completed from "./pages/completed/Completed";
import InReview from "./pages/inReview/InReview";
import OnProgress from "./pages/onProgress/OnProgress";
import "./index.css";
import ToDo from "./pages/toDo/Todo";
import Topbar from "./components/Topbar/TopBar";
import Sidebar from "./components/Sidebar/SideBar";

const App: React.FC = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row gap-0">
        <Sidebar />

        <div className="flex-1 flex flex-col">
          <Topbar />
          <div className="flex flex-wrap justify-center md:justify-around p-2 gap-2 dot-background">
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
