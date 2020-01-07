import React from "react";
import { Modal } from "antd";

export default function YesNoModal(props) {
  return (
    <div>
      <Modal
        title={props.title || "Confirm Action"}
        visible={props.visible}
        maskClosable={false}
        centered
        onCancel={() => {
          props.onCancelPressed();
        }}
        onOk={() => {
          props.onOkPressed();
        }}
        okButtonProps={{ loading: props.loading }}
        cancelButtonProps={{}}
      >
        <p>{props.text || "Are you sure you want to perform this action ?"}</p>
      </Modal>
    </div>
  );
}
