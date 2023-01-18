import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Icon } from "semantic-ui-react";

const AddModal = (props) => {
  const { open, onClose, refreshList } = props;

  const [customer, setCustomer] = useState({ Name: "", Address: "" });

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  function clearInputs() {
    setCustomer({ Name: "", Address: "" });
  }

  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(customer),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("/Customer/Create", options)
      .then((response) => response.json())
      .then((data) => {
        clearInputs();
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
      <Modal.Header>Create customer</Modal.Header>

      <Modal.Content>
        <Form>
          <Form.Field>
            <label>NAME</label>
            <input
              placeholder="Name"
              name="Name"
              value={customer.Name}
              onChange={handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>ADDRESS</label>
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
        <Button color="black" onClick={onClose}>
          cancel
        </Button>

        <Button color="green" icon labelPosition="right" onClick={handleSubmit}>
          create
          <Icon name="check" />
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default AddModal;
