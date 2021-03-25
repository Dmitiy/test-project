import axios from "axios";

export const getDataFromApi = async (page = 1) => {
  const url = "http://95.216.159.188:7003/api/illustration";

  const config = {
    params: {
      count: 10,
      page,
    },
  };

  return await axios
    .get(url, config)
    .then((res) => {
      if (res) {
        const illustrationData = res.data.result.illustrationData;
        return {
          list: illustrationData,
          hasMore: illustrationData.length === config.params.count,
        };
      }
    })
    .catch((err) => console.error(err));
};
