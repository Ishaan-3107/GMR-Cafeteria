"use client"

import "./SearchBox.css"
import { FaSearch } from "react-icons/fa"

export default function SearchBox({ value, onSearchChange }) {
  return (
    <div className="search-container">
      <FaSearch className="search-icon" />
      <input
        type="text"
        placeholder="Search food items or vendors"
        className="searchbox"
        value={value}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  )
}
