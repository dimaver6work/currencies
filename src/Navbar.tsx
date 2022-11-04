interface NavbarProps {
  rates: any;
}

export const Navbar: React.FC<NavbarProps> = ({ rates }) => (
  <div className="navbar">
    <p>1 USD = {rates.UAH.toFixed(2)} UAH </p>
    <p>1 EUR = {rates.UAH.toFixed(2)} UAH </p>
    <p>1 BTC = {Math.round(1 / rates.BTC)} USD</p>
  </div>
);
