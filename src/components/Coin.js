export default function Coin({
  name,
  image,
  symbol,
  price,
  volume,
  priceChange,
  marketcap,
  marketcapRank,
}) {
  return (
    <div className="Coin">
      <div className="coin-row">
        <div className="coin-display">
          <p className="mcap-rank">{marketcapRank}</p>
          <img className="coin-pic" alt="coin-pic" src={image} />
          <h1>{name}</h1>

          <p className="coin-symbol">{symbol}</p>
        </div>
        <div className="coin-data">
          <p className="coin-price">${price}</p>
          <p className="coin-volume">Total Volume: {volume.toLocaleString()}</p>
          {priceChange < 0 ? (
            <p className="coin-percentage red">{priceChange.toFixed(2)}%</p>
          ) : (
            <p className="coin-percentage green">{priceChange.toFixed(2)}%</p>
          )}
          <p className="coin-marketcap">
            Mkt Cap: ${marketcap.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
