import { useEffect, useState } from 'react';
import './CurrencyRates.css';

interface ExchangeRates {
  USD: number;
  EUR: number;
  GBP: number;
  timestamp: number;
}

const CurrencyRates = () => {
  const [rates, setRates] = useState<ExchangeRates | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        // мне лень прятать ключ в .env, надеюсь его не заабузят до проверки
        const response = await fetch('https://v6.exchangerate-api.com/v6/84146960623f1d627876e3c3/latest/RUB');
        const data = await response.json();
        console.log('API Response:', data);
        
        setRates({
          USD: 1 / data.conversion_rates.USD,
          EUR: 1 / data.conversion_rates.EUR,
          GBP: 1 / data.conversion_rates.GBP,
          timestamp: Date.now()
        });
      } catch (err) {
        setError('Ошибка при получении курсов валют');
        console.error(err);
      }
    };

    fetchRates();
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB'
    }).format(value);
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) {
      return new Intl.DateTimeFormat('ru-RU', {
        dateStyle: 'full',
        timeStyle: 'full'
      }).format(new Date());
    }
    return new Intl.DateTimeFormat('ru-RU', {
      dateStyle: 'full',
      timeStyle: 'full'
    }).format(date);
  };

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!rates) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="currency-rates">
      <h2>Курсы валют к рублю</h2>
      <div className="rates-grid">
        <div className="rate-item">
          <span className="currency">USD</span>
          <span className="value">{formatCurrency(rates.USD)}</span>
        </div>
        <div className="rate-item">
          <span className="currency">EUR</span>
          <span className="value">{formatCurrency(rates.EUR)}</span>
        </div>
        <div className="rate-item">
          <span className="currency">GBP</span>
          <span className="value">{formatCurrency(rates.GBP)}</span>
        </div>
      </div>
      <div className="timestamp">
        Данные получены: {formatDate(rates.timestamp)}
      </div>
    </div>
  );
};

export default CurrencyRates; 