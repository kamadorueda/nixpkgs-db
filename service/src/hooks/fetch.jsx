import { useEffect, useState } from 'react';

export const useFetchJSON = (url, defaultData) => {
  const [data, setData] = useState(defaultData);

  const getAnswer = async () => {
    const res = await fetch(url);
    setData(await res.json());
  };

  useEffect(() => {
    getAnswer();
  }, []);

  return data;
}
