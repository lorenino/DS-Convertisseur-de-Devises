import { useState } from 'react'
import './App.css'

function App() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('EUR');
  const [toCurrency, setToCurrency] = useState('USD');
  const [convertedAmount, setConvertedAmount] = useState(null);

  // Taux de change fixes
  const exchangeRates = {
    EUR: {
      USD: 1.09,
      GBP: 0.85,
      JPY: 164.42,
      CAD: 1.47
    },
    USD: {
      EUR: 0.92,
      GBP: 0.78,
      JPY: 151.12,
      CAD: 1.35
    },
    GBP: {
      EUR: 1.18,
      USD: 1.28,
      JPY: 193.85,
      CAD: 1.73
    },
    JPY: {
      EUR: 0.0061,
      USD: 0.0066,
      GBP: 0.0052,
      CAD: 0.0089
    },
    CAD: {
      EUR: 0.68,
      USD: 0.74,
      GBP: 0.58,
      JPY: 112.12
    }
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleFromCurrencyChange = (e) => {
    setFromCurrency(e.target.value);
  };

  const handleToCurrencyChange = (e) => {
    setToCurrency(e.target.value);
  };

  const handleConversion = () => {
    if (fromCurrency === toCurrency) {
      setConvertedAmount(amount);
      return;
    }

    const rate = exchangeRates[fromCurrency][toCurrency];
    const result = amount * rate;
    setConvertedAmount(result.toFixed(2));
  };

  // Fonction pour inverser les devises
  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="converter-container">
      <h1>Convertisseur de Devises</h1>

      <div className="input-group">
        <label htmlFor="amount">Montant</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={handleAmountChange}
          min="0"
          step="0.01"
        />
      </div>

      <div className="currency-selectors">
        <div className="input-group">
          <label htmlFor="fromCurrency">De</label>
          <select
            id="fromCurrency"
            value={fromCurrency}
            onChange={handleFromCurrencyChange}
          >
            <option value="EUR">Euro (EUR)</option>
            <option value="USD">Dollar US (USD)</option>
            <option value="GBP">Livre Sterling (GBP)</option>
            <option value="JPY">Yen Japonais (JPY)</option>
            <option value="CAD">Dollar Canadien (CAD)</option>
          </select>
        </div>

        <button className="swap-button" onClick={handleSwapCurrencies}>
          ⇄
        </button>

        <div className="input-group">
          <label htmlFor="toCurrency">Vers</label>
          <select
            id="toCurrency"
            value={toCurrency}
            onChange={handleToCurrencyChange}
          >
            <option value="EUR">Euro (EUR)</option>
            <option value="USD">Dollar US (USD)</option>
            <option value="GBP">Livre Sterling (GBP)</option>
            <option value="JPY">Yen Japonais (JPY)</option>
            <option value="CAD">Dollar Canadien (CAD)</option>
          </select>
        </div>
      </div>

      <button
        className="convert-button"
        onClick={handleConversion}
      >
        Convertir
      </button>

      {convertedAmount !== null && (
        <div className="result">
          <p>
            {amount} {fromCurrency} = {convertedAmount} {toCurrency}
          </p>
        </div>
      )}
    </div>
  );
}

export default App
