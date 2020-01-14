import React from "react";
import { Modal, Form, Button, Input, Select, InputNumber, Row, Col } from "antd";

const { Option } = Select

export default Form.create('add-update-user-form')((props) => {

  const { getFieldDecorator, setFieldsValue, resetFields, setFields } = props.form;
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
        }).catch((err) => {
          //handle if error
          let errorObj = {}

          Object.keys(err).forEach((fieldName) => {
            errorObj[fieldName] = {
              value: values[fieldName],
              errors: err[fieldName].map(message => (new Error(message)))
            }
          })

          setFields(errorObj)
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
        width='60vw'
        title={props.isUpdate ? 'Update User' : "Add User"}
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
          <Row gutter={[12, 0]}>
            <Col sm={24} lg={props.isUpdate ? 24 : 8}>
              <Form.Item label='Name'>
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: 'Please input name of the teacher!' }],
                })(
                  <Input
                    placeholder="name"
                  />,
                )}
              </Form.Item>
            </Col>
            {!props.isUpdate &&
              <Col sm={24} lg={12}>
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
              </Col>
            }
          </Row>
          <Row gutter={[12, 0]}>
            {!props.isUpdate &&
              <Col sm={24} lg={8}>
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
              </Col>
            }
            <Col sm={24} lg={props.isUpdate ? 12 : 8}>
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
            <Col sm={24} lg={props.isUpdate ? 12 : 8}>
              <Form.Item label="Gender" >
                {getFieldDecorator('gender', {
                  rules: [
                    {
                      required: true,
                      message: 'Please select a gender',
                    },
                  ],
                })(
                  <Select placeholder='gender' >
                    <Option value={'Male'}>Male</Option>
                    <Option value={'Female'}>Female</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
}
)


