import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Icon } from "semantic-ui-react";

const AddModal = (props) => {
  const { open, onClose, refreshList } = props;

  const [product, setProduct] = useState({ Name: "", Price: "" });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  function clearInputs() {
    setProduct({ Name: "", Price: "" });
  }

  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("/Product/Create", options)
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
      <Modal.Header>Create product</Modal.Header>

      <Modal.Content>
        <Form>
          <Form.Field>
            <label>NAME</label>
            <input
              placeholder="Name"
              name="Name"
              value={product.Name}
              onChange={handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Price</label>
            <input
              placeholder="Price"
              name="Price"
              value={product.Price}
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
