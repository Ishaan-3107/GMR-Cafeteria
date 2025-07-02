import Select from "react-select";

export default function Location({ city, setCity }) {
  const cityOptions = [
    { value: "delhi", label: "Delhi" },
    { value: "mumbai", label: "Mumbai" },
    { value: "bengaluru", label: "Bengaluru" },
    { value: "hyderabad", label: "Hyderabad" },
    { value: "chennai", label: "Chennai" },
    { value: "kolkata", label: "Kolkata" },
    { value: "pune", label: "Pune" },
  ];

  const selectedOption = cityOptions.find(
    (option) => option.label.toLowerCase() === city.toLowerCase()
  );

  const handleChange = (selectedOption) => {
    setCity(selectedOption.label); // This updates the city in App.js
  };

  return (
    <div style={{ width: "150px", margin: "20px" }}>
      <label
        style={{ marginTop: "-22px", marginBottom: "3px", display: "block" }}
      >
        Location:
      </label>
      <Select
        options={cityOptions}
        value={selectedOption}
        onChange={handleChange}
        placeholder="Select a city"
        isSearchable
        styles={{
          control: (provided, state) => ({
            ...provided,
            borderColor: state.isFocused ? "#fc9106" : "#ccc", // Orange on focus, default otherwise
            boxShadow: state.isFocused ? "0 0 0 1px #fc9106" : "none",
            "&:hover": {
              borderColor: "#fc9106",
            },
          }),
          option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected
              ? "#fc9106"
              : state.isFocused
              ? "#ffe3c2"
              : "white",
            color: "black",
          }),
        }}
      />
    </div>
  );
}
