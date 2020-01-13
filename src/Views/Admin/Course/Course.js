import React from "react"
import { Table, Modal, Tag, Button, Divider } from 'antd'
import AddUpdateCourseModal from "./AddUpdateCourseModal"
import { getCourses, addCourse, updateCourse, deleteCourse } from "../../../api/apiCalls"

export const Course = () => {
  const [showModal, setShowModal] = React.useState(false)
  const [updateData, setUpdateData] = React.useState(null)
  const [isUpdate, setIsUpdate] = React.useState(false)
  const [tableData, setTableData] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    setIsLoading(true)
    getCourses().then((res) => {
      setTableData(res)
      setIsLoading(false)
    }).catch((err) => {
      setIsLoading(false)
    })
  }, [])

  const handleDelete = async (recordToDelete) => {
    let response = await deleteCourse(recordToDelete.id)
    setTableData(tableData.filter(record => (recordToDelete.id !== record.id)))
    return response
  }

  const handleAdd = async (formData) => {
    const response = await addCourse({ name: formData.name })
    setTableData([...tableData, formData])
    return response
  }

  const handleUpdate = async (formData) => {
    const response = await updateCourse(updateData.id, { name: formData.name })
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
          title: 'Do you want to delete this course?',
          content: 'This course will be deleted',
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
    },
    {
      title: 'course code',
      dataIndex: 'course_code',
      key: 'course_code',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (<ActionComponent text={text} record={record} />)
    },
  ];

  return (
    <div className="courses-page">
      <AddUpdateCourseModal
        visible={showModal}
        isUpdate={isUpdate}
        defaultValues={updateData}
        handleAdd={handleAdd}
        handleUpdate={handleUpdate}
        handleCancel={handleModalCancel}
      />
      <br />
      <div className="flex jcsb">
        <h1 className="title"> Courses </h1>
        <Button
          type="primary"
          onClick={() => {
            setShowModal(true)
          }}
          icon="plus"
        >
          Add Course
        </Button>
      </div>
      <br />
      <Table
        bordered
        columns={columns}
        dataSource={tableData.map((record, i) => ({ ...record, key: i }))}
        loading={isLoading}
        rowClassName="custom-table-row"
      />
    </div>
  )
}