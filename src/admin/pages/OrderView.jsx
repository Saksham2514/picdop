import { Grid, Button, Chip, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NestedModal from "./Modal";
import { useEffect } from "react";
import axios from "axios";
import { Loading } from "./Loading";
import { useSelector } from "react-redux";

const DataDisplay = ({ label, value, color }) => (
  <>
    <Typography variant="button" color="gray">
      {label}
    </Typography>
    <br />
    <Typography
      textOverflow={"ellipsis"}
      variant="body1"
      color={color ? color : ""}
    >
      {value}
    </Typography>
  </>
);

const ParcelForm = ({ id }) => {
  const [data, setData] = React.useState([]);
  const [agentData, setAgentData] = React.useState([]);
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.token);

  const navigate = useNavigate();

  const getAgentData = (id) => {
    try {
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}users/search`, { _id: id })
        .then((res) => {
          setAgentData(res.data[0]);
        })
        .then(setLoading(false))
        .catch((err) => console.log(err));
    } catch (err) {
      alert("error");
    } finally {
      setLoading(false);
    }
  };

  const fetch = () => {
    try {
      axios
        .post(
          `${process.env.REACT_APP_BACKEND_URL}orders/search`,
          { _id: id },
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((res) => {
          console.log(res.data[0]);
          setData(res.data[0]);
          if (res.data[0].agentId) getAgentData(res.data[0].agentId);
          if (res.status > 0 && res.status === 200) {
            setLoading(false);
          }
        })
        .catch((err) => console.log(err));
    } catch (err) {
      alert("error");
      console.log(err);
    }
  };
  useEffect(() => {
    fetch();
  }, []);

  const handleRegenerate = () => {
    let otp = parseInt(
      (Math.floor(Math.random() * 999999) + 100000).toString().substring(0, 6)
    );
    axios
      .put(
        `${process.env.REACT_APP_BACKEND_URL}orders/${id}`,
        { otp: otp },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then(fetch())
      .catch((err) => console.error(err));
  };
  const handleDelete = () => {
    axios
      .delete(`${process.env.REACT_APP_BACKEND_URL}orders/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then(navigate("/collection"))
      .catch((err) => console.error(err));
  };

  return loading ? (
    <>
      <Loading />
    </>
  ) : (
    <div>
      <Grid container>
        <Grid item xs={4} md={4}>
          <Typography
            style={{ paddingBottom: "1rem", fontWeight: "bold" }}
            variant="h6"
          >
            Order View
          </Typography>
        </Grid>
        <Grid item xs={4} md={4} textAlign={"center"}>
          {data.status.toLowerCase() !== "completed" ? (
            <Typography style={{ fontWeight: "bold" }} variant="h6">
              OTP is : {data.otp}
            </Typography>
          ) : (
            <></>
          )}
        </Grid>
        <Grid item xs={4} md={4} textAlign={"right"}>
          <Chip
            label={data.status}
            color={
              data.status === "Accepted"
                ? "info"
                : data.status === "Completed"
                ? "success"
                : "warning"
            }
          />
        </Grid>
      </Grid>
      <Grid container fullWidth spacing={3}>
        {/* LBH ROW */}

        <Grid item xs={4} md={3}>
          <DataDisplay label="Weight" value={data.parcelWeight + " kg"} />
        </Grid>
        <Grid item xs={4} md={3}>
          <DataDisplay label="Height" value={data.parcelHeight + " inch"} />
        </Grid>
        <Grid item xs={4} md={3}>
          <DataDisplay label="Length" value={data.parcelLength + " inch"} />
        </Grid>
        <Grid item xs={4} md={3}>
          <DataDisplay label="Width" value={data.parcelWidth + " inch"} />
        </Grid>
        {/* LBH ROW ends  */}
        {/* Descritpion and payments mode  */}
        <Grid item xs={8} md={3}>
          <DataDisplay
            label="Description"
            value={data.parcelDescription || "-"}
          />
        </Grid>
        <Grid item xs={4} md={3}>
          <DataDisplay
            label="Payment Amount"
            value={"₹ " + data.parcelPaymentCollection}
            color="green"
          />
        </Grid>
        <Grid item xs={4} md={3}>
          <DataDisplay label="Payment Mode" value={data.paymentMode} />
        </Grid>
        <Grid item xs={4} md={3}>
          <DataDisplay label="Parcel Type" value={data.parcelType} />
        </Grid>

        {agentData._id ? (
          <>
            <Grid item xs={6} md={6}>
              <DataDisplay
                label={"Pickup Time"}
                value={
                  data.pickupDate
                    ? new Date(data.pickupDate).toLocaleString()
                    : "-"
                }
                key={352}
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <DataDisplay
                label={"Delivery Time"}
                value={
                  data.deliveryDate
                    ? new Date(data.deliveryDate).toLocaleString()
                    : "Not delivered yet"
                }
                key={352}
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <DataDisplay
                label={"Agent name"}
                value={data.agentName}
                key={352}
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <Typography variant="button" color="gray">
                Contact Agent
              </Typography>
              <br />
              <Typography
                component={"a"}
                href={`tel:${agentData.contact.replace(/\D/g, "")}`}
                variant="body1"
                color=""
              >
                {agentData.contact}
              </Typography>
            </Grid>
          </>
        ) : (
          <></>
        )}
        {/* Descritpion and payments mode ends */}
        <Grid item xs={12} md={6}>
          <Typography variant="button" color="gray">
            Parcel Images
          </Typography>
          {data?.parcelImages?.length > 0 ? (
            <>
              <div style={{ display: "flex", overflowX: "auto" }}>
                {data?.parcelImages.map((url) => (
                  <>
                    <img
                      src={url}
                      alt="..."
                      height={100}
                      width={100}
                      style={{ border: "1px solid black" }}
                    />
                    <br />
                  </>
                ))}
              </div>
            </>
          ) : (
            <Typography> No Images Found</Typography>
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="button" color="gray">
            Bill Images
          </Typography>
          {data?.billImages?.length > 0 ? (
            <>
              <div style={{ display: "flex", overflowX: "auto" }}>
                {data?.billImages.map((url) => (
                  <>
                    <img
                      src={url}
                      alt="..."
                      height={100}
                      width={100}
                      style={{ border: "1px solid black" }}
                    />
                    <br />
                  </>
                ))}
              </div>
            </>
          ) : (
            <Typography> No Images Found</Typography>
          )}
        </Grid>

        {/* Button Row starts */}
        <Grid item xs={12} md={4}>
          <Link
            to="/collection"
            style={{
              textDecoration: "none",
              borderRadius: "1rem",
            }}
          >
            <Button variant="contained" size="small" color="primary">
              Back To Dashboard
            </Button>
          </Link>
        </Grid>
        {data.status.toLowerCase() !== "completed" ? (
          <>
            <Grid
              item
              xs={6}
              md={4}
              sx={{ textAlign: { xs: "left", md: "center" } }}
            >
              <Button
                variant="contained"
                size="small"
                color="success"
                onClick={() => {
                  handleRegenerate();
                  fetch();
                }}
              >
                Regenerate OTP
              </Button>
            </Grid>

            <Grid
              xs={6}
              md={4}
              style={{ paddingTop: "1.5rem" }}
              textAlign="right"
            >
              <NestedModal label=" Order" handleDelete={handleDelete} />
            </Grid>
          </>
        ) : (
          <></>
        )}
        {/* Button row ens  */}
      </Grid>
    </div>
  );
};

export default ParcelForm;
