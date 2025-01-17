// import React, { useEffect, useState } from "react";

// const Chapternotes = () => {
//   const [results, setResults] = useState(null);

//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         if (
//           global.values &&
//           global.values.code &&
//           global.years &&
//           global.selectedChapterDetails == null
//         ) {
//           const response = await fetch(
//             `/codes/${global.values.code}/details/?version=${global.years}`
//           );
//           if (response.ok) {
//             const data = await response.json();
//             setResults(data);
//           } else {
//             console.error("Failed to fetch data");
//           }
//         }
//       } catch (error) {
//         console.error("Error:", error);
//       }
//     };

//     if (global.values && global.values.code) {
//       fetchBooks();
//     } else {
//       setResults(null);
//     }
//   }, [global.values]);

//   useEffect(() => {
//     if (global.selectedCodeDetails && global.isCodeClicked) {
//       setResults(global.selectedChapterDetails);
//     } else {
//       // Handle the case when no code is selected
//       setResults(null);
//     }
//   }, [global.selectedChapterDetails]);

//   console.log("our result is", results);
//   const shouldDisplayClassification = (classification, index) => {
//     if (index === 0) {
//       return true;
//     }
//     const previousClassifications = results.chapter.notes
//       .slice(0, index)
//       .map((note) => note.classification);
//     return !previousClassifications.includes(classification);
//   };
//   return (
//     <div
//       style={{
//         marginTop: "1%",
//         height: "50vh",

//         width: "44vw",
//         fontFamily: "Verdana",
//         fontSize: "13px",
//       }}
//     >
//       {results && results.chapter && results.chapter.description ? (
//         <div key={results.code}>
//           <div
//             style={{
//               marginLeft: "17px",
//               fontSize: "13px",
//               fontFamily: "Verdana",
//             }}
//           >
//             {results.chapter.description}
//           </div>
//         </div>
//       ) : (
//         <div></div>
//       )}

//       {results && results.chapter && results.chapter.notes ? (
//         results.chapter.notes
//           .sort((a, b) => a.classification.localeCompare(b.classification))
//           .map((note, index) => (
//             <div key={index}>
//               {index === 0 ||
//               note.classification !==
//                 results.chapter.notes[index - 1].classification ? (
//                 <div style={{ padding: "10px 20px 20px 20px" }}>
//                   <strong>{note.classification.toUpperCase()}</strong>
//                   :&nbsp;&nbsp;
//                   {note.notes}
//                 </div>
//               ) : (
//                 <div style={{ marginLeft: "110px" }}>{note.notes}</div>
//               )}
//             </div>
//           ))
//       ) : (
//         <div
//           style={{
//             marginLeft: "40px",
//             fontSize: "13px",
//             fontFamily: "Verdana",
//           }}
//         >
//           No chapter notes
//         </div>
//       )}
//     </div>
//   );
// };

// export default Chapternotes;
import React, { useEffect, useState } from "react";

const Chapternotes = () => {
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
            setResults(null);
            console.error("Failed to fetch data");
          }
        }
      } catch (error) {
        setResults(null);
        console.error("Error:", error);
      }
    };

    fetchBooks();
  }, [global.values]);
  useEffect(() => {
    if (global.isCodeClicked) {
      setResults(global.selectedCodeDetails); // Use the stored details
    } else {
      setResults(null);
    }
  }, [global.selectedCodeDetails]);

  console.log("our result is", results);
  const shouldDisplayClassification = (classification, index) => {
    if (index === 0) {
      return true;
    }
    const previousClassifications = results.chapter.notes
      .slice(0, index)
      .map((note) => note.classification);
    return !previousClassifications.includes(classification);
  };
  return (
    <div>
      <div
        style={{
          marginTop: "1%",
          height: "50vh",

          width: "44vw",
          fontFamily: "Verdana",
          fontSize: "13px",
        }}
      >
        {results ? (
          results.chapter && results.chapter.description ? (
            <div key={results.code}>
              <div
                style={{
                  marginLeft: "17px",
                  fontSize: "13px",
                  fontFamily: "Verdana",
                }}
              >
                {results.chapter.description}
              </div>
            </div>
          ) : (
            <div></div>
          )
        ) : null}

        {results ? (
          results.chapter && results.chapter.notes ? (
            results.chapter.notes
              .sort((a, b) => a.classification.localeCompare(b.classification))
              .map((note, index) => (
                <div key={index}>
                  {index === 0 ||
                  note.classification !==
                    results.chapter.notes[index - 1].classification ? (
                    <div style={{ padding: "10px 20px 20px 20px" }}>
                      <strong>{note.classification.toUpperCase()}</strong>
                      :&nbsp;&nbsp;
                      {note.notes}
                    </div>
                  ) : (
                    <div style={{ marginLeft: "110px" }}>{note.notes}</div>
                  )}
                </div>
              ))
          ) : (
            <div
              style={{
                marginLeft: "40px",
                fontSize: "13px",
                fontFamily: "Verdana",
              }}
            >
              No chapter notes
            </div>
          )
        ) : null}
      </div>
    </div>
  );
};

export default Chapternotes;
