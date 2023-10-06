import axios, { AxiosError } from "axios";
const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:3005/api/portal-laporan"
    : "http://192.168.10.19:3005/api/portal-laporan";

function axiosErrorHandler(error) {
  let message = "";
  if (error instanceof AxiosError) {
    message = error.response?.data.error;
    console.log(message);
  }
  return message;
}

export const getStocks = async ({ limit = 100 } = {}) => {
  try {
    const { data } = await axios.get(`${BASE_URL}?limit=${limit}`);
    return data;
  } catch (error) {
    axiosErrorHandler(error);
    return [];
  }
};

export const findStocks = async ({ keyword = null, limit = 100 } = {}) => {
  try {
    const { data } = await axios.post(BASE_URL, { keyword, limit });
    return data;
  } catch (error) {
    axiosErrorHandler(error);
    return [];
  }
};
