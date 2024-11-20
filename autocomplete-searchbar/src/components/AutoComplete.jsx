import React, { useState, useEffect, useRef } from "react";

const STATE = {
  LOADING: "LOADING",
  ERROR: "ERROR",
  SUCCESS: "SUCCESS",
};

const AutoComplete = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [result, setResult] = useState([]);
  const [status, setStatus] = useState(STATE.LOADING);

  const cache = useRef({});
  console.log("cache", cache);
  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;
    const fetchData = async () => {
      //   if (!searchTerm) return;

      try {
        setStatus(STATE.LOADING);
        if (cache.current[searchTerm]) {
          console.log("received from cache");
          setResult(cache.current[searchTerm]);
          setStatus(STATE.SUCCESS);
          return;
        }
        console.log(" Received from api call");
        const response = await fetch(
          `https://dummyjson.com/products/search?q=${searchTerm}&limit=10`,
          { signal }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        cache.current[searchTerm] = data.products;
        setResult(data.products || []);

        setStatus(STATE.SUCCESS);
        console.log("final", data);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          console.error("Error fetching data:", error);
          setStatus(STATE.ERROR);
        }
      }
    };
    // fetchData();
    const debounceFetch = setTimeout(fetchData, 1000);
    return () => {
      clearTimeout(debounceFetch);
      abortController.abort();
    };
  }, [searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  return (
    <div>
      <input type="text" value={searchTerm} onChange={handleSearch} />
      {status === STATE.LOADING && <div>...Loading</div>}
      {status === STATE.ERROR && <div>Error occured</div>}
      {status === STATE.SUCCESS && (
        <ul>
          {result.map((item, index) => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutoComplete;
