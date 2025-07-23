import { useState, useContext } from "react";
import TeamContext from "../context/TeamContext";

function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { teams, selectedTeam, setSelectedTeam } = useContext(TeamContext);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (option) => {
    setSelectedTeam(option);
    setIsOpen(false);
  };
  return (
    <div className="team-switcher relative  text-left flex">
      {/* <p>Team:{"\u00A0"}</p> */}
      <button onClick={toggleDropdown} className=" py-2 rounded-md shadow">
        {selectedTeam}
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-48 bg-white shadow-lg rounded-md border z-10">
          {teams.map((team) => (
            <div
              key={team}
              onClick={() => handleSelect(team)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {team}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
