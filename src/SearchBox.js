import "./SearchBox.css";
import { FaSearch } from "react-icons/fa";

export default function SearchBox() {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search food items or vendors"
        className="searchbox"
      />
    </div>
  );
}
