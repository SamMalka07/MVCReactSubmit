import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Icon } from "semantic-ui-react";

const EditModal = (props) => {
  const { id, open, onClose, editingTable } = props;
  const [loading, setLoading] = useState(true);

  const [product, setProduct] = useState({});

  async function fetchData() {
    await fetch(`/Product/FindById/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(product);

    try {
      const response = await fetch("/Product/Edit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: {
          Id: product.id,
          Name: product.name,
          Address: product.price,
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
      <Modal.Header>Edit product</Modal.Header>
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
                  value={product.name}
                  onChange={handleChange}
                />
              </Form.Field>
              <Form.Field>
                <label>Price</label>
                <input
                  placeholder="Price"
                  name="price"
                  value={product.price}
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
