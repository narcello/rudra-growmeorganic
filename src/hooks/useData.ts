import { useState } from "react";
import { PaginationType } from "../types";

const BASE_API_URL = "https://api.artic.edu/api/v1/artworks";

interface IGetData {
  page?: number;
}

const initialPaginationValue: PaginationType = {
  current_page: 0,
  limit: 0,
  next_url: "",
  offset: 0,
  total: 0,
  total_pages: 0,
};

function useData() {
  const [pagination, setPagination] = useState<PaginationType>(
    initialPaginationValue
  );
  const [data, setData] = useState<{ [key: string]: any }>({});
  const [isLoading, setIsLoading] = useState(false);

  async function getData(props?: IGetData) {
    const page = props?.page || 1;
    if (!data[page]) return fetchNewPage(page);
    setPagination({
      current_page: page,
      limit: pagination.limit,
      next_url: `${BASE_API_URL}?page=${page + 1}`,
      offset: (page - 1) * pagination.limit,
      total: pagination.total,
      total_pages: pagination.total_pages,
    });
  }

  const fetchNewPage = async (page: number) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_API_URL}?page=${page}`);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const record = await response.json();
      setData({
        ...data,
        [page]: record.data,
      });
      setPagination(record.pagination);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    data: data[pagination.current_page],
    pagination,
    getData,
    isLoading,
  };
}

export default useData;
