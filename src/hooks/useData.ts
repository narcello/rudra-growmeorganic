import { useState } from "react";

const BASE_API_URL = "https://api.artic.edu/api/v1/artworks";

interface IGetData {
  page?: number;
}

function useData() {
  const [pagination, setPagination] = useState({});
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function getData(props?: IGetData) {
    const page = props?.page || 1;
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_API_URL}?page=${page}`);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      setData(json.data);
      setPagination(json.pagination);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return { data, pagination, getData, isLoading };
}

export default useData;
