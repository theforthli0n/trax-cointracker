import React, { useState, useEffect } from "react";
import axios from "axios";
import Coin from "./Coin";
import { ReactComponent as Moon } from "../styles/images/moon.svg";
import { ReactComponent as Sun } from "../styles/images/sun.svg";

export default function Tracker() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [mode, setMode] = useState(false);

  //   grab api
  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100loc&page=1&sparkline=false"
      )
      .then((res) => {
        setCoins(res.data);
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  //   filter through content with search bar
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  function Mode() {
    const header = document.querySelectorAll("h1");
    const para = document.querySelectorAll("p");
    const coinRow = document.querySelectorAll(".coin-row");

    if (mode === false) {
      setMode(true);
      document.querySelector("body").style.backgroundColor =
        "rgb(228, 227, 222)";
      //   document.querySelector("h1").style.color = "black";

      for (let i = 0; i < header.length; i++) {
        header[i].style.color = "rgb(44, 50, 59)";
      }
      for (let i = 0; i < para.length; i++) {
        para[i].style.color = "rgb(44, 50, 59)";
      }
      for (let i = 0; i < coinRow.length; i++) {
        coinRow[i].style.borderColor = "rgb(44, 50, 59)";
      }
    } else {
      setMode(false);
      document.querySelector("body").style.backgroundColor = "rgb(44, 50, 59)";
      for (let i = 0; i < header.length; i++) {
        header[i].style.color = "rgb(228, 227, 222)";
      }
      for (let i = 0; i < para.length; i++) {
        para[i].style.color = "rgb(228, 227, 222)";
      }
      for (let i = 0; i < coinRow.length; i++) {
        coinRow[i].style.borderColor = "rgb(228, 227, 222)";
      }
    }
  }
  return (
    <div className="Tracker">
      {mode === true ? <Moon onClick={Mode} /> : <Sun onClick={Mode} />}
      <h1 className="header">Trax Crypto Tracker</h1>
      <input
        type="text"
        placeholder="Search"
        className="coin-input"
        onChange={handleChange}
      />

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
            ath={coin.ath}
          />
        );
      })}
    </div>
  );
}
