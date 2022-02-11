import axios from "axios";

export const baseUrl = "https://bayut.p.rapidapi.com";

export const fetchApi = async (url) => {
  const { data } = await axios.get(url, {
    headers: {
      "x-rapidapi-host": "bayut.p.rapidapi.com",
      "x-rapidapi-key": "2fae0c61e0msh177f40ed189e0b3p1eb641jsn0a9b0992a541",
    },
  });

  return data;
};
