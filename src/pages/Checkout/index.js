import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useCookies } from "react-cookie";

import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Header from "../../components/Header";

import { getCart, emptyCart } from "../../utils/api_cart";
import { addOrder } from "../../utils/api_orders";

export default function Checkout() {
  const [cookies] = useCookies(["currentUser"]);
  const { currentUser = {} } = cookies;
  const { token } = currentUser;
  const { enqueueSnackbar } = useSnackbar();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const { data: cart = [] } = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
  });

  const calculateTotal = () => {
    let total = 0;
    cart.forEach((i) => {
      total += i.price * i.quantity;
    });
    return total.toFixed(2);
  };

  const addOrderMutation = useMutation({
    mutationFn: addOrder,
    onSuccess: (data) => {
      // remove items from cart
      emptyCart();
      // get billplz url (see backend addOrder), redirect user to payment page
      window.location.href = data.billplzUrl;
    },
    onError: (error) => {
      enqueueSnackbar(error.response.data.message, {
        variant: "error",
      });
    },
  });

  const checkoutHandle = () => {
    // check if name/email filled, cart empty when pay button clicked
    if (name === "" || email === "") {
      enqueueSnackbar("Name and email are required.", {
        variant: "error",
      });
    } else if (!(cart && cart.length > 0)) {
      enqueueSnackbar("Cart is empty.", {
        variant: "error",
      });
    } else {
      // perform checkout process
      addOrderMutation.mutate({
        customerName: name,
        customerEmail: email,
        products: cart,
        totalPrice: calculateTotal(),
        token,
      });
    }
  };

  return (
    <Container maxWidth="lg">
      <Header />
      <Grid
        container
        spacing={4}
        sx={{
          flexDirection: {
            md: "row",
            xs: "column-reverse",
          },
        }}
      >
        <Grid item md={7} xs={12} sx={{ my: { md: 3 } }}>
          <Typography
            variant="h5"
            textAlign="center"
            sx={{
              fontWeight: "bold",
            }}
          >
            Contact Information
          </Typography>

          <Box sx={{ my: 3 }}>
            <Typography>Name</Typography>
            <TextField
              required
              fullWidth
              variant="outlined"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Box>

          <Typography>Email</Typography>
          <TextField
            required
            fullWidth
            variant="outlined"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button
            variant="contained"
            fullWidth
            sx={{ my: 3 }}
            disabled={name === undefined || email === undefined}
            onClick={checkoutHandle}
          >
            Pay Now
          </Button>
        </Grid>

        <Grid item md={5} xs={12} sx={{ my: { md: 5, xs: 1 } }}>
          <Typography sx={{ mb: 3 }}>Your order summary</Typography>
          {cart.map((i) => {
            return (
              <Box
                key={i._id}
                display="flex"
                justifyContent="space-between"
                sx={{ mb: 1 }}
              >
                <Typography>{i.name}</Typography>
                <Typography>${(i.price * i.quantity).toFixed(2)}</Typography>
              </Box>
            );
          })}
          <Box display="flex" justifyContent="space-between">
            <Typography>Total</Typography>
            <Typography>${calculateTotal()}</Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
