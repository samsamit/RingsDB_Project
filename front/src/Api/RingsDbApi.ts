import axios from "axios";

// Creates axios instance for all api calls to rings db
const baseApi = axios.create({
    baseURL: " https://ringsdb.com/api",
  });

  export const RingsDBUrl = "https://ringsdb.com/"
export const getDeckList = (deckId: number): Promise<any> => {
    return baseApi.get(`/public/decklist/${deckId}.json`)
}

export const getHero = (heroCode: number): Promise<any> => {
  return baseApi.get(`/public/card/${heroCode}.json`)
}