import React, { useEffect } from "react";
import DashboardLayout from "../pages/DashboardLayout";
import styles from "../../assets/css/components.module.css";
import {
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { useState } from "react";
import Table from "../pages/Table";
import axios from "axios";
import { useSelector } from "react-redux";

const Notes = () => {
  const [data, setData] = useState([]);
  const { id } = useSelector((state) => state);

  const [dataStatus, setDataStatus] = useState(0);

  const [product, setProduct] = useState();
  const [quantity, setQuantity] = useState();

  const columns = [
    {
      name: "Product Name",
      selector: (row) => row.productName,
    },
    {
      name: "Quantity",
      selector: (row) => row.quantity,
      sortable: true,
      wrap: true,
    },
    {
      name: "Created At",
      selector: (row) => {
        const date = new Date(row.createdAt);
        return date.toDateString()},
      sortable: true,
      wrap: true,
    },
    {
      name: "Action",
      selector: (row) => <Button variant="outlined" color="error"  onClick={()=>{deleteNote(row._id)}}>Delete</Button>,
      sortable: true,
      wrap: true,
    },
  ];

  const createNote = ()=>{
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}createNote`, {
          createdBy:id,
          product:product,
          quantity:quantity,
      })
      .then((res) => {
        getNotes();
        setProduct("");
        setQuantity("");
      })
      .catch((err) => console.log(err));
  }

  const deleteNote = (id)=>{
    axios
      .delete(`${process.env.REACT_APP_BACKEND_URL}deleteNote/${id}`)
      .then((res) => {
        getNotes();
      })
      .catch((err) => console.log(err));
  }
  
  const getNotes=()=>{
    axios
    .post(`${process.env.REACT_APP_BACKEND_URL}getNote`, {
          id:id,
        })
        .then((res) => {
          setData(res.data);
          setDataStatus(res.status);
        })
        .catch((err) => console.log(err));
  }
      
  useEffect(()=>{
    getNotes();
  },[])



  return (
    <DashboardLayout>
      <Container maxWidth="lg" className={styles.container}>
        <Grid container>
          <Grid item xs={12}>
            {/* Grid Content */}

            <Paper
              className="paper"
              variant="outlined"
              elevation={3}
              style={{
                backgroundColor: "var(--main-color)",
                color: "white",
                padding: "0 0.5rem",
              }}
            >
              <Grid item xs={12}>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                    <h2 style={{ textAlign: "center" }}>Notes</h2>
                  </Typography>
                </Grid>
                <Grid
                  container
                  fullWidth
                  spacing={1}
                  style={{
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "1rem 5rem",
                  }}
                >
                  <Grid item xs={12} md={3}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      value={product}
                      placeholder="Enter Product Name"
                      style={{
                        background: "white",
                        borderRadius: "5px",
                      }}
                      // value={local}
                      onChange={(e) => {
                        setProduct(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      type="number"
                      size="small"
                      value={quantity}
                      placeholder="Quantity"
                      style={{
                        background: "white",
                        borderRadius: "5px",
                      }}
                      // value={local}
                      onChange={(e) => {
                        setQuantity(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <Button
                      variant="contained"
                      size="small"
                      style={{
                        backgroundColor: "white",
                        color: "var(--main-color)",
                        borderRadius: "5px",
                        margin: "1rem 0",
                        paddingX: "1rem",
                        textTransform: "capitalize",
                        fontWeight: "600",
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        product && quantity
                        ? createNote()
                        : alert("Please enter Product and Quantity");
                      }}
                    >
                      Add Note
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
            {/* <Grid item xs={12} md={6}> */}
            <Paper
              style={{
                padding: "1rem",
                borderRadius: "5px",
                margin: "1rem 0",
              }}
            >
              <Typography
                style={{ paddingBottom: "1rem", fontWeight: "bold" }}
                variant="h5"
              >
                Recent Notes
              </Typography>
              <Table
                data={data}
                status={dataStatus}
                columns={columns}
                expand={false}
                rowKey={"_id"}
                style={{border:"1px solid black",height:"100px"}}
              />
            </Paper>
            {/* </Grid> */}
          </Grid>
        </Grid>
      </Container>
    </DashboardLayout>
  );
};

export default Notes;
