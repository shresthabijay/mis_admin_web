import React from "react";
import { Modal, Form, Button, Input, Select, Checkbox } from "antd";

const { Option } = Select

export default Form.create('add-update-teacher-form')((props) => {

  const { getFieldDecorator, setFieldsValue, resetFields } = props.form;
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (props.isUpdate) setFieldsValue(props.defaultValues)
  }, [props.isUpdate])

  const handleAdd = (e) => {
    e.preventDefault();

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
    e.preventDefault();

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
        title={props.isUpdate ? 'Update Teacher' : "Add Teacher"}
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
          <Form.Item label='Name'>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Please input name of the teacher!' }],
            })(
              <Input
                placeholder="name"
              />,
            )}
          </Form.Item>
          <Form.Item label='Email'>
            {getFieldDecorator('email', {
              rules: [
                { required: true, message: 'Please input an email !' },
                { type: 'email', message: 'Please enter a valid email!' }],
            })(
              <Input
                placeholder="email"
              />,
            )}
          </Form.Item>
          <Form.Item label="Username" >
            {getFieldDecorator('username', {
              rules: [
                {
                  required: true,
                },
              ],
            })(
              <Input
                placeholder="username"
              />,
            )}
          </Form.Item>
          <Form.Item label="type" >
            {getFieldDecorator('type', {
              rules: [
                {
                  required: true,
                },
              ],
            })(
              <Input
                placeholder="type"
              />,
            )}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
)


