import axios from "axios";
import { useState, useEffect } from "react";
import { ApiResponse, CardData } from "../types/type";

const useApiData = (url: string): CardData[] => {
  const [apiData, setApiData] = useState<CardData[]>([]);

  useEffect(() => {
    axios
      .get<ApiResponse>(url)
      .then((response) => {
        const modifiedData = response.data.data.map((item) => {
          return {
            rank: item.rank,
            imageUrl: item.images.jpg.image_url,
            title: item.title_english ?? item.title,
            releaseDate: item.aired.from,
            lastest: item.airing || !item.aired?.to ? "now" : item.aired?.to,
            rating: item.rating,
          };
        });
        setApiData(modifiedData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [url]);

  return apiData;
};

export default useApiData;
