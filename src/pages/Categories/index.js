import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useCookies } from "react-cookie";

import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import Header from "../../components/Header";

import {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../../utils/api_categories";

export default function Categories() {
  const queryClient = useQueryClient();
  const [cookies] = useCookies(["currentUser"]);
  const { currentUser = {} } = cookies;
  const { token } = currentUser;
  const { enqueueSnackbar } = useSnackbar();

  const [name, setName] = useState("");
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editCategoryName, setEditCategoryName] = useState("");
  const [editCategoryID, setEditCategoryID] = useState("");

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const addCategoryMutation = useMutation({
    mutationFn: addCategory,
    onSuccess: () => {
      enqueueSnackbar("Category added.", {
        variant: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      setName("");
    },
    onError: (error) => {
      enqueueSnackbar(error.response.data.message, {
        variant: "error",
      });
    },
  });
  const addCategoryHandle = () => {
    if (name === "") {
      enqueueSnackbar("Category name is required.", {
        variant: "error",
      });
    } else {
      addCategoryMutation.mutate({ name, token });
    }
  };

  const deleteCategoryMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      enqueueSnackbar("Category deleted.", {
        variant: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error) => {
      enqueueSnackbar(error.response.data.message, {
        variant: "error",
      });
    },
  });
  const deleteCategoryHandle = (_id) => {
    const confirm = window.confirm("Delete category?");
    if (confirm) {
      deleteCategoryMutation.mutate({ _id, token });
    }
  };

  const updateCategoryMutation = useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      enqueueSnackbar("Category updated.", {
        variant: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      // close modal
      setOpenEditModal(false);
    },
    onError: (error) => {
      enqueueSnackbar(error.response.data.message, {
        variant: "error",
      });
    },
  });

  return (
    <Container>
      <Header />
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          mt: 5,
        }}
      >
        Categories
      </Typography>
      <Divider />
      <Box display="flex" sx={{ my: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          label="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button variant="contained" onClick={addCategoryHandle}>
          Add
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold", width: "70%" }}>
                Name
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.length === 0 ? (
              <TableRow>
                <TableCell colSpan={2} align="center">
                  No categories exist.
                </TableCell>
              </TableRow>
            ) : (
              categories.map((c) => (
                <TableRow
                  key={c._id}
                  // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{c.name}</TableCell>
                  <TableCell>
                    <Box display="flex" sx={{ gap: 1 }}>
                      <Button
                        variant="contained"
                        onClick={() => {
                          // open edit modal
                          setOpenEditModal(true);
                          // set edit field value to corresponding row value
                          setEditCategoryName(c.name);
                          // set edit category id
                          setEditCategoryID(c._id);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => deleteCategoryHandle(c._id)}
                      >
                        Delete
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* edit modal; onClose closes modal when periphery clicked */}
      <Dialog open={openEditModal} onClose={() => setOpenEditModal(false)}>
        <DialogTitle>Edit Category</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            variant="outlined"
            sx={{ width: "100%", marginTop: "15px" }}
            value={editCategoryName}
            onChange={(e) => setEditCategoryName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditModal(false)}>Cancel</Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              updateCategoryMutation.mutate({
                _id: editCategoryID,
                name: editCategoryName,
                token,
              });
            }}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
