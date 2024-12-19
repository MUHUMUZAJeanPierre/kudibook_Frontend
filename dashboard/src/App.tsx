import React from "react";

import Completed from "./pages/completed/Completed";
import InReview from "./pages/inReview/InReview";
import OnProgress from "./pages/onProgress/OnProgress";
import "./index.css";
import ToDo from "./pages/toDo/Todo";
import Topbar from "./components/Topbar/TopBar";
import Sidebar from "./components/Sidebar/SideBar";
import { Container, Draggable } from "react-smooth-dnd"; 

const App: React.FC = () => {
  return (
    <>
      <div className="flex flex-col gap-0 md:flex-row">
        <Sidebar />

        <div className="flex flex-col flex-1">
          <Topbar />
          <div className="flex flex-wrap justify-center gap-2 md:gap-2 md:justify-around ">
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
