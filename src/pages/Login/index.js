import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "notistack";

import {
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Header from "../../components/Header";

import { loginUser } from "../../utils/api_auth";

export default function Login() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log(data);
      enqueueSnackbar("Login successful.", {
        variant: "success",
      });
      navigate("/");
    },
    onError: (error) => {
      enqueueSnackbar(error.response.data.message, {
        variant: "error",
      });
    },
  });

  const loginHandle = (e) => {
    e.preventDefault();
    // form checking
    loginMutation.mutate({
      email,
      password,
    });
  };

  return (
    <Container maxWidth="sm">
      <Header />
      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Grid container spacing={3} sx={{ p: 2 }}>
            <Grid item xs={12}>
              <Typography>Email</Typography>
              <TextField
                required
                fullWidth
                variant="outlined"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography>Password</Typography>
              <TextField
                required
                fullWidth
                variant="outlined"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                style={{
                  textTransform: "capitalize",
                }}
                onClick={loginHandle}
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}
