import { useEffect, useState } from "react";

function LeftMenu({text}) {
  return (
    <span
    style={{
      width: "100px",
      display: "inline-block",
    }}
    > { text }
    </span>
  )
}
function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [exchaningAmount, setAmount] = useState(0);
  const [coinPrice, selectCoin] = useState(0);
  const selectedCoin = (event) => selectCoin(event.target.value);
  const inputAmount = (event) => setAmount(event.target.value);

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length} coins listed)`}</h1>
      <LeftMenu text="Amounts($) : " />
      <input type="number" value={exchaningAmount} onChange={inputAmount} />
      <p></p>
      <LeftMenu text="Coin : " />
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <select onChange={selectedCoin}>
          <option>Select coin</option>
          {coins.map((coin) => (
            <option value={coin.quotes.USD.price}>
              {coin.name} ({coin.symbol}) : {coin.quotes.USD.price} USD
            </option>
          ))}
        </select>
      )}
      {(exchaningAmount === 0 || coinPrice === 0) ? (
        <p>Input the amounts($) you want to exchange</p>
      ) : (
        <p>Exchanged amounts : {(exchaningAmount / coinPrice).toFixed(2)}</p>
      )}
    </div>
  );
}
export default App;
