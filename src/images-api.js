import axios from 'axios';

axios.defaults.baseURL = "https://api.unsplash.com/";

export const getImages = async (topic, currentPage) => {
  const response = await axios.get(
    "/search/photos?client_id=yD0L5Cqynfmn627UPGR5HTIwjtjzlc8C8OpnfIo_5bE",
    {
      params: {
        query: topic,
        page: currentPage,
        per_page: 12,
      },
    }
  );

  return response.data.results;
};