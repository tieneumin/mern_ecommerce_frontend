import { useLocation, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Box, Button, Divider, Typography } from "@mui/material";
import { emptyCart } from "../../utils/api_cart";

export default function Header() {
  const [cookies, setCookie, removeCookie] = useCookies(["currentUser"]);
  const { currentUser = {} } = cookies;
  const { role } = currentUser;
  const location = useLocation();
  const navigate = useNavigate();

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

  const handleLogout = () => {
    // remove currentUser cookie
    removeCookie("currentUser");
    // empty cart
    emptyCart();
    // redirect to home/login
    navigate("/login");
  };

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
      <Box display="flex" justifyContent="space-between">
        <Box display="flex" sx={{ gap: 2 }}>
          <Button
            variant="contained"
            style={{
              textTransform: "capitalize",
              color: location.pathname === "/" ? "white" : "#0288d1",
              backgroundColor: location.pathname === "/" ? "#0288d1" : "white",
            }}
            onClick={() => navigate("/")}
          >
            Home
          </Button>
          <Button
            variant="contained"
            style={{
              textTransform: "capitalize",
              color: location.pathname === "/cart" ? "white" : "#0288d1",
              backgroundColor:
                location.pathname === "/cart" ? "#0288d1" : "white",
            }}
            onClick={() => navigate("/cart")}
          >
            Cart
          </Button>
          <Button
            variant="contained"
            style={{
              textTransform: "capitalize",
              color: location.pathname === "/orders" ? "white" : "#0288d1",
              backgroundColor:
                location.pathname === "/orders" ? "#0288d1" : "white",
            }}
            onClick={() => navigate("/orders")}
          >
            My Orders
          </Button>
          {role === "admin" ? (
            <Button
              variant="contained"
              style={{
                textTransform: "capitalize",
                color:
                  location.pathname === "/categories" ? "white" : "#0288d1",
                backgroundColor:
                  location.pathname === "/categories" ? "#0288d1" : "white",
              }}
              onClick={() => navigate("/categories")}
            >
              Categories
            </Button>
          ) : null}
        </Box>
        <Box display="flex" alignItems="center" sx={{ gap: 2 }}>
          {role ? (
            <>
              <span>Current User: {currentUser.name}</span>
              <Button
                variant="contained"
                style={{
                  textTransform: "capitalize",
                  color: "#0288d1",
                  backgroundColor: "white",
                }}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="contained"
                style={{
                  textTransform: "capitalize",
                  color: location.pathname === "/login" ? "white" : "#0288d1",
                  backgroundColor:
                    location.pathname === "/login" ? "#0288d1" : "white",
                }}
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
              <Button
                variant="contained"
                style={{
                  textTransform: "capitalize",
                  color: location.pathname === "/signup" ? "white" : "#0288d1",
                  backgroundColor:
                    location.pathname === "/signup" ? "#0288d1" : "white",
                }}
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </Button>
            </>
          )}
        </Box>
      </Box>
      {location.pathname === "/categories" ? null : <Divider sx={{ my: 3 }} />}
    </>
  );
}
