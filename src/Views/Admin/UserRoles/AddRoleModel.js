import React from "react";
import { Modal, Form, Select } from "antd";
import { displayAllError } from "../../../Helpers/helper";
import { assignRoles } from "../../../api/apiCalls";

export default function AddRoleModal(props) {
  const [loading, setLoading] = React.useState(false);
  const [state, setState] = React.useState({
    user_id: 0,
    role: 1,
    store_id: 0
  });

  const submitRole = () => {
    setLoading(true);
    assignRoles(state)
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
        title="Add User Role"
        visible={props.visible}
        maskClosable={false}
        centered
        onCancel={() => {
          props.onCancelPressed();
        }}
        onOk={() => {
          submitRole();
        }}
        okButtonProps={{ loading: loading }}
        cancelButtonProps={{}}
      >
        <AddStoreForm
          state={state}
          store={props.store}
          user={props.user}
          setState={setState}
        />
      </Modal>
    </div>
  );
}

function AddStoreForm(props) {
  return (
    <Form>
      <div>
        {props.user && props.user.length > 0 && (
          <Form.Item label="User">
            <Select
              placeholder="User"
              //   value={props.state.user_id}
              onChange={value => {
                props.setState({ ...props.state, user_id: parseInt(value) });
              }}
            >
              {props.user.map(item => {
                return (
                  <Select.Option key={item.id} value={item.id}>
                    {item.name}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
        )}

        {props.store && props.store.length > 0 && (
          <Form.Item label="Store">
            <Select
              placeholder="Store"
              //   defaultValue={props.store[0].id}
              onChange={value => {
                props.setState({ ...props.state, store_id: parseInt(value) });
              }}
            >
              {props.store.map(item => {
                return (
                  <Select.Option key={item.id} value={item.id}>
                    {item.name}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
        )}

        <Form.Item label="Role">
          <Select
            placeholder="Role"
            defaultValue={1}
            onChange={value => {
              props.setState({ ...props.state, role: parseInt(value) });
            }}
          >
            <Select.Option key={1} value={1}>
              Admin
            </Select.Option>
            <Select.Option key={2} value={2}>
              Staff
            </Select.Option>
            <Select.Option key={3} value={3}>
              Vat User
            </Select.Option>
          </Select>
        </Form.Item>
      </div>
    </Form>
  );
}
