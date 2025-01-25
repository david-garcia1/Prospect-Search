import { NavLink } from "react-router-dom";

const Nav = () => {
  // TODO: Add necessary code to display the navigation bar and link between the pages
  return (
    <div>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/savedCandidates">Saved Users</NavLink>

    </div>
  )
};

export default Nav;
