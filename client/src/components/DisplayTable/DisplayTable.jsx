import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import EjectIcon from "@material-ui/icons/Eject";
import ProgressStatus from "./ProgressStatus";
import moment from "moment";
import { Link } from "react-router-dom";
import axios from "axios";
const columns = [
  { id: "name", label: "Area", minWidth: 150 },
  { id: "code", label: "Date", minWidth: 100 },
  {
    id: "population",
    label: "Status",
    minWidth: 20,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "size",
    label: "Upvote",
    minWidth: 20,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
];

const useStyles = makeStyles({
  root: {
    width: "100%",
    background: "transparent",
    color: "white",
  },
  container: {
    maxHeight: "calc(100vh - 80px)",
  },
});
const wardsarray = ["Area1", "Area2", "Area3", "Area4", "Area5", "Area6"];
export default function StickyHeadTable() {
  const [tableRows, setTableRows] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/complain/getall")
      .then((res) => {
        console.log(res.data);
        setTableRows(res.data);
      })
      .catch((err) => {
        console.log("There is an error here in retriving all the complaints");
        console.log(err);
      });
  }, []);
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    background: "rgba(0,0,0,.7)",
                    color: "white",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row._id}
                    style={{ background: "rgba(0,0,0,.5)" }}
                  >
                    <TableCell style={{ color: "white " }}>
                      {wardsarray[row.ward]}
                    </TableCell>
                    <TableCell style={{ color: "white " }}>
                      {moment(row.regDate).format("MMMM Do YYYY")}
                    </TableCell>
                    <TableCell align={"right"}>
                      <ProgressStatus
                        value={
                          row.level === 0
                            ? 25
                            : row.level === 1
                            ? 50
                            : row.level === 2
                            ? 75
                            : 100
                        }
                      />
                    </TableCell>
                    <TableCell align={"right"}>
                      <Link
                        to={`/upvote/${row._id}`}
                        style={{
                          color: "white ",
                          display: "flex",
                          justifyContent: "flex-end",
                          textDecoration: "none",
                          alignItems: "center",
                        }}
                      >
                        <EjectIcon />
                        {row.upvotes}
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 100]}
        component="div"
        count={tableRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        style={{ color: "white " }}
      />
    </Paper>
  );
}
