import React, { Fragment, useState } from "react";
const renderChildRows = (row, depthLevel = 1) => {
  if (row.child) {
    const paddingLeftValue = 20 + depthLevel * 20; // Increase padding for deeper levels
    return (
      <>
        <tr key={row.child.id}>
          <td style={{ paddingLeft: `${paddingLeftValue}px` }}>
            <ul
              style={{
                listStyleType: "circle",
                paddingLeft: "20px",
                margin: 0,
              }}
            >
              {row.child.title && (
                <li>
                  {row.child.title}
                  <a style={{ color: "blue", borderBottom: "1px solid blue" }}>
                    {row.child.code !== null &&
                      row.child.code !== "null" &&
                      ` ${row.child.code}`}
                  </a>
                </li>
              )}
            </ul>
          </td>
        </tr>
        {renderChildRows(row.child, depthLevel + 1)}
      </>
    );
  }
  return null;
};
const Sectionnotes1 = ({ onCodeClick }) => {
  const [index1, setIndex1] = useState(null);
  const [fetchedData, setFetchedData] = useState(null);
  const [clickedCode, setClickedCode] = useState(null);
  React.useEffect(() => {
    console.log("enter index table");
    const fetchBooks = async () => {
      try {
        const response = await fetch(
          `codes/alldetails/index/title?filterBy=${global.clickedTab}`
        );
        if (response.ok) {
          const data = await response.json();
          setIndex1(data);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    // Clear the previous index data before fetching new data
    fetchBooks();
  }, []);
  console.log("our index1 is", index1);
  console.log(global.searches);
  const search = global.searches;
  
  const handleCodeClick = async (code) => {
    setClickedCode(code);
    global.intable = null;
    await fetchCodeDetails(code);
    onCodeClick(code);
    global.selectedCodeDetails = fetchedData;
    global.intable = null;
    global.selectedCode = code;
    global.isCodeClicked = true;
    // global.values = null;
  };
  const fetchCodeDetails = async (code) => {
    try {
      if (code) {
        const response = await fetch(
          `/codes/${code}/details/?version=${global.years}`
        );
        if (response.ok) {
          const data = await response.json();
          setFetchedData(data); // Store the fetched data in the state
        } else {
          console.error("Failed to fetch data");
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <>
      <div>
        <tbody style={{ textAlign: "left" }}>
          {!global.values?.code &&
            index1
              ?.filter((item) => {
                return search.toLowerCase() === ""
                  ? item
                  : item.title.toLowerCase().includes(search);
              })
              .map((row) => (
                <Fragment key={row.id}>
                  <tr>
                    <td>
                      <ul
                        style={{
                          listStyleType: "square",
                          paddingLeft: "20px",
                          margin: 0,
                        }}
                      >
                        {row.nemod !== null && row.nemod !== "null" ? ( // Check if nemod has a value
                          <li>
                            {row.title} {row.nemod}
                          </li>
                        ) : (
                          <li>{row.title}</li>
                        )}
                      </ul>
                    </td>
                    {row.seealso !== null && row.seealso !== "null" && (
                      <td>
                        <a
                          style={{
                            color: "blue",
                            borderBottom: "1px solid blue",
                          }}
                        >
                          SeeAlso {row.seealso}
                        </a>
                      </td>
                    )}
                    {row.see !== null && row.see !== "null" && (
                      <td>
                        <a
                          style={{
                            color: "blue",
                            borderBottom: "1px solid blue",
                          }}
                        >
                          See {row.see}
                        </a>
                      </td>
                    )}
                    {row.code !== null && row.code !== "null" && (
                      <td>
                        <a
                          style={{
                            color: "blue",
                            borderBottom: "1px solid blue",
                          }}
                          onClick={() => handleCodeClick(row.code)}
                        >
                          {row.code}
                        </a>
                      </td>
                    )}
                  </tr>
                  {renderChildRows(row)}
                </Fragment>
              ))}
        </tbody>
      </div>
    </>
  );
};
export default Sectionnotes1;
