import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";

import {
  Box,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Header from "../../components/Header";

import { getCart, removeCartItem } from "../../utils/api_cart";

export default function Cart() {
  let grandTotal = 0;
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const { data: cart = [] } = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
  });

  const removeCartItemMutation = useMutation({
    mutationFn: removeCartItem,
    onSuccess: () => {
      enqueueSnackbar("Item removed.", {
        variant: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error) => {
      enqueueSnackbar(error.response.data.message, {
        variant: "error",
      });
    },
  });
  const removeCartItemHandle = (id) => {
    const confirm = window.confirm("Remove item from cart?");
    if (confirm) {
      removeCartItemMutation.mutate(id);
    }
  };

  return (
    <Container maxWidth="xl">
      <Header />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>Product</TableCell>
              <TableCell align="right" style={{ fontWeight: "bold" }}>
                Price
              </TableCell>
              <TableCell align="right" style={{ fontWeight: "bold" }}>
                Quantity
              </TableCell>
              <TableCell align="right" style={{ fontWeight: "bold" }}>
                Total
              </TableCell>
              <TableCell align="right" style={{ fontWeight: "bold" }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  Cart is empty.
                </TableCell>
              </TableRow>
            ) : (
              cart.map((i) => {
                const total = i.price * i.quantity;
                grandTotal += total;

                return (
                  <TableRow
                    key={i._id}
                    // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{i.name}</TableCell>
                    <TableCell align="right">$ {i.price}</TableCell>
                    <TableCell align="right">{i.quantity}</TableCell>
                    <TableCell align="right">$ {total.toFixed(2)}</TableCell>
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => removeCartItemHandle(i._id)}
                      >
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
            <TableRow>
              <TableCell
                colSpan={4}
                align="right"
                style={{ fontWeight: "bold" }}
              >
                $ {grandTotal.toFixed(2)}
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box textAlign="right" sx={{ my: 3 }}>
        <Button
          variant="contained"
          disabled={cart.length === 0}
          onClick={() => {
            navigate("/checkout");
          }}
          style={{ marginLeft: "auto" }}
        >
          Checkout
        </Button>
      </Box>
    </Container>
  );
}
