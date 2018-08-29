import React from 'react';

class ExchangeRatesReferenceControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      baseCurrency: props.defaultCurrency || 'EUR',
      referenceDate: props.defaultDate
    };
    this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onReferenceChange(this.state.baseCurrency, this.state.referenceDate);
  }

  handleCurrencyChange(event) {
    this.setState({baseCurrency: event.target.value});
  }

  handleDateChange(event) {
    this.setState({referenceDate: event.target.value});
  }

  renderCurrencySelection() {
    const referenceCurrencies = this.props.referenceCurrencies || ['EUR', 'USD'];
    const currencyOptions = referenceCurrencies.map((option) => {
      return <option key={option} value={option}>{option}</option>;
    });
    return (
      <select
        id="Base-Currency"
        value={this.state.baseCurrency}
        onChange={this.handleCurrencyChange}>
        {currencyOptions}
      </select>
    );
  }

  renderDateSelection() {
    return (
      <input
        id="Reference-Date"
        value={this.state.referenceDate}
        type="date"
        onChange={this.handleDateChange}
        required pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
        min={this.props.minReferenceDate}
        max={this.props.maxReferenceDate}
      />
    );
  }

  render() {
    return (
      <div className="Exchange-Rates-Control">
        <form onSubmit={this.handleSubmit}>
          <p>
            <label htmlFor="Base-Currency">Currency:</label>
            {this.renderCurrencySelection()}
          </p>
          <p>
            <label htmlFor="Reference-Date">Date:</label>
            {this.renderDateSelection()}
          </p>
          <input type="submit" value="Display" className="btn"/>
        </form>
      </div>
    );
  }
}

export default ExchangeRatesReferenceControl;
