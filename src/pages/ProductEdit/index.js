import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSnackbar } from "notistack";

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

import { getProduct, updateProduct } from "../../utils/api_products";

export default function ProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  // get data from /products/:id
  const {
    data: product,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
  });
  // console.log(data);
  // console.log(error);

  // set useState values after API fetches data
  useEffect(() => {
    // check for undefined (see console.log(data))
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
    }
  }, [product]);

  // PUT API mutation
  const updateProductMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      // success message
      enqueueSnackbar("Product updated.", {
        variant: "success",
      });
      // redirect
      navigate("/");
    },
    onError: (error) => {
      // error message
      enqueueSnackbar(error.response.data.message, {
        variant: "error",
      });
    },
  });

  const updateProductHandle = (event) => {
    event.preventDefault();
    // trigger mutation to call PUT API
    updateProductMutation.mutate({
      id: id,
      name: name,
      description: description,
      price: price,
      category: category,
    });
  };

  // if API hasn't returned
  if (isLoading) {
    return <Container>Loading...</Container>;
  }
  // if API call error
  if (error) {
    return <Container>{error.response.data.message}</Container>;
  }

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
            Edit Product
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                variant="outlined"
                fullWidth
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Price"
                variant="outlined"
                fullWidth
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Category"
                variant="outlined"
                fullWidth
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                onClick={updateProductHandle}
              >
                Update
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}