import React, { useEffect, useState } from "react";
import MuiDatatable from "mui-datatables";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import UserServices from "../../../services/UserService";
import CustomerContext from "./CustomerContext";
import AddEditCustomer from "./AddEditCustomer";
import Swal from "sweetalert2";

const CustomerList = () => {
  const [users, setUsers] = useState([]);
  // console.log(users);
  const [openDialog, setOpenDialog] = useState(false);
  const [operation, setOperation] = useState("add");
  const [initialUser, setInitialUser] = useState({});

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const loadUsers = (query = "") => {
    UserServices.fetchAllUser(query)
      .then((responce) => {
        setUsers(responce?.data?.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const addUser = () => {
    setInitialUser({});
    setOperation("add");
    setOpenDialog(true);
  }; //Addusers

  const editUser = (user) => {
    setInitialUser(user);
    setOperation("edit");
    setOpenDialog(true);
  }; //editUsers

  const deleteUser = (id) => {
    // console.log("id", id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        UserServices.deleteUser(id)
          .then((res) => {
            loadUsers();
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
          })
          .catch((err) => {
            console.error(err);
            Swal.fire("Not Deleted!", "User has not been deleted.", "error");
          });
      }
    });
  }; //deleteUsers

  const columns = [
    {
      label: "ID",
      name: "userId",
      options: {
        sort: true,
        filter: false,
      },
    },
    {
      label: "Name",
      name: "name",
      options: {
        sort: true,
        filter: false,
        customBodyRenderLite: (index) => {
          const user = users[index];
          return `${user?.name?.first} ${user?.name?.last}`;
        },
      },
    },
    {
      label: "Mobile",
      name: "mobile",
      options: {
        sort: true,
        filter: false,
      },
    },
    {
      label: "Email",
      name: "email",
      options: {
        sort: true,
        filter: false,
      },
    },
    {
      label: "Role",
      name: "role",
      options: {
        sort: false,
        filter: true,
      },
    },
    {
      label: "Status",
      name: "status",
      options: {
        sort: false,
        filter: true,
      },
    },

    {
      label: "Action",
      name: "action",
      options: {
        sort: false,
        filter: false,
        customBodyRenderLite: (index) => {
          const user = users[index];
          // console.log("user of delete", user);
          return (
            <>
              <IconButton color="primary" onClick={() => editUser(user)}>
                <EditIcon />
              </IconButton>
              <IconButton color="error" onClick={() => deleteUser(user._id)}>
                <DeleteIcon />
              </IconButton>
            </>
          );
        },
      },
    },
  ];
  return (
    <>
      <Button variant="contained" color="primary" onClick={addUser}>
        New +
      </Button>
      <MuiDatatable title="User List" data={users} columns={columns} />

      <CustomerContext.Provider
        value={{
          openDialog,
          operation,
          initialUser,
          handleDialogClose,
          loadUsers,
        }}
      >
        <AddEditCustomer />
      </CustomerContext.Provider>
    </>
  );
};

export default CustomerList;
