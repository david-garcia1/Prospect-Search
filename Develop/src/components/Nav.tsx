import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <header className="bg-gray-800 text-white">
      <nav className="max-w-7xl mx-auto flex items-center space-x-6 p-4">
        {/* Navigation Links */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            `text-white ${
              isActive ? "font-bold" : "hover:underline"
            } transition-all`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/savedCandidates"
          className={({ isActive }) =>
            `text-white ${
              isActive ? "font-bold" : "hover:underline"
            } transition-all`
          }
        >
          Saved Users
        </NavLink>
      </nav>
    </header>
  );
};

export default Nav;
