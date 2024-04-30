import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";

export default function ProductCard(props) {
  const { name, price, category } = props.product;

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{name}</Typography>
        <Box display="flex" justifyContent="space-between" sx={{ my: 3 }}>
          <Chip label={price} color="success" />
          <Chip label={category} color="warning" />
        </Box>
        <Button variant="contained" color="primary" fullWidth>
          Add To Cart
        </Button>
        {/* user === "admin" if-statement goes here */}
        <Box display="flex" justifyContent="space-between" sx={{ mt: 3 }}>
          <Button variant="contained" color="info">
            Edit
          </Button>
          <Button variant="contained" color="error">
            Delete
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
