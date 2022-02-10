import React from "react";
import { useParams } from "react-router";

export default function ViewTask() {
  let { taskid } = useParams();
  return (
    <div>
      <h2>Hello my taskid is {taskid}</h2>
    </div>
  );
}
