import { useEffect, useState } from 'react';

const fetchJSON = async (url) => {
  const response = await fetch(url);

  return await response.json();
};

export const useFetchJSON = (url, defaultData) => {
  const [data, setData] = useState(defaultData);

  useEffect(() => {
    setData(fetchJSON(url));
  }, [url]);

  return data;
}
