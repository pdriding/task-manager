import { createContext, useState, useReducer } from "react";

export const TeamContext = createContext({
  teams: [],
  tasks: [],
  selectedTeam: "",
  setSelectedTeam: () => {},
  dispatchTasks: () => {},
});

function taskReducer(state, action) {
  switch (action.type) {
    case "ADD_TASK":
      return [...state];
    default:
      return state;
  }
}

export function TeamContextProvider({ children }) {
  const teams = ["Marketing", "IT", "Accounting"];
  const [tasks, dispatchTasks] = useReducer(taskReducer, []);
  // TODO
  const [selectedTeam, setSelectedTeam] = useState("Select team");

  const contextValue = {
    teams,
    tasks,
    dispatchTasks,
    selectedTeam,
    setSelectedTeam,
  };

  return (
    <TeamContext.Provider value={contextValue}>{children}</TeamContext.Provider>
  );
}

export default TeamContext;
