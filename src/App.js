import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";

import Home from "./pages/Home";
import ProductAdd from "./pages/ProductAdd";
import ProductEdit from "./pages/ProductEdit";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import PaymentVerify from "./pages/PaymentVerify";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

export default function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={1500}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<ProductAdd />} />
            <Route path="/products/:id" element={<ProductEdit />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/verify-payment" element={<PaymentVerify />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </BrowserRouter>
      </SnackbarProvider>
    </QueryClientProvider>
  );
}
