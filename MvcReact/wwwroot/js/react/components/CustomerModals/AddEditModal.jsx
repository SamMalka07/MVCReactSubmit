import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "semantic-ui-react";

const AddEditModal = (props) => {
  const { open, onClose, refreshList } = props;
  const [loading, setLoading] = useState(true);

  const [customer, setCustomer] = useState({ Name: "", Address: "" });

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const data = {
    Name: customer.Name,
    Address: customer.Address,
  };

  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(customer),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(customer);

    await fetch("/Customer/Create", options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.status === "success") {
          onClose();
          refreshList();
        } else {
          onClose();
          refreshList();
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <Modal
      size="small"
      open={open}
      onClose={onClose}
      onSubmit={(e) => handleSubmit(e)}
    >
      <Modal.Header>Add Customer</Modal.Header>

      <Modal.Content>
        <Form>
          <Form.Field>
            <label>Name</label>
            <input
              placeholder="Name"
              name="Name"
              value={customer.Name}
              onChange={handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Address</label>
            <input
              placeholder="Address"
              name="Address"
              value={customer.Address}
              onChange={handleChange}
            />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Create</Button>
      </Modal.Actions>
    </Modal>
  );
};

export default AddEditModal;
