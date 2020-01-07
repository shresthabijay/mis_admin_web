import React from "react";
import { Modal, Input, Form, Select } from "antd";
import { addUser } from "../../../api/apiCalls";
import { displayAllError } from "../../../Helpers/helper";

export default function AddUserModal(props) {
  const [loading, setLoading] = React.useState(false);
  const [state, setState] = React.useState({
    name: "",
    username: "",
    gender: "Male",
    phone: ""
  });

  const addUsers = () => {
    setLoading(true);
    addUser(state)
      .then(res => {
        props.onCancelPressed();
        props.refresh();
      })
      .catch(err => {
        displayAllError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <Modal
        title="Add User"
        visible={props.visible}
        maskClosable={false}
        centered
        onCancel={() => {
          props.onCancelPressed();
        }}
        onOk={() => {
          addUsers();
        }}
        okButtonProps={{ loading: loading }}
        cancelButtonProps={{}}
      >
        <AddUserForm state={state} setState={setState} />
      </Modal>
    </div>
  );
}

function AddUserForm(props) {
  return (
    <Form>
      <div className="flex jcsb">
        <div>
          <Form.Item label="Name">
            <Input
              placeholder="Name"
              value={props.state.name}
              onChange={e => {
                props.setState({ ...props.state, name: e.target.value });
              }}
            />
          </Form.Item>
          <Form.Item label="Phone">
            <Input
              placeholder="Phone"
              value={props.state.phone}
              onChange={e => {
                props.setState({ ...props.state, phone: e.target.value });
              }}
            />
          </Form.Item>
        </div>
        <div>
          <Form.Item label="Username">
            <Input
              value={props.state.username}
              onChange={e => {
                props.setState({ ...props.state, username: e.target.value });
              }}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item label="Gender">
            <Select
              placeholder="Gender"
              value={props.state.gender}
              onChange={value => {
                props.setState({ ...props.state, gender: value });
              }}
            >
              <Select.Option key="Male">Male</Select.Option>
              <Select.Option key="Female">Female</Select.Option>
            </Select>
          </Form.Item>
        </div>
      </div>
    </Form>
  );
}
