import moment from "moment";
import { useState } from "react";
import { CardData } from "../types/type";
import "../styles/Card.css";

const ListCard: React.FC<CardData> = ({
  rank,
  imageUrl,
  title,
  rating,
  releaseDate,
  lastest,
}) => {
  const [expanded, setExpanded] = useState(false);

  const generateDate = (date: string | undefined | null) => {
    if (date === "now") return <>now</>;
    if (!date) return <>now</>;

    return (
      <>
        {moment(date).format("ddd")} {moment(date).format("MMM")}{" "}
        {moment(date).get("date")} {moment(date).get("year")}
      </>
    );
  };

  return (
    <div
      key={rank}
      className={`card ${expanded ? "expanded" : ""}`}
      onMouseDown={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      onMouseUp={() => setExpanded(false)}
    >
      <div className="card-cover">
        <img src={imageUrl} alt="Cover" className="card-cover-img" />
        <div className="rank-div">{rank}</div>
      </div>
      <div className="ellipsis-div">{title}</div>
      {expanded && (
        <div className={`card-expanded-info`}>
          <p>
            <span className="heading">Release Date:</span>{" "}
            {generateDate(releaseDate)}
          </p>
          <p>
            <span className="heading">Latest Date:</span>{" "}
            {generateDate(lastest)}
          </p>
          <p>
            <span className="heading">Rated:</span> {rating}
          </p>
        </div>
      )}
    </div>
  );
};

export default ListCard;
