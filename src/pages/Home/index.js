import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import ProductCard from "../../components/ProductCard";

import { getCategories } from "../../utils/api_categories";
import { getProducts } from "../../utils/api_products";

export default function Home() {
  const [category, setCategory] = useState("all"); // user selection

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const { data: products = [] } = useQuery({
    queryKey: ["products", category],
    queryFn: () => getProducts(category),
  });

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ textAlign: "center", my: 3 }}>
        Welcome to My Store
      </Typography>
      <hr />
      <Box display="flex" justifyContent="space-between" sx={{ my: 3 }}>
        <Typography variant="h5">Products</Typography>
        <Button variant="contained" color="success">
          Add New
        </Button>
      </Box>

      <FormControl sx={{ width: "150px" }}>
        <InputLabel>Category</InputLabel>
        <Select
          label="Category"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        >
          <MenuItem value="all">All Categories</MenuItem>
          {categories.map((category) => {
            return (
              <MenuItem value={category} key={category}>
                {category}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      <Grid container spacing={3} sx={{ mt: 0, mb: 3 }}>
        {products.map((product) => {
          return (
            <Grid item lg={4} md={6} xs={12} key={product._id}>
              <ProductCard product={product} setCategory={setCategory} />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}
