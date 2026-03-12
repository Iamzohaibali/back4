import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';

const App = () => {
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch countries from REST Countries API with specific fields
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://restcountries.com/v3.1/all?fields=name,capital,currencies');
        
        // Transform the data for react-select
        const countryOptions = response.data
          .map(country => {
            // Get the first currency
            const currencies = country.currencies ? Object.values(country.currencies) : [];
            const mainCurrency = currencies.length > 0 ? currencies[0] : { name: 'N/A', symbol: '' };
            
            // Get flag emoji from country code (simplified approach)
            // Note: Since flags aren't in the API response, we'll use a country code to flag emoji mapping
            // For now, we'll use a globe emoji as placeholder
            // You can install 'country-flag-emoji' package for better flag support
            
            return {
              value: country.name.common,
              label: country.name.common,
              officialName: country.name.official,
              capital: country.capital ? country.capital[0] : 'No capital',
              currency: mainCurrency.name,
              currencySymbol: mainCurrency.symbol || '',
              flag: getFlagEmoji(country.name.common) // Custom function to get flag emoji
            };
          })
          .sort((a, b) => a.label.localeCompare(b.label));
        
        setCountries(countryOptions);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching countries:', error);
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  // Helper function to get flag emoji (simplified - you might want to use a proper library)
  const getFlagEmoji = (countryName) => {
    // This is a very simplified mapping - in production, use a proper flag library
    const flagMap = {
      'United States': '🇺🇸',
      'United Kingdom': '🇬🇧',
      'Canada': '🇨🇦',
      'Australia': '🇦🇺',
      'Germany': '🇩🇪',
      'France': '🇫🇷',
      'Japan': '🇯🇵',
      'China': '🇨🇳',
      'India': '🇮🇳',
      'Brazil': '🇧🇷',
      'South Africa': '🇿🇦',
      'Italy': '🇮🇹',
      'Spain': '🇪🇸',
      'Mexico': '🇲🇽',
      'Russia': '🇷🇺',
      'South Korea': '🇰🇷',
      'Argentina': '🇦🇷',
      'Egypt': '🇪🇬',
      'Saudi Arabia': '🇸🇦',
      'Turkey': '🇹🇷',
      'Indonesia': '🇮🇩',
      'Pakistan': '🇵🇰',
      'Bangladesh': '🇧🇩',
      'Nigeria': '🇳🇬',
      'Vietnam': '🇻🇳',
      'Thailand': '🇹🇭',
      'Philippines': '🇵🇭',
      'Poland': '🇵🇱',
      'Netherlands': '🇳🇱',
      'Sweden': '🇸🇪',
      'Belgium': '🇧🇪',
      'Greece': '🇬🇷',
      'Portugal': '🇵🇹',
      'Czech Republic': '🇨🇿',
      'Romania': '🇷🇴',
      'Chile': '🇨🇱',
      'Peru': '🇵🇪',
      'Colombia': '🇨🇴',
      'Venezuela': '🇻🇪',
      'Malaysia': '🇲🇾',
      'Singapore': '🇸🇬',
      'New Zealand': '🇳🇿',
      'Ireland': '🇮🇪',
      'Denmark': '🇩🇰',
      'Finland': '🇫🇮',
      'Norway': '🇳🇴',
      'Iceland': '🇮🇸',
      'Switzerland': '🇨🇭',
      'Austria': '🇦🇹',
      'Hungary': '🇭🇺',
      'Ukraine': '🇺🇦',
      'Israel': '🇮🇱',
      'UAE': '🇦🇪',
      'Qatar': '🇶🇦',
      'Kuwait': '🇰🇼',
      'Morocco': '🇲🇦',
      'Kenya': '🇰🇪',
      'Ghana': '🇬🇭',
    };
    
    return flagMap[countryName] || '🌍';
  };

  // Filter countries based on search
  const filteredCountries = countries.filter(country =>
    country.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.capital.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.currency.toLowerCase().includes(searchTerm.toLowerCase())
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

  // Custom option component with flag and currency info
  const CustomOption = ({ data, innerRef, innerProps, isFocused, isSelected }) => (
    <div
      ref={innerRef}
      {...innerProps}
      className={`flex items-center gap-3 p-3 cursor-pointer ${
        isSelected ? 'bg-blue-500 text-white' : isFocused ? 'bg-blue-50' : 'bg-white'
      }`}
    >
      <span className="text-2xl">{data.flag}</span>
      <div className="flex flex-col flex-1">
        <span className="font-medium">{data.label}</span>
        <div className="flex gap-2 text-xs">
          <span className={`${isSelected ? 'text-blue-100' : 'text-gray-500'}`}>
            Capital: {data.capital}
          </span>
          <span className={`${isSelected ? 'text-blue-100' : 'text-gray-500'}`}>
            • Currency: {data.currency} {data.currencySymbol}
          </span>
        </div>
      </div>
    </div>
  );

  // Format option label with flag for the select input
  const formatOptionLabel = ({ label, flag, capital, currency, currencySymbol }) => (
    <div className="flex items-center gap-2">
      <span className="text-xl">{flag}</span>
      <span>{label}</span>
      <span className="text-xs text-gray-400 ml-2">
        ({capital} • {currency} {currencySymbol})
      </span>
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
            Select countries to see their capitals and currencies
          </p>
        </div>

        {/* Search and Select Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              🔍 Search by country, capital, or currency
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
                isLoading={loading}
                components={{
                  Option: CustomOption
                }}
                className="text-gray-700"
                classNamePrefix="select"
                noOptionsMessage={() => loading ? 'Loading countries...' : 'No countries found'}
                getOptionLabel={(e) => e.label}
                getOptionValue={(e) => e.value}
              />
            </div>
          </div>

          {/* Search input for filtering */}
          <div className="mt-4">
            <input
              type="text"
              placeholder="Filter by country, capital, or currency..."
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 transition-colors"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
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
                    <p className="text-xs text-gray-500">
                      Official: {country.officialName}
                    </p>
                    <div className="flex gap-3 text-xs text-gray-600 mt-1">
                      <span className="flex items-center gap-1">
                        <span className="text-blue-500">🏛️</span> {country.capital}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="text-green-500">💰</span> 
                        {country.currency} {country.currencySymbol}
                      </span>
                    </div>
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
          {loading ? (
            <p className="flex items-center justify-center gap-2">
              <span className="animate-spin">🌍</span> Loading countries...
            </p>
          ) : (
            <p>
              🌎 {countries.length} countries loaded from API • 
              {selectedCountries.length > 0 
                ? ` ${selectedCountries.length} selected` 
                : ' Select your favorites'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;