import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";

import {
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

import { getCart, deleteCartItem } from "../../utils/api_cart";

export default function Cart() {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  let grandTotal = 0;

  const { data: cart = [] } = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
  });

  const deleteCartItemMutation = useMutation({
    mutationFn: deleteCartItem,
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
  const deleteCartItemHandle = (id) => {
    const confirm = window.confirm("Remove cart item?");
    if (confirm) {
      deleteCartItemMutation.mutate(id);
    }
  };

  return (
    <Container maxWidth="xl">
      <Header type="cart" />
      <TableContainer component={Paper} sx={{ mt: 5 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Total</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart.length === 0 ? (
              <TableRow>
                <TableCell>No product added yet!</TableCell>
              </TableRow>
            ) : (
              cart.map((p) => {
                const total = p.price * p.quantity;
                grandTotal += total;
                return (
                  <TableRow
                    key={p._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {p.name}
                    </TableCell>
                    <TableCell align="right">$ {p.price}</TableCell>
                    <TableCell align="right">{p.quantity}</TableCell>
                    <TableCell align="right">$ {total}</TableCell>
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => deleteCartItemHandle(p._id)}
                      >
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
            {cart.length !== 0 ? (
              <TableRow>
                <TableCell></TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right" style={{ fontWeight: "bold" }}>
                  $ {grandTotal}
                </TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}