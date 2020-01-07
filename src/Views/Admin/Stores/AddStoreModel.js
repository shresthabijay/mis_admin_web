import React from "react";
import { Modal, Input, Form } from "antd";
import { displayAllError } from "../../../Helpers/helper";
import { addStore } from "../../../api/apiCalls";

export default function AddStoreModal(props) {
  const [loading, setLoading] = React.useState(false);
  const [state, setState] = React.useState({
    name: ""
  });

  const addStores = () => {
    setLoading(true);
    addStore(state)
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
        title="Add Store"
        visible={props.visible}
        maskClosable={false}
        centered
        onCancel={() => {
          props.onCancelPressed();
        }}
        onOk={() => {
          addStores();
        }}
        okButtonProps={{ loading: loading }}
        cancelButtonProps={{}}
      >
        <AddStoreForm state={state} setState={setState} />
      </Modal>
    </div>
  );
}

function AddStoreForm(props) {
  return (
    <Form>
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
      </div>
    </Form>
  );
}
