import React from "react";
import { Modal, Form, Button, Input, Select, Checkbox, InputNumber, Row, Col } from "antd";

const { Option } = Select

export default Form.create('add-update-student-form')((props) => {

  const { getFieldDecorator, setFieldsValue, resetFields, setFields } = props.form;
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
      let semesterData = await new Promise((resolve, reject) => {
        setTimeout(() => resolve([{ id: 1, name: 'semester 1' }, { id: 2, name: 'semester 2' }, { id: 3, name: 'semester 3' }, { id: 4, name: 'semester 4' }]), 5000)
      })
      remoteData.stream = streamData
      remoteData.semester = semesterData
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
        title={props.isUpdate ? 'Update Student' : "Add Student"}
        visible={props.visible}
        maskClosable={false}
        centered
        width={'60vw'}
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
        <Form >
          <Row gutter={[12, 0]}>
            <Col sm={24} lg={12}><Form.Item label='Name'>
              {getFieldDecorator('name', {
                rules: [{ required: true, message: 'Please input name of the stream admin!' }],
              })(
                <Input
                  placeholder="name"
                />,
              )}
            </Form.Item></Col>
            <Col sm={24} lg={12}>
              <Form.Item label='Email'>
                {getFieldDecorator('email', {
                  rules: [
                    { required: true, message: 'Please input an email!' },
                    { type: 'email', message: 'Please enter a valid email!' }],
                })(
                  <Input
                    placeholder="email"
                  />,
                )}
              </Form.Item></Col>
          </Row>
          <Row gutter={[12, 0]}>
            <Col sm={24} lg={12}>
              <Form.Item label='Phone'>
                {getFieldDecorator('phone', {
                  rules: [
                    { required: true, type: 'number' }
                  ],
                })(
                  <InputNumber
                    style={{ width: '100%' }}
                    placeholder="phone"
                  />,
                )}
              </Form.Item>
            </Col>
            <Col sm={24} lg={12}>
              <Form.Item label='Batch'>
                {getFieldDecorator('batch', {
                  rules: [
                    { required: true, message: 'Please enter a batch!', },
                    { type: 'number', message: 'Please enter valid batch!' }],
                })(
                  <InputNumber
                    style={{ width: '100%' }}
                    placeholder="batch"
                  />,
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[12, 0]}>
            <Col sm={24} lg={12}>
              <Form.Item label="Stream" >
                {getFieldDecorator('stream_id', {
                  rules: [
                    {
                      required: true,
                      message: 'Please select a stream',
                    },
                  ],
                })(
                  <Select loading={remoteLoading} placeholder='stream' >
                    {!remoteLoading && remoteData.stream.map((streamData) => (<Option key={streamData.id} value={streamData.id}>{streamData.name}</Option>))}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col sm={24} lg={12}>
              <Form.Item label="Semester" >
                {getFieldDecorator('semester_id', {
                  rules: [
                    {
                      required: true,
                      message: 'Please select a semester',
                    },
                  ],
                })(
                  <Select loading={remoteLoading} placeholder='semester' >
                    {!remoteLoading && remoteData.semester.map((semesterData) => (<Option key={semesterData.id} value={semesterData.id}>{semesterData.name}</Option>))}
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>
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


