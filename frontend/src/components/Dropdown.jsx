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
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="
    flex items-center
    px-4 py-2
    bg-transparent
    text-white
    hover:text-gray-800
    min-w-[160px]    
  "
      >
        <span className="flex-1 text-center truncate">{selectedTeam}</span>
        <svg
          className="flex-shrink-0 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute left-4 mt-2 w-48 bg-white shadow-lg rounded-md border z-50 max-h-60 overflow-auto">
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
