import { Link, useLocation } from "react-router-dom";
import { Box, Button, Divider, Typography } from "@mui/material";

export default function Header() {
  const location = useLocation();

  let pageTitle;
  switch (location.pathname) {
    case "/cart":
      pageTitle = "Cart";
      break;
    case "/checkout":
      pageTitle = "Checkout";
      break;
    case "/orders":
      pageTitle = "My Orders";
      break;
    case "/login":
      pageTitle = "Login to Your Account";
      break;
    case "/signup":
      pageTitle = "Create a New Account ";
      break;
    default:
      pageTitle = "Welcome to My Store";
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
        <Button
          variant="contained"
          component={Link}
          to="/login"
          style={{
            textTransform: "capitalize",
            color: location.pathname === "/login" ? "white" : "#0288d1",
            backgroundColor:
              location.pathname === "/login" ? "#0288d1" : "white",
          }}
        >
          Login
        </Button>
        <Button
          variant="contained"
          component={Link}
          to="/signup"
          style={{
            textTransform: "capitalize",
            color: location.pathname === "/signup" ? "white" : "#0288d1",
            backgroundColor:
              location.pathname === "/signup" ? "#0288d1" : "white",
          }}
        >
          Sign Up
        </Button>
      </Box>
      <Divider sx={{ my: 3 }} />
    </>
  );
}
