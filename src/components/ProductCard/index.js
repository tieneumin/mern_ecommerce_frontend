import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useCookies } from "react-cookie";

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
  const { _id, name, price, category, image } = product;
  const [cookies] = useCookies(["currentUser"]);
  const { currentUser = {} } = cookies;
  const { role, token } = currentUser;
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
      deleteProductMutation.mutate({
        _id,
        token,
      });
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
        <img
          src={
            "http://localhost:5000/" +
            (image && image !== "" ? image : "uploads/defaultImage.png")
          }
          width="100%"
        />
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
            // 0, false, undefined, null
            if (currentUser.email) {
              addCartItemMutation.mutate(product);
            } else {
              enqueueSnackbar("Please login to add to cart.");
            }
          }}
        >
          Add To Cart
        </Button>
        {role && role === "admin" ? (
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
        ) : null}
      </CardContent>
    </Card>
  );
}
