import React from "react";
import { Modal, Form, Button, Input, Icon } from "antd";

export default Form.create('add-update-stream-form')((props) => {

  const { getFieldDecorator, setFieldsValue, resetFields } = props.form;
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (props.isUpdate) setFieldsValue(props.defaultValues)
  }, [props.isUpdate])


  const handleAdd = (e) => {
    setLoading(true)
    props.form.validateFields((err, values) => {
      if (!err) {
        props.handleAdd(values).then(() => {
          handleCancel()
          resetFields()
          setLoading(false)
        }).catch(() => {
          //handle if error
          setLoading(false)
        })
      }
      else {
        setLoading(false)
      }
    });
  }

  const handleUpdate = (e) => {
    setLoading(true)
    props.form.validateFields((err, values) => {
      if (!err) {
        props.handleUpdate(values).then(() => {
          handleCancel()
          resetFields()
          setLoading(false)
        }).catch(() => {
          //handle if error
          setLoading(false)
        })
      }
      else {
        setLoading(false)
      }
    });
  }

  const handleCancel = () => {
    resetFields()
    props.handleCancel()
  }

  return (
    <div>
      <Modal
        title={props.isUpdate ? 'Update Stream' : "Add Stream"}
        visible={props.visible}
        maskClosable={false}
        centered
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" disabled={loading} onClick={handleCancel}>
            Cancel
            </Button>,
          <Button key="add" type="primary" loading={loading} onClick={props.isUpdate ? handleUpdate : handleAdd}>
            {props.isUpdate ? 'Update' : 'Add'}
          </Button>,
        ]}
      >
        <Form>
          <Form.Item label='Stream name'>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Please input name of the stream!' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Stream name"
              />,
            )}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
)
