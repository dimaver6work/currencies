import { Main } from './Main';
import { Navbar } from './Navbar';
import './index.scss';
import { useState } from 'react';
import { Slide, toast, ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { DefaultCurrencies, Exchange, Store } from 'interfaces';
import { useRateApi } from 'hooks/useRateApi';

export const App = () => {
  const rates = useSelector((state: Store) => state.rate.data?.rates);
  const [exchange, setExchange] = useState<Exchange>({
    fromCurrency: 'UAH',
    toCurrency: 'USD',
    fromPrice: 0,
    toPrice: 1
  });

  useRateApi();

  const onChangeFromPrice = (
    value: number,
    currency?: DefaultCurrencies
  ): void => {
    if (rates) {
      const fromCurrency = rates[currency || exchange.fromCurrency];
      const toCurrency = rates[exchange.toCurrency];
      const price = value / fromCurrency;
      const result = price * toCurrency;
      setExchange({
        ...exchange,
        fromCurrency: currency || exchange.fromCurrency,
        fromPrice: value,
        toPrice: +result.toFixed(3),
      });
      return;
    }
    toast.error('REQUEST FAILED. RELOAD PAGE');
  };
  const onChangeToPrice = (value: number, currency?: DefaultCurrencies) => {
    if (rates) {
      const toCurrency = rates[currency || exchange.toCurrency];
      const result = (rates[exchange.fromCurrency] / toCurrency) * value;
      setExchange({
        ...exchange,
        toCurrency: currency || exchange.toCurrency,
        fromPrice: +result.toFixed(3),
        toPrice: value,
      });
      return;
    }
    toast.error('REQUEST FAILED. RELOAD PAGE');
  };

  return (
    <>
      <ToastContainer
        position={toast.POSITION.BOTTOM_CENTER}
        transition={Slide}
        closeOnClick
        closeButton={false}
        limit={4}
        autoClose={3000}
      />
      <div className="main">
        {rates?.UAH && <Navbar rates={rates} />}
        <div className="App">
          <Main
            value={exchange.fromPrice}
            currency={exchange.fromCurrency}
            onChangeCurrency={fromCurrency => {
              onChangeFromPrice(exchange.fromPrice, fromCurrency);
            }}
            onChangeValue={onChangeFromPrice}
          />
          <Main
            value={exchange.toPrice}
            currency={exchange.toCurrency}
            onChangeCurrency={toCurrency => {
              onChangeToPrice(exchange.toPrice, toCurrency);
            }}
            onChangeValue={onChangeToPrice}
          />
        </div>
      </div>
    </>
  );
};
