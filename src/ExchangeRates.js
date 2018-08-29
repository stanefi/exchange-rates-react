import React from 'react';
import './ExchangeRates.css';
import ExchangeRatesReferenceControl from './ExchangeRatesReferenceControl';
import ExchangeRatesTable from './ExchangeRatesTable';

const BASE_CURRENCIES = ['EUR', 'USD', 'GBP', 'AUD', 'CAD', 'JPY'].sort();
const EXCHANGE_API = 'https://api.exchangeratesapi.io/';
const MARKET_RATE_DIFFERENCE = 5 / 100;

function currentDateISOString() {
  return new Date().toISOString().split('T')[0];
}

class ExchangeRates extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      baseCurrency: 'EUR',
      referenceDate: currentDateISOString(),
      exchangeRates: {}
    };
    this.handleReferenceChange = this.handleReferenceChange.bind(this);
  }

  fetchExchangeRates(baseCurrency, referenceDate) {
    fetch(EXCHANGE_API + `${referenceDate}?base=${baseCurrency}`)
      .then(response => response.json())
      .then(data => {
        this.setState({exchangeRates: data.rates || {}})
      })
      .catch(error => console.error('[ERROR] ', error));
  }

  componentDidMount() {
    this.fetchExchangeRates(this.state.baseCurrency, this.state.referenceDate);
  }

  handleReferenceChange(baseCurrency, referenceDate) {
    this.setState({baseCurrency: baseCurrency, referenceDate: referenceDate});
    this.fetchExchangeRates(baseCurrency, referenceDate);
  }

  generateExchangeRatesData() {
    const exchangeRates = this.state.exchangeRates;
    return Object.keys(exchangeRates).map((currency) => {
      const rate = exchangeRates[currency];
      const marketDifference = rate * MARKET_RATE_DIFFERENCE;
      return {
        currency: currency,
        buyRate: rate - marketDifference,
        sellRate: rate + marketDifference,
        highlighted: BASE_CURRENCIES.includes(currency)
      }
    });
  }

  render() {
    return (
      <div className="Exchange-Rates">
        <h1>Exchange Rates</h1>
        <div className="container">
          <ExchangeRatesReferenceControl
            referenceCurrencies={BASE_CURRENCIES}
            defaultCurrency={this.state.baseCurrency}
            defaultDate={this.state.referenceDate}
            minReferenceDate="1999-01-01"
            maxReferenceDate={currentDateISOString()}
            onReferenceChange={this.handleReferenceChange}
          />
          <ExchangeRatesTable exchangeRatesData={this.generateExchangeRatesData()}/>
        </div>
      </div>
    );
  }
}

export default ExchangeRates;
