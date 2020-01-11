import React from "react";
import { Modal, Form, Button, Input, Icon, Select } from "antd";

const { Option } = Select

export default Form.create('add-update-course-form')((props) => {

  const { getFieldDecorator, setFieldsValue, resetFields } = props.form;
  const [loading, setLoading] = React.useState(false);
  const [remoteData, setRemoteData] = React.useState(false)
  const [remoteLoading, setRemoteLoading] = React.useState(true)

  React.useEffect(() => {
    if (props.isUpdate) setFieldsValue(props.defaultValues)
  }, [props.isUpdate])

  React.useEffect(() => {
    setRemoteLoading(true)

    async function loadRemoteData() {
      let remoteData = {}
      let semesterData = await new Promise((resolve, reject) => {
        setTimeout(() => resolve([{ id: 1, name: 'First Semester' }, { id: 2, name: 'Second Semester' }, { id: 3, name: 'Third Semester' }, { id: 4, name: 'Fourth Semester' }]), 5000)
      })
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
          <Form.Item label="semsester" >
            {getFieldDecorator('semester', {
              rules: [
                {
                  required: true,
                  message: 'Please select a semester',
                },
              ],
            })(
              <Select loading={remoteLoading} placeholder='semester' >
                {!remoteLoading && remoteData.semester.map((semesterData) => (<Option key={semesterData.id} value={semesterData.name}>{semesterData.name}</Option>))}
              </Select>
            )}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
)


