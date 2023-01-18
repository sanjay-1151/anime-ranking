import useApiData from "./hooks/useApiData";
import ListCard from "./components/ListCard";
import Chart from "./components/Chart";
import loader from "../src/assets/naruto-eating-ramen.gif";

const App = () => {
  const cardData = useApiData("https://api.jikan.moe/v4/top/anime?limit=20");

  if (cardData.length == 0)
    return (
      <div className="loader">
        <img src={loader} alt="loading" className="loading-img" />
      </div>
    );

  return (
    <div className="page">
      <div className="card-grid">
        {cardData.map((card, index) => (
          <ListCard
            key={index}
            rank={card.rank}
            imageUrl={card.imageUrl}
            title={card.title}
            releaseDate={card.releaseDate}
            lastest={card.lastest}
            rating={card.rating}
          />
        ))}
      </div>

      <div className="charts">
        <Chart data={cardData} />
      </div>
    </div>
  );
};

export default App;
