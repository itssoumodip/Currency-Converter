import React from 'react'
import { FiChevronDown } from 'react-icons/fi'
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
  return (
    <div className="flex flex-col">
      <label className="text-blue-200 mb-2 font-medium">{label}</label>
      <div className="flex bg-white/20 p-3 rounded-lg border border-white/30">
        <input
          type="number"
          placeholder="Amount"
          disabled={amountDisable}
          value={amount}
          onChange={(e) => onAmountChange && onAmountChange(e.target.value)}
          className={`w-full bg-transparent outline-none text-white text-lg ${className}`}
        />
        <div className="relative">
          <select
            value={selectCurrency}
            onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
            className="rounded-lg px-2 py-1 bg-blue-600 text-white cursor-pointer outline-none appearance-none pl-4 pr-8"
          >
            {currencyOptions.map((currency) => (
              <option key={currency} value={currency} className="bg-gray-800">
                {currency.toUpperCase()}
              </option>
            ))}
          </select>
          <FiChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white pointer-events-none" />
        </div>
      </div>
    </div>
  )
}

export default InputBox