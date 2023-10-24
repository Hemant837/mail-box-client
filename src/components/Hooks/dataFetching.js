// (custom hook)

import { useEffect } from "react";
import axios from "axios";

function useDataFetching(url, dataKey, dispatch) {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);

        // Safely access the property
        const data = Object.keys(response.data || {}).map((key) => ({
          firebaseId: key,
          ...response.data[key],
        }));
        dispatch(dataKey(data));
      } catch (error) {
        console.log(error);
      }
    };

    // Initial fetch
    fetchData();

    // Set up an interval to fetch data every 2 seconds
    const intervalId = setInterval(fetchData, 2000);

    // Clean up the interval on unmount
    return () => clearInterval(intervalId);
  }, [url, dispatch, dataKey]);
}

export default useDataFetching;
