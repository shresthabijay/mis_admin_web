import React from "react";
import { Modal, Form, Button, Input, Icon, Select } from "antd";

const { Option } = Select

export default Form.create('add-update-course-form')((props) => {

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
          <Form.Item label='Course code'>
            {getFieldDecorator('course_code', {
              rules: [{ required: true, message: 'Please input course code of the course!' }],
            })(
              <Input
                placeholder="course code"
              />,
            )}
          </Form.Item>
          <Form.Item label='Course name'>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Please input name of the course!' }],
            })(
              <Input
                placeholder="course name"
              />,
            )}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
)


