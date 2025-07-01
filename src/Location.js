import Select from 'react-select';

export default function Location({ city, setCity }) {
  const cityOptions = [
    { value: 'delhi', label: 'Delhi' },
    { value: 'mumbai', label: 'Mumbai' },
    { value: 'bangalore', label: 'Bangalore' },
    { value: 'hyderabad', label: 'Hyderabad' },
    { value: 'chennai', label: 'Chennai' },
    { value: 'kolkata', label: 'Kolkata' },
    { value: 'pune', label: 'Pune' },
  ];

  const selectedOption = cityOptions.find(option => option.label.toLowerCase() === city.toLowerCase());

  const handleChange = (selectedOption) => {
    setCity(selectedOption.label); // This updates the city in App.js
  };

  return (
    <div style={{ width: '150px', margin: '20px' }}>
      <label style={{ marginTop: '-22px', marginBottom: '3px', display: 'block' }}>Location:</label>
      <Select
        options={cityOptions}
        value={selectedOption}
        onChange={handleChange}
        placeholder="Select a city"
        isSearchable
      />
    </div>
  );
}
