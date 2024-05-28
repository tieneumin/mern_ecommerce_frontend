import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useCookies } from "react-cookie";

import {
  Button,
  Card,
  CardContent,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Header from "../../components/Header";

import { getProduct, updateProduct } from "../../utils/api_products";
import { getCategories } from "../../utils/api_categories";
import { uploadImage } from "../../utils/api_images";

export default function ProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cookies] = useCookies(["currentUser"]);
  const { currentUser = {} } = cookies;
  const { token } = currentUser;
  const { enqueueSnackbar } = useSnackbar();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);

  // GET data from /products/:id
  const {
    data: product,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
  });
  // console.log(product);
  // console.log(error);

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });

  // set useState values after API fetches data
  useEffect(() => {
    // check for undefined (see console.log(product))
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setImage(product.image ? product.image : "");
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
      id,
      name,
      description,
      price,
      category,
      image,
      token, // credentials prevent URL spoof
    });
  };

  // upload image mutation
  const uploadImageMutation = useMutation({
    mutationFn: uploadImage,
    onSuccess: (data) => {
      setImage(data.image_url);
    },
    onError: (error) => {
      // error message
      enqueueSnackbar(error.response.data.message, {
        variant: "error",
      });
    },
  });
  const uploadImageHandle = (e) => {
    // console.log(e.target.files[0]);
    uploadImageMutation.mutate(e.target.files[0]);
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
              <FormControl sx={{ width: "150px", my: 3 }}>
                <InputLabel>Category</InputLabel>
                <Select
                  variant="outlined"
                  label="Category"
                  value={category}
                  onChange={(event) => {
                    setCategory(event.target.value);
                  }}
                >
                  <MenuItem value="">Select A Category</MenuItem>
                  {categories.map((category) => {
                    return (
                      <MenuItem key={category._id} value={category._id}>
                        {category.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              {image !== "" ? (
                <>
                  <div>
                    <img
                      src={"http://localhost:5000/" + image}
                      width="300px"
                      height="300px"
                    />
                  </div>
                  <Button onClick={() => setImage("")}>Remove Image</Button>
                </>
              ) : (
                <input
                  type="file"
                  multiple={false}
                  onChange={uploadImageHandle}
                />
              )}
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
