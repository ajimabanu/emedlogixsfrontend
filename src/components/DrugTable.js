import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box, TextField, Typography } from "@mui/material";
import { useState } from "react";
import "../App.css";
import { Loads } from "./Loads";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    backgroundColor: "#90B2D8",
    
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    height: 1,
    border: "1px solid grey",
   
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
    height: 1,
    padding: "0px 12px 0px 0px",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    height: 1,
  },
}));
export default function DrugTable({ setResults1, setSelectedCode }) {
  console.log("neo enter");
  const [drug, setDrug] = useState(null);
  const [drug1, setDrug1] = useState(null);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [clickedCode, setClickedCode] = useState(null);
  const [result1, setResult1] = useState([]);
  const [fetchedData, setFetchedData] = useState(null);

  React.useEffect(() => {
    const fetchDrugData = async () => {
      try {
        if (global.values && global.values.code) {
          const response = await fetch(`/codes/${global.values.code}/drug`);
          if (response.ok) {
            const data = await response.json();
            setDrug(data);
          } else {
            console.error("Failed to fetch data");
          }
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    setDrug(null);
    fetchDrugData();
  }, [global.values?.code]);

  //all values of drug
  React.useEffect(() => {
    const fetchAllDetailsDrugData = async () => {
      try {
        const response = await fetch(`/codes/alldetails/drug`);
        if (response.ok) {
          const data = await response.json();
          setDrug1(data);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    setIsLoading(true);
    setDrug1(null);
    fetchAllDetailsDrugData();
  }, []);
  function getTitleFromNestedChild(row) {
    if (row.child?.child?.child?.child?.code) {
      return `${row.child.title}-${row.child.child.title}-${row.child.child.child.title}-${row.child.child.child.child.title}`;
    } else if (row.child?.child?.child?.code) {
      return `${row.child.title} - ${row.child.child.title} - ${row.child.child.child.title}`;
    } else if (row.child?.child?.code) {
      return `${row.child.title} - ${row.child.child.title}`;
    } else if (row.child?.code) {
      return `${row.child.title}`;
    } else {
      return row.title;
    }
  }

  const handleCodeClick = async (code) => {
    setClickedCode(code);
    await fetchCodeDetails(code);
    setResult1(fetchedData);
    setSelectedCode(code);
    global.selectedCodeDetails = fetchedData;
    global.selectedSectionDetails = fetchedData;
    global.selectedChapterDetails = fetchedData;

    global.intable = null;
    global.selectedCode = code;
    global.isCodeClicked = true;
  };
  const fetchCodeDetails = async (code) => {
    try {
      if (code) {
        const response = await fetch(
          `/codes/${code}/details/?version=${global.years}`
        );
        if (response.ok) {
          const data = await response.json();
          setFetchedData(data);
          setResult1(data);
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
   
          {" "}
          <TableContainer
            sx={{
              height: "65vh",
              overflowY: "auto",
              position:"absolute",
              width:"50vw",
              mt:"-80px",
            }}
          >
            <Table
              sx={{
                ml: "1%",
                width: "50vw",
                mt: "-8px",
              }}
            >
              <TableHead sx={{ height: "5px", minHeight: "10px" }}>
                <TableRow>
                  
                      <Box
                        sx={{
                          width: "100px",
                          height: "20%",
                          marginTop: "5%",
                        }}
                      >
                        <Box sx={{ width: "120px", height: "22%",  }}>
                          <TextField
                            sx={{
                              width: "130px",
                              "& input": {
                                height: "10px",
                                bgcolor: "background.paper",
                                marginTop: "-5%",
                                color: (theme) =>
                                  theme.palette.getContrastText(
                                    theme.palette.background.paper
                                  ),
                              },
                            }}
                            placeholder="Use Filter"
                            onChange={(e) => setSearch(e.target.value)}
                          />
                        </Box>
                      </Box>
                    
                  
                </TableRow>
              </TableHead>
              <TableHead sx={{ height: "20px", border: "1px solid grey" }}>
                <TableRow
                  sx={{
                    border: "1px solid grey",
                    height: "20px",
                    width: "10px",
                  }}
                >
                  <StyledTableCell
                    sx={{
                      border: "1px solid grey",
                      height: "20px",
                    }}
                    align="center"
                  >
                    D Index
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{
                      border: "1px solid grey",
                      height: "20px",
                    }}
                    align="center"
                  >
                    Accidental, UnIntentional Poisoning
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{
                      border: "1px solid grey",
                      height: "20px",
                    }}
                    align="center"
                  >
                    Intentional, Selfharm Poisoning
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{
                      border: "1px solid grey",
                      height: "20px",
                    }}
                    align="center"
                  >
                    Assault Poisoning
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{
                      border: "1px solid grey",
                      height: "20px",
                    }}
                    align="center"
                  >
                    Undetermined Poisoning
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{
                      border: "1px solid grey",
                      height: "20px",
                    }}
                    align="center"
                  >
                    Adverse Effect
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{
                      border: "1px solid grey",
                      height: "20px",
                    }}
                    align="center"
                  >
                    Under Dosing
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {global.values?.code !== null &&
                  drug
                    ?.filter((item) => {
                      return (
                        search.toLowerCase() === "" ||
                        item.title.toLowerCase().includes(search)
                      );
                    })
                    .map((row) => {
                      const hasValidParentCode =
                        row.code && row.code[0] !== "null";
                      const hasValidChildCode =
                        row.child &&
                        row.child.code &&
                        row.child.code[0] !== "null";
                      const hasValidChildChildCode =
                        row.child &&
                        row.child.child &&
                        row.child.child.code &&
                        row.child.child.code[0] !== "null";
                      const hasValidChildChildChildCode =
                        row.child &&
                        row.child.child &&
                        row.child.child.child &&
                        row.child.child.child.code &&
                        row.child.child.child.code[0] !== "null";
                      const hasValidChildChildChildChildCode =
                        row.child &&
                        row.child.child &&
                        row.child.child.child &&
                        row.child.child.child.child &&
                        row.child.child.child.child.code &&
                        row.child.child.child.child.code[0] !== "null";

                      if (
                        !(
                          hasValidParentCode ||
                          hasValidChildCode ||
                          hasValidChildChildCode ||
                          hasValidChildChildChildCode ||
                          hasValidChildChildChildChildCode
                        )
                      ) {
                        return null;
                      }

                      const codeDetails = (
                        hasValidChildChildChildChildCode
                          ? row.child.child.child.child.code
                          : hasValidChildChildChildCode
                          ? row.child.child.child.code
                          : hasValidChildChildCode
                          ? row.child.child.code
                          : hasValidChildCode
                          ? row.child.code
                          : row.code
                      ).join(", ");

                      const chunkedCodeDetails = codeDetails
                        .split(", ")
                        .reduce((acc, code) => {
                          if (!acc.length || acc[acc.length - 1].length === 6) {
                            acc.push([code]);
                          } else {
                            acc[acc.length - 1].push(code);
                          }
                          return acc;
                        }, []);
                      return chunkedCodeDetails.map((chunk, index) => (
                        <StyledTableRow key={`${row.id}_${index}`}>
                          <StyledTableCell component="th" scope="row">
                            {getTitleFromNestedChild(row)}
                          </StyledTableCell>
                          {Array.from({ length: 6 }).map((_, colIndex) => (
                            <StyledTableCell
                              key={`${row.id}_${index}_${colIndex}`}
                              sx={{
                                border: "1px solid grey",
                              }}
                              align="center"
                            >
                              {chunk[colIndex] !== "--" ? (
                                <a
                                  style={{ borderBottom: "0.5px solid blue" }}
                                  onClick={() =>
                                    handleCodeClick(chunk[colIndex])
                                  }
                                >
                                  {chunk[colIndex]}
                                </a>
                              ) : (
                                chunk[colIndex]
                              )}
                            </StyledTableCell>
                          ))}
                        </StyledTableRow>
                      ));
                    })}
                {!global.values?.code &&
                  drug1
                    ?.filter((item) => {
                      return search.toLowerCase() === ""
                        ? item
                        : item.title.toLowerCase().includes(search);
                    })
                    .map((row) => (
                      <StyledTableRow key={row.id}>
                        <StyledTableCell component="th" scope="row">
                          {row.title}
                        </StyledTableCell>
                        {row.code.map((value, index) => (
                          <StyledTableCell
                            key={index}
                            sx={{
                              border: "1px solid grey",
                            }}
                            align="center"
                          >
                            {value !== "--" ? (
                              <a
                                style={{
                                  borderBottom: "0.5px solid blue",
                                }}
                                onClick={() => handleCodeClick(value)}
                              >
                                {value}
                              </a>
                            ) : (
                              "--"
                            )}
                          </StyledTableCell>
                        ))}
                      </StyledTableRow>
                    ))}
              </TableBody>
              {isLoading && <Loads />}
              {global.values?.code !== null && drug && drug.length === 0 && (
                <Typography
                  marginLeft={30}
                  fontWeight={800}
                  variant="caption"
                  color={"#4185D2"}
                >
                  <h3>No Drug codes found for the given search criteria.</h3>
                </Typography>
              )}
              {!global.values?.code && drug && drug1.length === 0 && (
                <Typography
                  variant="caption"
                  fontWeight={800}
                  color={"#4185D2"}
                >
                  <h3>No Drug codes available in the data.</h3>
                </Typography>
              )}
            </Table>
          </TableContainer>
      
    
    </>
  );
}






