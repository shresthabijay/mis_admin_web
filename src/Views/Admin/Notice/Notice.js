import React from "react"
import { Table, Modal, Tag, Button, Divider } from 'antd'
import AddUpdateNoticeModal from "./AddUpdateNoticeModal"
import moment from 'moment'

export const Notice = () => {
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
    setUpdateData({
      ...record,
      timestamp: moment(record.timestamp),
      attachment: [{
        uid: '-1',
        name: 'lastUpload.png',
        status: 'done',
        url: record.attachment,
        thumbUrl: record.attachment,
      },]
    })
    setIsUpdate(true)
    setShowModal(true)
  }

  const ActionComponent = ({ record }) => {
    return (< span >
      <Tag className="pointer" color="cyan" onClick={() => { showUpdateModal(record) }}>Update</Tag>
      <Divider type="vertical" />
      <Tag className="pointer" color="red" onClick={() => {
        Modal.confirm({
          title: 'Do you want to delete this notice?',
          content: 'This notice will be deleted',
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
      width: 50,
      render: text => <a>{text}</a>,
    },
    {
      title: 'title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'body',
      dataIndex: 'body',
      key: 'body',
      ellipsis: true,
    },
    {
      title: 'stream',
      dataIndex: 'stream_id',
      key: 'stream_id',
    },
    {
      title: 'timestamp',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: (timestamp) => <div>{moment(timestamp).format('YYYY/MM/DD')}</div>
    },
    {
      title: 'attachment',
      dataIndex: 'attachment',
      key: 'attachment',
      ellipsis: true,
      render: (text) => <a target='_blank' href={text}>{text}</a>
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
      title: 'Notice',
      id: i,
      body: 'Consectetur dolor pariatur aliqua ipsum nostrud adipisicing elit Lorem id fugiat commodo nostrud occaecat. Quis elit nulla labore ipsum culpa in nulla qui. Irure Lorem ipsum cupidatat in dolor eiusmod velit sunt do commodo.',
      stream_id: 1,
      timestamp: moment().format(),
      attachment: 'https://base.imgix.net/files/base/ebm/industryweek/image/2019/11/industryweek_36565_elon_musk_with_cybertruck_frederic_j._brown_afp_via_getty_images.png?auto=format&fit=crop&h=432&w=768'
    });
  }

  return (
    <div className="notice-page">
      <AddUpdateNoticeModal visible={showModal} isUpdate={isUpdate} defaultValues={updateData} handleCancel={handleModalCancel} />
      <br />
      <div className="flex jcsb">
        <h1 className="title"> Notice </h1>
        <Button
          type="primary"
          onClick={() => {
            setShowModal(true)
          }}
          icon="plus"
        >
          Add Student
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