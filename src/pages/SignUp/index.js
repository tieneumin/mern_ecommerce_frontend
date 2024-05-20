import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useCookies } from "react-cookie";

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

import { signUpUser } from "../../utils/api_auth";

export default function SignUp() {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["currentUser"]);
  const { enqueueSnackbar } = useSnackbar();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const signUpMutation = useMutation({
    mutationFn: signUpUser,
    onSuccess: (data) => {
      // save current login details in cookies i.e. auto login
      setCookie("currentUser", data, {
        maxAge: 60 * 60 * 24 * 30, // in seconds
      });
      enqueueSnackbar("Account created.", {
        variant: "success",
      });
      navigate("/");
    },
    onError: (error) => {
      // console.log(error);
      enqueueSnackbar(error.response.data.message, {
        variant: "error",
      });
    },
  });

  const signUpHandle = () => {
    if (
      name === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      enqueueSnackbar("All fields are required.", {
        variant: "error",
      });
    } else if (password.length < 8 || confirmPassword.length < 8) {
      enqueueSnackbar("Password must be at least 8 characters.", {
        variant: "error",
      });
    } else if (password !== confirmPassword) {
      enqueueSnackbar("Passwords do not match.", {
        variant: "error",
      });
    } else {
      signUpMutation.mutate({
        name,
        email,
        password,
      });
    }
  };

  return (
    <Container maxWidth="sm">
      <Header />
      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Grid container spacing={3} sx={{ p: 2 }}>
            <Grid item xs={12}>
              <Typography>Name</Typography>
              <TextField
                required
                fullWidth
                variant="outlined"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography>Email</Typography>
              <TextField
                required
                fullWidth
                variant="outlined"
                placeholder="Email"
                type="email"
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
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography>Confirm Password</Typography>
              <TextField
                required
                fullWidth
                variant="outlined"
                placeholder="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                style={{
                  textTransform: "capitalize",
                }}
                onClick={signUpHandle}
              >
                Sign Up
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}
