import axios from "axios";

// Creates axios instance for all api calls to rings db
const baseApi = axios.create({
    baseURL: " https://ringsdb.com/api" 
  });

export const getDeckList = (deckId: number): Promise<any> => {
    return baseApi.get(`/oauth2/deck/load/${deckId}`)
}

