import { useState } from 'react'
import { InputBox } from './components'
import useCurrencyInfo from './hooks/useCurrencyInfo'
import { FiRepeat, FiArrowRight } from 'react-icons/fi' 

function App() {
  const [amount, setAmount] = useState('')
  const [convertedAmount, setConvertedAmount] = useState('') 
  const [fromCurrency, setFromCurrency] = useState('USD')
  const [toCurrency, setToCurrency] = useState('INR')
  const [isLoading, setIsLoading] = useState(false)

  const handleFromCurrencyChange = (currency) => {
    setFromCurrency(currency)
  }

  const handleToCurrencyChange = (currency) => {
    setToCurrency(currency)
  }

  const currencyInfo = useCurrencyInfo(fromCurrency)
  const options = Object.keys(currencyInfo)
  
  const exchangeRate = currencyInfo[toCurrency] || 0

  const swap = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
    setConvertedAmount(amount)
    setAmount(convertedAmount)
  }

  const convert = () => {
    if (!amount) return;
    
    setIsLoading(true)
    setTimeout(() => {
      setConvertedAmount(parseFloat(amount) * exchangeRate || 0)
      setIsLoading(false)
    }, 600) 
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-900 to-blue-900 flex flex-wrap justify-center items-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">Currency Converter</h1>
          <p className="text-blue-200">Convert between currencies with real-time exchange rates</p>
        </div>
        
        <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl p-6 shadow-2xl">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            <div className="w-full mb-4">
              <InputBox
                label="From"
                amount={amount}
                currencyOptions={options}
                onCurrencyChange={handleFromCurrencyChange}
                selectCurrency={fromCurrency}
                onAmountChange={(amount) => setAmount(amount)}
                className="bg-white/10 border-white/20 text-white placeholder-gray-300 focus:border-blue-400"
              />
            </div>
            
            <div className="relative w-full h-0.5 my-6 bg-white/10">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 text-white border-2 border-white/30 transition-all duration-300 shadow-lg"
                onClick={swap}
              >
                <FiRepeat size={18} />
              </button>
            </div>
            
            <div className="w-full mb-6">
              <InputBox
                label="To"
                amount={convertedAmount}
                currencyOptions={options}
                onCurrencyChange={handleToCurrencyChange}
                selectCurrency={toCurrency}
                amountDisable={true}
                className="bg-white/10 border-white/20 text-white placeholder-gray-300"
              />
            </div>
            
            {exchangeRate > 0 && (
              <div className="text-center mb-4 text-sm text-blue-200">
                <p>1 {fromCurrency.toUpperCase()} = {exchangeRate.toFixed(4)} {toCurrency.toUpperCase()}</p>
              </div>
            )}
            
            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-3.5 rounded-lg font-medium flex items-center justify-center transition-all duration-300"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="h-5 w-5 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></div>
                  Converting...
                </div>
              ) : (
                <div className="flex items-center">
                  <span>Convert {fromCurrency.toUpperCase()} to {toCurrency.toUpperCase()}</span>
                  <FiArrowRight className="ml-2" />
                </div>
              )}
            </button>
          </form>
        </div>
        
        <div className="text-center mt-4 text-blue-200 text-xs">
          <p>Exchange rates are updated in real-time</p>
        </div>
      </div>
    </div>
  );
}

export default App
