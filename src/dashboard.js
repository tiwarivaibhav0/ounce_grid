/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Grid, Modal } from "@cedcommerce/ounce-ui";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [modal, setModal] = useState(false);
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem("apiKey") === null) navigate("/");
    else
      fetch("https://jsonplaceholder.typicode.com/users")
        .then((res) => res.json())
        .then((data) => setUsers(data));
    setLoading(false);
  }, []);

  const seeDetails = (id) => {
    users.map((item) => {
      if (item.id === id)
        setDetails([
          {
            title: "Name",
            val: item.name,
          },
          {
            title: "Username",
            val: item.username,
          },
          {
            title: "Address",
            val:
              item.address.street +
              "," +
              item.address.city +
              "," +
              item.address.zipcode,
          },
          {
            title: "Phone",
            val: item.phone,
          },
          {
            title: "Company",
            val: item.company.name,
          },
        ]);
      return 0;
    });
    setModal(true);
  };
  return (
    <div>
      <Grid
        bordered
        loading={loading}
        columns={[
          {
            align: "center",
            dataIndex: "name",
            key: "name",
            title: "Name",
            width: 100,
          },
          {
            align: "center",
            dataIndex: "email",
            key: "email",
            title: "Email",
            width: 100,
          },
          {
            align: "center",
            dataIndex: "website",
            key: "website",
            title: "Website",
            width: 100,
          },
          {
            align: "center",
            dataIndex: "id",
            key: "actions",
            title: "Actions",
            width: 100,
            render: (id) => (
              <Button type="Secondary" onClick={() => seeDetails(id)}>
                View
              </Button>
            ),
          },
        ]}
        dataSource={users}
      />
      <Modal
        close={() => setModal(false)}
        heading="Details of the User "
        open={modal}
      >
        <Grid
          columns={[
            {
              align: "center",
              dataIndex: "title",
              key: "title",
              width: 100,
            },
            {
              align: "center",
              dataIndex: "val",
              key: "val",
            },
          ]}
          bordered
          dataSource={details}
        />
      </Modal>
    </div>
  );
}

export default Dashboard;
