import { useContext } from "react";
import TeamContext from "../context/TeamContext";
import Dropdown from "./Dropdown";

export default function Header() {
  const { teams } = useContext(TeamContext);

  console.log(teams);
  return (
    <>
      <div className="header">
        <h1 className="text-center">TEAM TASK MANAGER</h1>
        <Dropdown options={teams} />
      </div>
    </>
  );
}
