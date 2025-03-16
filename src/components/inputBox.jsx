import React, { useState } from 'react'
import { FiDollarSign, FiChevronDown, FiChevronUp, FiRefreshCw } from 'react-icons/fi'

function InputBox({
  label,
  amount,
  onAmountChange,
  onCurrencyChange,
  currencyOptions = [],
  selectCurrency = "USD",
  amountDisable = false,
  className = "",
}) {
  const handleIncrement = () => {
    if (!amountDisable) {
      const newAmount = parseFloat(amount || 0) + 1;
      onAmountChange && onAmountChange(newAmount.toString());
    }
  };

  const handleDecrement = () => {
    if (!amountDisable && parseFloat(amount || 0) > 0) {
      const newAmount = parseFloat(amount || 0) - 1;
      onAmountChange && onAmountChange(newAmount.toString());
    }
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownClick = () => {
    setIsDropdownOpen(true);
  };
  
  const handleSelectChange = (e) => {
    onCurrencyChange && onCurrencyChange(e.target.value);
    setIsDropdownOpen(false);
  };
  
  const handleSelectBlur = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div className="w-full mb-6 transition-all duration-300">
      <label className="text-blue-100 mb-2 font-medium inline-block text-sm md:text-base tracking-wide">{label}</label>
      
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <div className="relative flex-1 bg-white/10 rounded-xl overflow-hidden shadow-lg">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-300">
            <FiDollarSign />
          </div>
          <input
            type="number"
            placeholder="Amount"
            disabled={amountDisable}
            value={amount}
            onChange={(e) => onAmountChange && onAmountChange(e.target.value)}
            className={`w-full py-4 pl-10 pr-16 bg-transparent outline-none text-white text-lg placeholder-blue-300/60 focus:ring-2 focus:ring-blue-500/50 transition-all duration-200 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${className}`}
          />
          
          {!amountDisable && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col">
              <button 
                type="button"
                onClick={handleIncrement}
                className="bg-blue-600/40 hover:bg-blue-500/60 active:bg-blue-700/60 w-8 h-6 rounded-t-md flex items-center justify-center text-white transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-blue-400"
              >
                <FiChevronUp size={14} />
              </button>
              <button 
                type="button"
                onClick={handleDecrement}
                className="bg-blue-600/40 hover:bg-blue-500/60 active:bg-blue-700/60 w-8 h-6 rounded-b-md flex items-center justify-center text-white transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-blue-400"
              >
                <FiChevronDown size={14} />
              </button>
            </div>
          )}
        </div>
        
       <div 
         className={`relative min-w-[140px] sm:max-w-[180px] bg-white/10 rounded-xl overflow-hidden shadow-lg group ${isDropdownOpen ? 'ring-2 ring-blue-500/70' : ''}`}
         onClick={handleDropdownClick}
       >
          <select
            value={selectCurrency}
            onChange={handleSelectChange}
            onBlur={handleSelectBlur}
            className="w-full appearance-none py-4 px-4 pr-12 bg-transparent text-white font-medium cursor-pointer outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200"
          >
            {currencyOptions.map((currency) => (
              <option key={currency} value={currency} className="bg-gray-800">
                {currency.toUpperCase()}
              </option>
            ))}
          </select>
          <div className={`absolute right-3 top-1/2 -translate-y-1/2 text-blue-300 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}>
            <FiChevronDown />
          </div>
        </div>
      </div>
    </div>
  )
}

function CurrencyConverter() {
  const [isRotating, setIsRotating] = useState(false);
  
  const handleSwap = () => {

    setIsRotating(true);
    setTimeout(() => {
      setIsRotating(false);
    }, 500); 
  };
  
  return (
    <div className="converter-container">

      <button 
        onClick={handleSwap}
        className="swap-button bg-blue-600/40 hover:bg-blue-500/60 p-2 rounded-full mx-auto my-4 flex items-center justify-center transition-all duration-200"
      >
        <FiRefreshCw 
          size={24} 
          className={`text-white transition-transform duration-500 ${isRotating ? 'rotate-180' : ''}`} 
        />
      </button>
      
    </div>
  );
}

export { InputBox, CurrencyConverter }