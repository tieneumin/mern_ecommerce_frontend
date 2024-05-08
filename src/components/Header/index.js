import { Link, useLocation } from "react-router-dom";
import { Box, Button, Divider, Typography } from "@mui/material";

export default function Header() {
  const location = useLocation();

  let pageTitle = "Welcome to My Store";
  if (location.pathname === "/cart") {
    pageTitle = "Cart";
  } else if (location.pathname === "/checkout") {
    pageTitle = "Checkout";
  } else if (location.pathname === "/orders") {
    pageTitle = "My Orders";
  }

  return (
    <>
      <Typography
        variant="h4"
        align="center"
        sx={{
          fontWeight: "bold",
          my: 3,
        }}
      >
        {pageTitle}
      </Typography>
      <Box display="flex" justifyContent="center" sx={{ gap: 2 }}>
        <Button
          variant="contained"
          component={Link}
          to="/"
          style={{
            textTransform: "capitalize",
            color: location.pathname === "/" ? "white" : "#0288d1",
            backgroundColor: location.pathname === "/" ? "#0288d1" : "white",
          }}
        >
          Home
        </Button>
        <Button
          variant="contained"
          component={Link}
          to="/cart"
          style={{
            textTransform: "capitalize",
            color: location.pathname === "/cart" ? "white" : "#0288d1",
            backgroundColor:
              location.pathname === "/cart" ? "#0288d1" : "white",
          }}
        >
          Cart
        </Button>
        <Button
          variant="contained"
          component={Link}
          to="/orders"
          style={{
            textTransform: "capitalize",
            color: location.pathname === "/orders" ? "white" : "#0288d1",
            backgroundColor:
              location.pathname === "/orders" ? "#0288d1" : "white",
          }}
        >
          My Orders
        </Button>
      </Box>
      <Divider sx={{ my: 3 }} />
    </>
  );
}
