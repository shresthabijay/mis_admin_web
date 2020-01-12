import React from "react";
import { Modal, Form, Button, Input, Select, Upload, Icon, Row, Col, DatePicker } from "antd";

const { Option } = Select

export default Form.create('add-update-student-form')((props) => {

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

  const handleFileAdd = (e) => {
    return e.fileList.slice(-1)
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
            <Col sm={24} lg={8}><Form.Item label='title'>
              {getFieldDecorator('title', {
                rules: [{ required: true, message: 'Please input a title!' }],
              })(
                <Input
                  placeholder="title"
                />,
              )}
            </Form.Item></Col>
            <Col sm={24} lg={8}>
              <Form.Item label='timestamp'>
                {getFieldDecorator('timestamp', {
                  rules: [
                    { required: true, message: 'Please input a timestamp' }
                  ],
                })(
                  <DatePicker style={{ width: '100%' }} placeholder='date' />
                )}
              </Form.Item>
            </Col>
            <Col sm={24} lg={8}>
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
          </Row>
          <Form.Item label='body'>
            {getFieldDecorator('body', {
              rules: [
                { required: true }
              ],
            })(
              <Input.TextArea
                rows={6}
                placeholder="body"
              />,
            )}
          </Form.Item>
          <Form.Item label="attachment">
            {getFieldDecorator('attachment', {
              valuePropName: 'fileList',
              getValueFromEvent: handleFileAdd,
              rules: [{ required: true }]
            })(
              <Upload.Dragger style={{ height: '40px' }} onChange={handleFileAdd} listType='picture' name="files" multiple={false} beforeUpload={() => false}>
                <p className="ant-upload-drag-icon" style={{ height: '30px' }}>
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
              </Upload.Dragger>
            )}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
)


