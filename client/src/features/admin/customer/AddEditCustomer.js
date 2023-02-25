import React, { useContext } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import CustomerContext from "./CustomerContext";
import Dialog from "@mui/material/Dialog";
import CustomerForm from "./CustomerForm";

const AddEditCustomer = () => {
  const { operation, handleDialogClose, openDialog } =
    useContext(CustomerContext);
  return (
    <>
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>{operation == "edit" ? "Edit" : "Add"} User</DialogTitle>
        <DialogContent>
          <CustomerForm />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddEditCustomer;
