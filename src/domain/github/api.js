import axios from "axios";

const DEFAULT_API_CONFIG = {
  baseURL: "https://api.github.com",
  timeout: 7000
};

export const getRepositoryFactory = optionConfig => {
  const config = {
    ...DEFAULT_API_CONFIG,
    ...optionConfig
  };

  const instance = axios.create(config);

  const getRepository = async params => {
    try {
      const res = await instance.get("/search/repositories", {
        params
      });
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  return getRepository;
};
