import { useState, useEffect } from "react";
import _ from "lodash";
import moment from "moment";
import { AreaChart, XAxis, YAxis, Area, Tooltip } from "recharts";

import { CardData, ChartData, ChartProps } from "../types/type";

const Chart: React.FC<ChartProps> = ({ data }) => {
  const [chartWidth, setChartWidth] = useState(window.innerWidth * 0.8);

  useEffect(() => {
    const handleResize = () => {
      setChartWidth(window.innerWidth * 0.8);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const groupedData: ChartData[] = _.map(
    _.groupBy(data, (item: CardData) => moment(item.releaseDate).year()),
    (anime: CardData[], year: string) => {
      return {
        year: parseInt(year),
        anime: _.map(anime, "title").slice(0, 20),
        numberOfAnime: anime.length,
      };
    }
  );

  const sortedData = _.sortBy(groupedData, "year");

  return (
    <AreaChart data={sortedData} width={chartWidth} height={300}>
      <defs>
        <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.8} />
        </linearGradient>
      </defs>
      <XAxis dataKey="year" />
      <YAxis dataKey="numberOfAnime" />
      <Area
        type="monotone"
        dataKey="numberOfAnime"
        fillOpacity={1}
        fill="url(#gradient)"
      />

      <Tooltip
        active={true}
        wrapperStyle={{
          backgroundColor: "white",
          borderRadius: "10px",
          border: "1px solid red",
          padding: "10px",
        }}
        content={({ payload }) => {
          if (payload && payload.length > 0) {
            const year = payload[0].payload.year;
            const anime = payload[0].payload.anime;
            return (
              <div>
                <p style={{ textAlign: "center", marginBottom: "10px" }}>
                  <b>{year}</b>
                </p>
                <p style={{ textAlign: "center" }}>
                  {anime.map((val: string, index: number) => (
                    <span key={index}>
                      {val}
                      <br />
                    </span>
                  ))}
                </p>
              </div>
            );
          }
          return null;
        }}
      />
    </AreaChart>
  );
};

export default Chart;
