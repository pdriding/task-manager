import { createContext, useState } from "react";

export const TeamContext = createContext({
  teams: [],
  tasks: [],
  selectedTeam: "",
  setSelectedTeam: () => {},
  dispatchTasks: () => {},
});

export function TeamContextProvider({ children }) {
  const teams = ["Marketing", "IT", "Accounting"];
  const [tasks, setTasks] = useState([]);

  const [selectedTeam, setSelectedTeam] = useState("Select team");

  const contextValue = {
    teams,
    tasks,
    selectedTeam,
    setSelectedTeam,
    setTasks,
  };

  return (
    <TeamContext.Provider value={contextValue}>{children}</TeamContext.Provider>
  );
}

export default TeamContext;
