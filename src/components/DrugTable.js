import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box, TextField } from "@mui/material";
import { Pagin } from "./pagination";
import { useState } from "react";
import "../App.css";
import CircularWithValueLabel from "./circularper";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    backgroundColor: "#90B2D8",
    padding: "0px 12px 0px 0px",
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
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    height: 1,
  },
}));
export default function NeoplasmTable() {
  console.log("neo enter");
  const [drug, setDrug] = useState(null);
  const [drug1, setDrug1] = useState(null);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true); // New state variable for loading
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
      } finally {
        setIsLoading(false); // Set isLoading to false when the API call is completed
      }
    };
    setIsLoading(true); // Set isLoading to true before making the API call
    setDrug(null); // Clear the previous drug data before fetching new data
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
        setIsLoading(false); // Set isLoading to false when the API call is completed
      }
    };
    setIsLoading(true); // Set isLoading to true before making the API call
    setDrug1(null); // Clear the previous drug1 data before fetching new data
    fetchAllDetailsDrugData();
  }, []);
  console.log("our drug1 is", drug1);
  console.log("our drug is", drug);
  return (
    <>
      <Box
        sx={{
          height: "10px",
          width: "100%",
          textAlign: "left",
          ml: "1px",
          mt: "140px",
        }}
      >
        <Pagin />
      </Box>
      <Box sx={{ mt: "30px" }}>
        {isLoading ? ( // Show loading indicator
          <div
            style={{
              marginLeft: "60%",
              marginTop: "30%",
            }}
          >
            <CircularWithValueLabel />
          </div>
        ) : (
          <TableContainer
            sx={{
              mt: "-0.5px",
              display: "flex",
              position: "absolute",
              width: "910px",
              ml: "-115px",
              height: "440px",
              overflowY: "scroll",
            }}
          >
            <Table sx={{ height: "5px" }}>
              <TableHead sx={{ height: "5px", minHeight: "10px" }}>
                <TableRow>
                  <div>
                    <div className="table">
                      <Box
                        sx={{
                          width: "100px",
                          height: "20%",
                          marginTop: "5%",
                        }}
                      >
                        <Box sx={{ width: "120px", height: "22%" }}>
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
                    </div>
                  </div>
                </TableRow>
              </TableHead>
              <TableHead sx={{ height: "20px", border: "1px solid grey" }}>
                <TableRow
                  sx={{
                    border: "1px solid grey",
                    height: "20px",
                  }}
                >
                  <StyledTableCell
                    sx={{
                      border: "1px solid grey",
                      height: "20px",
                    }}
                    align="center"
                  >
                    D-Index
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
                    Intentional,Selfharm Poisoning
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
                    UnderDosing
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {global.values?.code !== null &&
                  drug
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
                        {row.code.map((value) => (
                          <StyledTableCell
                            key={row.id}
                            sx={{
                              border: "1px solid grey",
                              height: "auto",
                            }}
                            align="center"
                          >
                            {value}
                          </StyledTableCell>
                        ))}
                      </StyledTableRow>
                    ))}
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
                        {row.code.map((value) => (
                          <StyledTableCell
                            key={row.id}
                            sx={{
                              border: "1px solid grey",
                              height: "auto",
                            }}
                            align="center"
                          >
                            {value}
                          </StyledTableCell>
                        ))}
                      </StyledTableRow>
                    ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </>
  );
}

 








