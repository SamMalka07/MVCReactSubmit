import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Icon } from "semantic-ui-react";

const EditModal = (props) => {
  const { id, open, onClose, editingTable } = props;
  const [loading, setLoading] = useState(true);

  const [customer, setCustomer] = useState({});

  async function fetchData() {
    await fetch(`/Customer/FindById/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setCustomer(data);
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(customer),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(customer);

    // await fetch("/Customer/SaveCustomer", options)
    //   .then((response) => response.json())
    //   .then((data) => console.log(data))
    //   .catch((error) => console.log(error));

    try {
      const response = await fetch("/Customer/Edit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: {
          Id: customer.id,
          Name: customer.name,
          Address: customer.address,
        },
      });
      if (response.ok) {
        console.log("Successfully Added");
      }
    } catch (error) {}
  };

  return (
    <Modal
      size="small"
      open={open}
      onClose={onClose}
      onSubmit={(e) => handleSubmit(e)}
    >
      <Modal.Header>Edit customer</Modal.Header>
      {loading ? (
        <Modal.Content>Loading...</Modal.Content>
      ) : (
        <>
          <Modal.Content>
            <Form>
              <Form.Field>
                <label>Name</label>
                <input
                  placeholder="Name"
                  name="name"
                  value={customer.name}
                  onChange={handleChange}
                />
              </Form.Field>
              <Form.Field>
                <label>Address</label>
                <input
                  placeholder="Address"
                  name="address"
                  value={customer.address}
                  onChange={handleChange}
                />
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button color="black" onClick={onClose}>
              cancel
            </Button>
            <Button
              color="green"
              icon
              labelPosition="right"
              onClick={handleSubmit}
            >
              edit
              <Icon name="check" />
            </Button>
          </Modal.Actions>
        </>
      )}
    </Modal>
  );
};

export default EditModal;
