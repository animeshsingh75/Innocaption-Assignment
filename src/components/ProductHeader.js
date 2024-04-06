import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes, faBars } from "@fortawesome/free-solid-svg-icons";
import "./style/ProductHeader.css";
import { formatCategoryName } from "../utils/Utils";
import { debounce } from "../api/debounce";
import { getCategories } from "../api/apiClient";

const Header = ({ onSearch, onCategorySelect }) => {
  const [searchActive, setSearchActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const debouncedSearch = debounce((query) => {
    onSearch(query);
  }, 300);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  useEffect(() => {
    if (searchTerm) {
      debouncedSearch(searchTerm);
    }
  }, [searchTerm, debouncedSearch]);

  const handleSearchIconClick = () => {
    setSearchActive((prev) => !prev);
  };

  const handleMenuIconClick = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      debouncedSearch.cancel();
      onSearch(searchTerm);
      setSearchTerm("");
      setSearchActive(false);
    } else if (e.key === "Escape") {
      setSearchTerm("");
      setSearchActive(false);
    }
  };
  return (
    <div className="header-container">
      <div className="bg-dark text-white p-3 d-flex justify-content-between align-items-center">
        <div className="spacer"></div>
        <h1 className="m-0">My E-commerce Store</h1>
        <div className="header-icons">
          {searchActive ? (
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
              autoFocus
              className="search-input"
            />
          ) : (
            <FontAwesomeIcon
              icon={faSearch}
              size="lg"
              onClick={handleSearchIconClick}
              style={{ cursor: "pointer" }}
            />
          )}
          <FontAwesomeIcon
            icon={isMenuOpen ? faTimes : faBars}
            onClick={handleMenuIconClick}
            className="menu-icon"
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>
      {isMenuOpen && (
        <div className="category-dropdown-menu">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                onCategorySelect(category);
                setIsMenuOpen(false);
              }}
              className="dropdown-item"
            >
              {formatCategoryName(category)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Header;
