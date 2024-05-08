import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";

import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";

import { deleteProduct } from "../../utils/api_products";
import { addCartItem } from "../../utils/api_cart";

export default function ProductCard({ product }) {
  const { _id, name, price, category } = product;
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      // display success message
      enqueueSnackbar("Product deleted.", {
        variant: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      // display error message
      enqueueSnackbar(error.response.data.message, {
        variant: "error",
      });
    },
  });
  const deleteProductHandle = (event) => {
    event.preventDefault();
    const confirm = window.confirm("Delete product from store?");
    if (confirm) {
      deleteProductMutation.mutate(_id);
    }
  };

  const addCartItemMutation = useMutation({
    mutationFn: addCartItem,
    onSuccess: () => {
      // success message
      enqueueSnackbar("Item added to cart.", {
        variant: "success",
      });
    },
    onError: (error) => {
      // error message
      enqueueSnackbar(error.response.data.message, {
        variant: "error",
      });
    },
  });

  return (
    <Card>
      <CardContent>
        <Typography
          variant="h6"
          style={{
            fontWeight: "bold",
          }}
        >
          {name}
        </Typography>
        <Box display="flex" justifyContent="space-between" sx={{ my: 3 }}>
          <Chip label={`$ ${price}`} color="success" />
          <Chip label={category} color="warning" />
        </Box>
        <Button
          fullWidth
          variant="contained"
          color="info"
          onClick={() => {
            addCartItemMutation.mutate(product);
          }}
        >
          Add To Cart
        </Button>
        {/* user === "admin" if-statement goes here */}
        <Box display="flex" justifyContent="space-between" sx={{ mt: 3 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              navigate(`/products/${_id}`);
            }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={deleteProductHandle}
          >
            Delete
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
