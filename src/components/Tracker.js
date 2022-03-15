import React, { useState, useEffect } from "react";
import axios from "axios";
import Coin from "./Coin";

export default function Tracker() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");

  //   grab api
  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((res) => {
        setCoins(res.data);
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="Tracker">
      <div className="search-coin">
        <h1 className="search-label">Search a currency</h1>
        <input
          type="text"
          placeholder="Search"
          className="coin-input"
          onChange={handleChange}
        />
      </div>
      {filteredCoins.map((coin) => {
        return (
          <Coin
            key={coin.id}
            name={coin.name}
            image={coin.image}
            symbol={coin.symbol}
            volume={coin.total_volume}
            price={coin.current_price}
            priceChange={coin.price_change_percentage_24h}
            marketcap={coin.market_cap}
            marketcapRank={coin.market_cap_rank}
          />
        );
      })}
    </div>
  );
}
