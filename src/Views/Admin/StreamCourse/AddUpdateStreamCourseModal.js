import React from "react";
import { Modal, Form, Button, Input, Select } from "antd";


export default Form.create('add-update-stream-course-form')((props) => {

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
      let courseData = await new Promise((resolve, reject) => {
        setTimeout(() => resolve([{ id: 1, name: 'MATH 201' }, { id: 2, name: 'COAG 505' }, { id: 3, name: 'COMP 702' }, { id: 4, name: 'ENGG 223' }]), 5000)
      })
      let streamData = await new Promise((resolve, reject) => {
        setTimeout(() => resolve([{ id: 1, name: 'Computer' }, { id: 2, name: 'Electrical' }, { id: 3, name: 'Civil' }, { id: 4, name: 'Geomatics' }]), 5000)
      })
      remoteData.course = courseData
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

  return (
    <div>
      <Modal
        title={props.isUpdate ? 'Update Stream Course' : "Add Stream Course"}
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
          <Form.Item label="Course" >
            {getFieldDecorator('course_id', {
              rules: [
                {
                  required: true,
                  message: 'Please select a course',
                },
              ],
            })(
              <Select loading={remoteLoading} placeholder='course' >
                {!remoteLoading && remoteData.course.map((courseData) => (<Select.Option key={courseData.id} value={courseData.id}>{courseData.name}</Select.Option>))}
              </Select>
            )}
          </Form.Item>
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
                {!remoteLoading && remoteData.stream.map((streamData) => (<Select.Option key={streamData.id} value={streamData.id}>{streamData.name}</Select.Option>))}
              </Select>
            )}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
)


