import React from "react";
import { Modal, Form, Button, Input, Select, Checkbox } from "antd";

const { Option } = Select

export default Form.create('add-update-teacher-form')((props) => {

  const { getFieldDecorator, setFieldsValue, resetFields } = props.form;
  const [loading, setLoading] = React.useState(false);
  const [remoteData, setRemoteData] = React.useState(false)
  const [remoteLoading, setRemoteLoading] = React.useState(true)
  const [showPasswordUpdate, setShowPasswordUpdate] = React.useState(false)

  React.useEffect(() => {
    if (props.isUpdate) setFieldsValue(props.defaultValues)
  }, [props.isUpdate])

  React.useEffect(() => {
    setRemoteLoading(true)

    async function loadRemoteData() {
      let remoteData = {}
      let streamData = await new Promise((resolve, reject) => {
        setTimeout(() => resolve([{ id: 1, name: 'Stream 1' }, { id: 2, name: 'Stream 2' }, { id: 3, name: 'Stream 3' }, { id: 4, name: 'Stream 4' }]), 5000)
      })
      remoteData.stream = streamData
      return remoteData
    }

    loadRemoteData().then((remoteData) => {
      setRemoteData(remoteData)
      setRemoteLoading(false)
    })
  }, [])


  const handleAdd = (e) => {
    e.preventDefault();

    setLoading(true)

    props.form.validateFields((err, values) => {
      if (!err) {
        setTimeout(() => {
          props.handleCancel()
          props.form.resetFields();
          setLoading(false)
        }, 1500)
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
        setTimeout(() => {
          props.handleCancel()
          props.form.resetFields();
          setLoading(false)
        }, 1500)
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

  const togglePasswordUpdate = () => {
    setShowPasswordUpdate(!showPasswordUpdate)
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
          <Form.Item label="Bio" >
            {getFieldDecorator('bio', {
              rules: [
                {
                  required: true,
                  message: 'Please enter a bio',
                },
              ],
            })(
              <Input.TextArea
                placeholder="bio"
                rows={6}
              />,
            )}
          </Form.Item>
          {(!props.isUpdate || (showPasswordUpdate)) &&
            <Form.Item label='Password'>
              {getFieldDecorator('password', {
                rules: [
                  { required: true, message: 'Please enter a password!' },
                ],
              })(
                <Input.Password
                  type='password'
                  placeholder="password"
                />,
              )}
            </Form.Item>
          }
          {props.isUpdate && <Checkbox checked={showPasswordUpdate} onChange={togglePasswordUpdate}>Update Password</Checkbox>}
        </Form>
      </Modal>
    </div>
  );
}
)


