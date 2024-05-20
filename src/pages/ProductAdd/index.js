import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useCookies } from "react-cookie";

import {
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Header from "../../components/Header";

import { addProduct } from "../../utils/api_products";

export default function ProductAdd() {
  const navigate = useNavigate();
  const [cookies] = useCookies(["currentUser"]);
  const { currentUser = {} } = cookies;
  const { token } = currentUser;
  const { enqueueSnackbar } = useSnackbar();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  // POST API mutation
  const addProductMutation = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      // success message
      enqueueSnackbar("Product added.", {
        variant: "success",
      });
      // redirect
      navigate("/");
    },
    onError: (error) => {
      // error message on API call failure
      enqueueSnackbar(error.response.data.message, {
        variant: "error",
      });
      // console.log(error);
      // console.log(error.response);
      // console.log(error.response.data);
      // console.log(error.response.data.message);
    },
  });

  const addProductHandle = (e) => {
    e.preventDefault();
    // trigger mutation to call POST API
    addProductMutation.mutate({
      name,
      description,
      price,
      category,
      token, // credentials prevent URL spoof
    });
  };

  return (
    <Container maxWidth="sm">
      <Header />
      <Card>
        <CardContent>
          <Typography
            variant="h5"
            align="center"
            style={{ fontWeight: "bold" }}
            gutterBottom
          >
            Add Product
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                type="number"
                label="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                label="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button fullWidth variant="contained" onClick={addProductHandle}>
                Create
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}
