import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import { appLogout } from "../../store/slices/authSlice";
import { setSearchTerm, setResults } from "../../store/slices/searchSlice";
import { Link } from "react-router-dom";

const Navbar = ({ items = [] }) => {
  const dispatch = useDispatch();
  const { searchTerm } = useSelector((state) => state.search);
  const [inputValue, setInputValue] = useState(searchTerm);

  const handleLogout = () => {
    dispatch(appLogout());
  };

  const handleSearchChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearch = () => {
    dispatch(setSearchTerm(inputValue));
    const searchResults = items.filter((item) =>
      item.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    dispatch(setResults(searchResults));
  };

  return (
    <div className="navbar-container">
      <div className="navbar-left-items">
      <Link to="/login" className="navbar-logo">
        <h2>Cloud Home</h2>
      </Link>
      </div>
      <div className="search-container">
        <input
          type="text"
          value={inputValue}
          onChange={handleSearchChange}
          placeholder="Search..."
          className="search-input"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="navbar-right-items">
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
