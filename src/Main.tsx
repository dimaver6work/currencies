import { DefaultCurrencies } from 'interfaces';

const defaultCurrencies: DefaultCurrencies[] = [
  'UAH',
  'USD',
  'EUR',
  'CNY',
  'SEK',
  'BTC',
];

interface MainProps {
  value: number|string;
  currency: DefaultCurrencies;
  onChangeValue: (value: number) => void;
  onChangeCurrency: (currency: DefaultCurrencies) => void;
}

export const Main: React.FC<MainProps> = ({
  value,
  currency,
  onChangeValue,
  onChangeCurrency,
}) => (
  <div className="block">
    <ul className="currencies">
      {defaultCurrencies.map(cur => (
        <li
          onClick={() => onChangeCurrency(cur)}
          className={currency === cur ? 'active' : ''}
          key={cur}
        >
          {cur}
        </li>
      ))}
    </ul>
    <input
      onChange={e => onChangeValue(parseFloat(e.target.value))}
      value={value}
      type="number"
      
    />
  </div>
);
