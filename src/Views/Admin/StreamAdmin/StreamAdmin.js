import React from "react"
import { Table, Modal, Tag, Button, Divider } from 'antd'
import AddUpdateStreamAdminModal from "./AddUpdateStreamAdminModal"

export const StreamAdmin = () => {
  const [showModal, setShowModal] = React.useState(false)
  const [updateData, setUpdateData] = React.useState(null)
  const [isUpdate, setIsUpdate] = React.useState(false)

  const handleDelete = async (record) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(true), 1000)
    })
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
          title: 'Do you want to delete this stream admin?',
          content: 'This sream admin will be deleted',
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
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      render: text => <a>{text}</a>,
    },
    {
      title: 'name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'stream id',
      dataIndex: 'stream_id',
      key: 'stream_id',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (<ActionComponent text={text} record={record} />)
    },
  ];

  const data = [];

  for (let i = 1; i <= 60; i++) {
    data.push({
      key: i,
      name: 'Raj Koothrapali',
      id: i,
      email: 'raj@bigbangtheory.com',
      stream_id: 50 % i,
    });
  }

  return (
    <div className="courses-page">
      <AddUpdateStreamAdminModal visible={showModal} isUpdate={isUpdate} defaultValues={updateData} handleCancel={handleModalCancel} />
      <br />
      <div className="flex jcsb">
        <h1 className="title"> Stream Admin </h1>
        <Button
          type="primary"
          onClick={() => {
            setShowModal(true)
          }}
          icon="plus"
        >
          Add Stream Admin
        </Button>
      </div>
      <br />
      <Table
        bordered
        columns={columns}
        dataSource={data}
        rowKey={record => record.id}
        rowClassName="custom-table-row"
      />
    </div>
  )
}