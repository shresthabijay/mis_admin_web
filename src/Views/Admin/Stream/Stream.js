import React from "react"
import { Table, Modal, Tag, Button, Divider } from 'antd'
import AddUpdateStreamModal from "./AddUpdateStreamModal"
import { getStreams, deleteStream, updateStream, addStream } from "../../../api/apiCalls"

export const Stream = () => {
  const [showModal, setShowModal] = React.useState(false)
  const [updateData, setUpdateData] = React.useState(null)
  const [isUpdate, setIsUpdate] = React.useState(false)
  const [tableData, setTableData] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    setIsLoading(true)
    getStreams().then((res) => {
      setTableData(res)
      setIsLoading(false)
    }).catch((err) => {
      setIsLoading(false)
    })
  }, [])

  const handleDelete = async (recordToDelete) => {
    let response = await deleteStream(recordToDelete.id)
    setTableData(tableData.filter(record => (recordToDelete.id !== record.id)))
    return response
  }

  const handleAdd = async (formData) => {
    const response = await addStream({ name: formData.name })
    setTableData([...tableData, formData])
    return response
  }

  const handleUpdate = async (formData) => {
    const response = await updateStream(updateData.id, { name: formData.name })
    setTableData(tableData.map(record => (updateData.id === record.id ? formData : record)))
    return response
  }

  const handleModalCancel = () => {
    setShowModal(false)
    setIsUpdate(false)
    setUpdateData(false)
  }

  const showUpdateModal = (record) => {
    setUpdateData(record)
    setIsUpdate(true)
    setShowModal(true)
  }

  const ActionComponent = ({ record }) => {
    return (< span >
      <Tag className="pointer" color="cyan" onClick={() => { showUpdateModal(record) }}>Update</Tag>
      <Divider type="vertical" />
      <Tag className="pointer" color="red" onClick={() => {
        Modal.confirm({
          title: 'Do you want to delete this stream?',
          content: 'This stream will be deleted',
          onOk: async () => {
            await handleDelete(record)
          },
          onCancel() { },
        })
      }}>Delete</Tag>
    </span >
    )
  }

  const columns = [
    {
      title: 'name',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (<ActionComponent text={text} record={record} />)
    },
  ];

  return (
    <div className="streams-page">
      <AddUpdateStreamModal
        visible={showModal}
        isUpdate={isUpdate}
        defaultValues={updateData}
        handleCancel={handleModalCancel}
        handleAdd={handleAdd}
        handleUpdate={handleUpdate}
      />
      <br />
      <div className="flex jcsb">
        <h1 className="title"> Streams </h1>
        <Button
          type="primary"
          onClick={() => {
            setShowModal(true)
          }}
          icon="plus"
        >
          Add Stream
        </Button>
      </div>
      <br />
      <Table
        bordered
        columns={columns}
        dataSource={tableData.map((record, i) => ({ ...record, key: i + 1 }))}
        loading={isLoading}
        rowKey={record => record.id}
        rowClassName="custom-table-row"
      />
    </div>
  )
}