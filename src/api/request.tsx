import { useState, useEffect } from "react";

export const useRequest = <T extends {}>(request: () => Promise<T>) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState<T>();

  useEffect(() => setIsLoading(true), []);

  useEffect(() => {
    if (isLoading) {
      const fetchData = async () => {
        try {
          setData((await request()) as T);
        } catch {
          setIsError(true);
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    }
  }, [isLoading, request]);

  return { isLoading, isError, data, refetch: () => setIsLoading(true) };
};
