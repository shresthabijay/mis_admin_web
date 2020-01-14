import React from "react"
import { Table, Modal, Tag, Button, Divider } from 'antd'
import AddUpdateUserModal from "./AddUpdateUserModal"
import { deleteUser, addUser, getUsers, resetUserPassword, updateUser } from "../../../api/apiCalls"

export const User = () => {
  const [showModal, setShowModal] = React.useState(false)
  const [updateData, setUpdateData] = React.useState(null)
  const [isUpdate, setIsUpdate] = React.useState(false)
  const [tableData, setTableData] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    setIsLoading(true)
    getUsers().then((res) => {
      setTableData(res)
      setIsLoading(false)
    }).catch((err) => {
      setIsLoading(false)
    })
  }, [])

  const handleDelete = async (recordToDelete) => {
    let response = await deleteUser(recordToDelete.id)
    setTableData(tableData.filter(record => (recordToDelete.id !== record.id)))
    return response
  }

  const handleAdd = async (formData) => {
    const response = await addUser(formData)
    setTableData([...tableData, formData])
    return response
  }

  const handleUpdate = async (formData) => {
    const response = await updateUser(updateData.id, formData)
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
    return (
      <span>
        <Tag className="pointer" color="cyan" onClick={() => { showUpdateModal(record) }}>Update</Tag>
        <Divider type="vertical" />
        <Tag
          className="pointer"
          color="cyan"
          onClick={
            () =>
              Modal.confirm({
                title: 'Do you want to reset this users password?',
                content: 'This users password will reset',
                onOk: async () => {
                  await resetUserPassword({ user_id: record.id })
                },
                onCancel() { },
              })
          }
        >
          Reset Password
        </Tag>
        <Divider type="vertical" />
        <Tag className="pointer" color="red" onClick={() => {
          Modal.confirm({
            title: 'Do you want to delete this user?',
            content: 'This user will be deleted',
            onOk: async () => {
              await handleDelete(record)
            },
            onCancel() { },
          })
        }}>Delete</Tag>
      </span>
    )
  }

  const columns = [
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
      title: 'username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'gender',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (<ActionComponent text={text} record={record} />)
    },
  ];

  return (
    <div className="courses-page">
      <AddUpdateUserModal
        visible={showModal}
        isUpdate={isUpdate}
        defaultValues={updateData}
        handleAdd={handleAdd}
        handleUpdate={handleUpdate}
        handleCancel={handleModalCancel}
      />
      <br />
      <div className="flex jcsb">
        <h1 className="title"> User </h1>
        <Button
          type="primary"
          onClick={() => {
            setShowModal(true)
          }}
          icon="plus"
        >
          Add User
        </Button>
      </div>
      <br />
      <Table
        bordered
        columns={columns}
        dataSource={tableData.map((record, i) => ({ ...record, phone: parseInt(record.phone), key: i }))}
        rowKey={record => record.id}
        isLoading={isLoading}
        rowClassName="custom-table-row"
      />
    </div>
  )
}