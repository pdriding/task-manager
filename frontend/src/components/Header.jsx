import { useContext } from "react";
import TeamContext from "../context/TeamContext";
import Dropdown from "./Dropdown";

export default function Header() {
  const { teams } = useContext(TeamContext);

  return (
    <>
      <div className="header">
        <h1 className="text-center">TEAM TASK MANAGER</h1>
        <h2>light/dark symbols</h2>
        <Dropdown options={teams} />
      </div>
    </>
  );
}
