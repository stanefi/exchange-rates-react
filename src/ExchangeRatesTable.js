import React from 'react';

class ExchangeRatesTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ascending: true
    };
    this.handleSort = this.handleSort.bind(this);
  }

  sortedExchangeRateData() {
    const exchangeRateData = this.props.exchangeRatesData || {};
    return exchangeRateData.sort((a, b) => {
      if (this.state.ascending) {
        return a.currency.localeCompare(b.currency);
      }
      else {
        return b.currency.localeCompare(a.currency);
      }
    });
  }

  handleSort() {
    this.setState({ascending: !this.state.ascending});
  }

  render() {
    const exchangeRateCells = this.sortedExchangeRateData().map(rateData => {
      return <ExchangeRatesTableRow key={rateData.currency} exchangeRateData={rateData}/>;
    });
    const sortClassName = this.state.ascending ? 'sort-asc' : 'sort-dsc';
    return (
      <table className="Exchange-Rates-Table">
        <thead>
        <tr>
          <th onClick={this.handleSort} className={sortClassName}>Currency</th>
          <th>Buy</th>
          <th>Sell</th>
        </tr>
        </thead>
        <tbody>{exchangeRateCells}</tbody>
      </table>
    );
  }
}

function ExchangeRatesTableRow(props) {
  const {currency, buyRate, sellRate, highlighted} = props.exchangeRateData;
  const rowContent = (
    <React.Fragment>
      <td>{currency}</td>
      <td>{buyRate.toFixed(4)}</td>
      <td>{sellRate.toFixed(4)}</td>
    </React.Fragment>
  );
  if (highlighted) {
    return <tr className="highlighted">{rowContent}</tr>
  }
  else {
    return <tr>{rowContent}</tr>
  }
}

export default ExchangeRatesTable;
