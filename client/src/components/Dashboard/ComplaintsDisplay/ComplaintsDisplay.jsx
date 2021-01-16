import React, { useState, useEffect } from "react";
import Complaint from "./Complaint/Complaint";
import "./ComplaintsDisplay.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Grid } from "@material-ui/core";
const ComplaintsDisplay = () => {
  const history = useHistory();
  const [complaints, setComplaints] = useState([]);
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("Xroad"));
    // console.log(JSON.parse(token));
    if (!token) history.push("/login");
    if (token.level === "1") {
      axios
        .get(`http://localhost:5000/complain/get-ward-complains/${token.ward}`)
        .then((res) => {
          console.log(res);
          setComplaints(res.data);
        })
        .catch((err) => {
          console.log("There is an error here in getting the data per ward");
          console.log(err);
        });
    } else {
      axios
        .get(`http://localhost:5000/complain/get-levelwise/${token.level}`)
        .then((res) => {
          console.log(res);
          setComplaints(res.data);
        })
        .catch((err) => {
          console.log("There is an error here in getting the data per ward");
          console.log(err);
        });
    }
  }, []);
  return (
    <>
      {complaints.map((complaint) => (
        <Grid item container md={4} sm={3} xs={6} key={complaint._id}>
          <Complaint data={complaint} />
        </Grid>
      ))}
    </>
  );
};

export default ComplaintsDisplay;
