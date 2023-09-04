import React, { useEffect, useState } from "react";

const Codenotes = () => {
  const [results, setResults] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        if (
          global.values &&
          global.values.code &&
          global.years &&
          !global.isCodeClicked
        ) {
          const response = await fetch(
            `/codes/${global.values.code}/details/?version=${global.years}`
          );
          if (response.ok) {
            const data = await response.json();
            setResults(data);
          } else {
            console.error("Failed to fetch data");
            setResults(null);
          }
        }
      } catch (error) {
        console.error("Error:", error);
        setResults(null);
      }
    };
    fetchBooks();
  }, [global.values]);

  useEffect(() => {
    if (global.isCodeClicked) {
      setResults(global.selectedCodeDetails);
    } else {
      setResults(null);
    }
  }, [global.selectedCodeDetails]);

  console.log("our result is", results);

  return (
    <div
      style={{
        height: "60vh",
        width: "44vw",
        marginLeft: "13px",
        fontFamily: "Verdana",
        fontSize: "13px",
      }}
    >
      {results ? (
        results.chapter && results.chapter.description ? (
          <div key={results.code}>
            <div style={{ marginLeft: "17px" }}>
              {results.chapter.description}
            </div>
          </div>
        ) : (
          <div
            style={{
              marginLeft: "40px",
            }}
          >
            No Section notes
          </div>
        )
      ) : null}
    </div>
  );
};

export default Codenotes;
