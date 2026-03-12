import React, { useState } from 'react';
import Select from 'react-select';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

const App = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (option) => {
    setSelectedOption(option);
  };
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Select Your Flavor</h1>
        <Select 
          options={options} 
          className="text-gray-700"
          placeholder="Choose a flavor..."
          value={selectedOption}
          onChange={handleChange}
          isMulti
        />
      </div>
      <div className="absolute bottom-10 text-center w-full">
        {selectedOption && (
          <p className="mt-4 text-gray-700">
            You selected: <span className="font-semibold">{selectedOption.label}</span>
          </p>
        )}
      </div>
    </div>
  )
}

export default App;