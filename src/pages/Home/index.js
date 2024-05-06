import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import Header from "../../components/Header";
import ProductCard from "../../components/ProductCard";

import { getProducts } from "../../utils/api_products";
import { getCategories } from "../../utils/api_categories";

export default function Home() {
  const navigate = useNavigate();

  const [category, setCategory] = useState("all"); // user selection
  const [page, setPage] = useState(1);
  const perPage = 6;

  const { data: products = [] } = useQuery({
    queryKey: ["products", category, page, perPage],
    queryFn: () => getProducts(category, page, perPage),
  });
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  return (
    <Container maxWidth="xl">
      <Header />
      <Box display="flex" justifyContent="space-between">
        <Typography
          variant="h5"
          style={{
            fontWeight: "bold",
          }}
        >
          Products
        </Typography>
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            navigate("/add");
          }}
        >
          Add New
        </Button>
      </Box>

      <FormControl sx={{ width: "150px", my: 3 }}>
        <InputLabel>Category</InputLabel>
        <Select
          label="Category"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            // reset to page 1 on category change for good UX
            setPage(1);
          }}
        >
          <MenuItem value="all">All Categories</MenuItem>
          {categories.map((c) => {
            return (
              <MenuItem key={c} value={c}>
                {c}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        {products.map((product) => {
          return (
            <Grid key={product._id} item lg={4} md={6} xs={12}>
              <ProductCard product={product} />
            </Grid>
          );
        })}
        {products.length === 0 ? (
          <Grid item>
            <Typography sx={{ ml: 1 }}>No items found.</Typography>
          </Grid>
        ) : null}
      </Grid>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ mb: 2 }}
      >
        <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Previous
        </Button>
        <Typography sx={{ mx: 3 }}>Page: {page}</Typography>
        <Button
          disabled={products.length < perPage}
          onClick={() => setPage(page + 1)}
        >
          Next
        </Button>
      </Box>
    </Container>
  );
}
