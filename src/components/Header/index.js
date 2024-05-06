import { Box, Button, Divider, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Header({ type }) {
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
        {type === "cart" ? "Cart" : "Welcome to My Store"}
      </Typography>
      <Box display="flex" justifyContent="center" sx={{ gap: 2, mb: 3 }}>
        <Button variant="contained" component={Link} to="/">
          Home
        </Button>
        <Button variant="contained" component={Link} to="/cart">
          Cart
        </Button>
      </Box>
      <Divider />
    </>
  );
}
