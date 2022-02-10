import React from "react";
import Tabledetails from "./components/OwnerReportSection/TableSection/Table";
import {BrowserRouter as Router , Route,Routes } from "react-router-dom";
import Card from "./components/OwnerReportSection/CardSection/Card";
import ViewTask from "./components/OwnerReportSection/Taskmanagement/viewTask";

function LeaderReport() {
  return (
    <Router>
      <Routes>
     <Route exact path ="/" element={<Card/>}>
     </Route>
     <Route exact path="/Table/:uid" element={<Tabledetails/>}>
     </Route>
     <Route exact path="/viewTask/:taskid" element={<ViewTask/>}>
     </Route>
     </Routes>
    </Router>
  );
}

export default LeaderReport;
