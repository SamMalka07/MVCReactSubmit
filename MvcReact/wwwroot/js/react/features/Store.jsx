import React, { useEffect, useState } from "react";
import { Button, Table, Icon } from "semantic-ui-react";

const Store = () => {
  const [stores, setStores] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/Store/StoreList")
      .then((response) => response.json())
      .then((data) => {
        setStores(data);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <div>
          <Button primary className="m-t">
            New Store
          </Button>
          <Table striped celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell width={5}>Name</Table.HeaderCell>
                <Table.HeaderCell width={5}>Address</Table.HeaderCell>
                <Table.HeaderCell width={3}>Actions</Table.HeaderCell>
                <Table.HeaderCell width={3}>Actions</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {stores.map((store, index) => (
                <Table.Row key={index}>
                  <Table.Cell>{store.name}</Table.Cell>
                  <Table.Cell>{store.address}</Table.Cell>
                  <Table.Cell>
                    <Button color="yellow">
                      <Icon name="edit" /> Edit
                    </Button>
                  </Table.Cell>
                  <Table.Cell>
                    <Button color="red">
                      <Icon name="trash" />
                      Delete
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      )}
    </>
  );
};

export default Store;
