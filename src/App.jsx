import React, { useState } from 'react';
import Select from 'react-select';

const App = () => {
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Hardcoded countries data with flags (using flag emojis since we don't have image URLs)
  const countries = [
    { value: 'US', label: 'United States', flag: '🇺🇸', region: 'Americas', population: 331000000, capital: 'Washington, D.C.' },
    { value: 'GB', label: 'United Kingdom', flag: '🇬🇧', region: 'Europe', population: 67800000, capital: 'London' },
    { value: 'CA', label: 'Canada', flag: '🇨🇦', region: 'Americas', population: 38000000, capital: 'Ottawa' },
    { value: 'AU', label: 'Australia', flag: '🇦🇺', region: 'Oceania', population: 25700000, capital: 'Canberra' },
    { value: 'DE', label: 'Germany', flag: '🇩🇪', region: 'Europe', population: 83200000, capital: 'Berlin' },
    { value: 'FR', label: 'France', flag: '🇫🇷', region: 'Europe', population: 67300000, capital: 'Paris' },
    { value: 'JP', label: 'Japan', flag: '🇯🇵', region: 'Asia', population: 125800000, capital: 'Tokyo' },
    { value: 'CN', label: 'China', flag: '🇨🇳', region: 'Asia', population: 1402000000, capital: 'Beijing' },
    { value: 'IN', label: 'India', flag: '🇮🇳', region: 'Asia', population: 1380000000, capital: 'New Delhi' },
    { value: 'BR', label: 'Brazil', flag: '🇧🇷', region: 'Americas', population: 213000000, capital: 'Brasília' },
    { value: 'ZA', label: 'South Africa', flag: '🇿🇦', region: 'Africa', population: 59300000, capital: 'Pretoria' },
    { value: 'EG', label: 'Egypt', flag: '🇪🇬', region: 'Africa', population: 102000000, capital: 'Cairo' },
    { value: 'MX', label: 'Mexico', flag: '🇲🇽', region: 'Americas', population: 128900000, capital: 'Mexico City' },
    { value: 'RU', label: 'Russia', flag: '🇷🇺', region: 'Europe/Asia', population: 144100000, capital: 'Moscow' },
    { value: 'IT', label: 'Italy', flag: '🇮🇹', region: 'Europe', population: 60360000, capital: 'Rome' },
    { value: 'ES', label: 'Spain', flag: '🇪🇸', region: 'Europe', population: 47350000, capital: 'Madrid' },
    { value: 'KR', label: 'South Korea', flag: '🇰🇷', region: 'Asia', population: 51780000, capital: 'Seoul' },
    { value: 'ID', label: 'Indonesia', flag: '🇮🇩', region: 'Asia', population: 273500000, capital: 'Jakarta' },
    { value: 'TR', label: 'Turkey', flag: '🇹🇷', region: 'Europe/Asia', population: 84340000, capital: 'Ankara' },
    { value: 'SA', label: 'Saudi Arabia', flag: '🇸🇦', region: 'Asia', population: 34810000, capital: 'Riyadh' },
    { value: 'AR', label: 'Argentina', flag: '🇦🇷', region: 'Americas', population: 45100000, capital: 'Buenos Aires' },
    { value: 'NG', label: 'Nigeria', flag: '🇳🇬', region: 'Africa', population: 206000000, capital: 'Abuja' },
    { value: 'PK', label: 'Pakistan', flag: '🇵🇰', region: 'Asia', population: 220000000, capital: 'Islamabad' },
    { value: 'BD', label: 'Bangladesh', flag: '🇧🇩', region: 'Asia', population: 164700000, capital: 'Dhaka' },
    { value: 'PH', label: 'Philippines', flag: '🇵🇭', region: 'Asia', population: 109600000, capital: 'Manila' },
    { value: 'VN', label: 'Vietnam', flag: '🇻🇳', region: 'Asia', population: 97340000, capital: 'Hanoi' },
    { value: 'TH', label: 'Thailand', flag: '🇹🇭', region: 'Asia', population: 69800000, capital: 'Bangkok' },
    { value: 'NL', label: 'Netherlands', flag: '🇳🇱', region: 'Europe', population: 17150000, capital: 'Amsterdam' },
    { value: 'SE', label: 'Sweden', flag: '🇸🇪', region: 'Europe', population: 10350000, capital: 'Stockholm' },
    { value: 'NO', label: 'Norway', flag: '🇳🇴', region: 'Europe', population: 5421000, capital: 'Oslo' },
  ].sort((a, b) => a.label.localeCompare(b.label));

  // Filter countries based on search
  const filteredCountries = countries.filter(country =>
    country.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.region?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Custom styles for react-select
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: '2px solid #e5e7eb',
      borderRadius: '0.75rem',
      padding: '0.25rem',
      boxShadow: state.isFocused ? '0 0 0 3px rgba(59, 130, 246, 0.3)' : 'none',
      '&:hover': {
        borderColor: '#3b82f6'
      }
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#3b82f6' : state.isFocused ? '#eff6ff' : 'white',
      color: state.isSelected ? 'white' : '#1f2937',
      padding: '0.75rem 1rem',
      cursor: 'pointer'
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: '#eff6ff',
      borderRadius: '0.5rem',
      border: '1px solid #bfdbfe'
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: '#1e40af',
      fontWeight: '500'
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: '#1e40af',
      '&:hover': {
        backgroundColor: '#dbeafe',
        color: '#1e3a8a'
      }
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: '0.75rem',
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.02)'
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#9ca3af'
    })
  };

  // Custom option component with flag
  const CustomOption = ({ data, innerRef, innerProps, isFocused, isSelected }) => (
    <div
      ref={innerRef}
      {...innerProps}
      className={`flex items-center gap-3 p-3 cursor-pointer ${
        isSelected ? 'bg-blue-500 text-white' : isFocused ? 'bg-blue-50' : 'bg-white'
      }`}
    >
      <span className="text-2xl">{data.flag}</span>
      <div className="flex flex-col">
        <span className="font-medium">{data.label}</span>
        <span className={`text-xs ${isSelected ? 'text-blue-100' : 'text-gray-500'}`}>
          {data.region}
        </span>
      </div>
    </div>
  );

  // Format option label with flag for the select input
  const formatOptionLabel = ({ label, flag, region }) => (
    <div className="flex items-center gap-2">
      <span className="text-xl">{flag}</span>
      <span>{label}</span>
      <span className="text-xs text-gray-400 ml-2">({region})</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🌍 Country Explorer
          </h1>
          <p className="text-gray-600">
            Select your favorite countries from around the world
          </p>
        </div>

        {/* Search and Select Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              🔍 Search or select countries
            </label>
            <div className="relative">
              <Select
                options={filteredCountries}
                styles={customStyles}
                formatOptionLabel={formatOptionLabel}
                placeholder="Type to search or select countries..."
                value={selectedCountries}
                onChange={setSelectedCountries}
                isMulti
                components={{
                  Option: CustomOption
                }}
                className="text-gray-700"
                classNamePrefix="select"
                noOptionsMessage={() => 'No countries found'}
                getOptionLabel={(e) => e.label}
                getOptionValue={(e) => e.value}
              />
            </div>
          </div>

          {/* Quick filters */}
          <div className="flex flex-wrap gap-2 mt-4">
            <button
              onClick={() => setSearchTerm('asia')}
              className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors"
            >
              🌏 Asia
            </button>
            <button
              onClick={() => setSearchTerm('europe')}
              className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium hover:bg-green-200 transition-colors"
            >
              🌍 Europe
            </button>
            <button
              onClick={() => setSearchTerm('africa')}
              className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium hover:bg-yellow-200 transition-colors"
            >
              🌍 Africa
            </button>
            <button
              onClick={() => setSearchTerm('americas')}
              className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium hover:bg-red-200 transition-colors"
            >
              🌎 Americas
            </button>
            <button
              onClick={() => setSearchTerm('oceania')}
              className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium hover:bg-purple-200 transition-colors"
            >
              🌏 Oceania
            </button>
            <button
              onClick={() => setSearchTerm('')}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              ✨ Clear filter
            </button>
          </div>
        </div>

        {/* Selected Countries Display */}
        {selectedCountries.length > 0 && (
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              📋 Your Selected Countries ({selectedCountries.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedCountries.map((country) => (
                <div
                  key={country.value}
                  className="flex items-center gap-4 p-3 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <span className="text-4xl">{country.flag}</span>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{country.label}</h3>
                    <div className="flex gap-3 text-xs text-gray-600">
                      <span className="flex items-center gap-1">
                        <span className="text-blue-500">📍</span> {country.region}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="text-green-500">👥</span> 
                        {country.population.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Capital: {country.capital}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedCountries(selectedCountries.filter(c => c.value !== country.value));
                    }}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="mt-6 text-center text-gray-600 text-sm">
          <p>
            🌎 {countries.length} countries available • 
            {selectedCountries.length > 0 
              ? ` ${selectedCountries.length} selected` 
              : ' Select your favorites'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;