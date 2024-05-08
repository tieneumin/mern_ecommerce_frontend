import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";

import {
  Button,
  Container,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Header from "../../components/Header";

import { getOrders, deleteOrder, updateOrder } from "../../utils/api_orders";

export default function Orders() {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const { data: orders = [] } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });

  const deleteOrderMutation = useMutation({
    mutationFn: deleteOrder,
    onSuccess: () => {
      enqueueSnackbar("Order deleted.", {
        variant: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (error) => {
      enqueueSnackbar(error.response.data.message, {
        variant: "error",
      });
    },
  });
  const deleteOrderHandle = (id) => {
    const confirm = window.confirm("Delete order?");
    if (confirm) {
      deleteOrderMutation.mutate(id);
    }
  };

  const updateOrderMutation = useMutation({
    mutationFn: updateOrder,
    onSuccess: () => {
      enqueueSnackbar("Order status updated.", {
        variant: "success",
      });
      queryClient.setQueryData({ queryKey: ["orders"] });
    },
    onError: (error) => {
      enqueueSnackbar(error.response.data.message, {
        variant: "error",
      });
    },
  });
  const updateOrderHandle = (order, status) => {
    updateOrderMutation.mutate({ ...order, status: status });
  };

  return (
    <Container maxWidth="xl">
      <Header />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>Customer</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Product(s)</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Total Amount</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Status</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Payment Date</TableCell>
              <TableCell align="right" style={{ fontWeight: "bold" }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6}>No orders exist.</TableCell>
              </TableRow>
            ) : (
              orders.map((o) => {
                return (
                  <TableRow
                    key={o._id}
                    // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>
                      <Typography>{o.customerName}</Typography>
                      <Typography>({o.customerEmail})</Typography>
                    </TableCell>
                    <TableCell>
                      {o.products.map((p) => (
                        <Typography
                          key={p._id}
                        >{`${p.name} (${p.quantity})`}</Typography>
                      ))}
                    </TableCell>
                    <TableCell>{o.totalPrice}</TableCell>
                    <TableCell>
                      <Select
                        sx={{ width: "125px" }}
                        value={o.status}
                        disabled={o.status === "pending"}
                        onChange={(e) => updateOrderHandle(o, e.target.value)}
                      >
                        <MenuItem value="pending">Pending</MenuItem>
                        <MenuItem value="paid">Paid</MenuItem>
                        <MenuItem value="failed">Failed</MenuItem>
                        <MenuItem value="completed">Completed</MenuItem>
                      </Select>
                    </TableCell>
                    <TableCell>{o.paidAt}</TableCell>
                    <TableCell align="right">
                      {o.status !== "pending" ? (
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => deleteOrderHandle(o._id)}
                        >
                          Delete
                        </Button>
                      ) : null}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
