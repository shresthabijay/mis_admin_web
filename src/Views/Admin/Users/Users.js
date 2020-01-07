import React from "react";
import "./_content.scss";
import { Button, Tooltip } from "antd";
import Loading from "../../../Components/Loading";
import { getUsers, deleteUser, resetUser } from "../../../api/apiCalls";
import AddUserModal from "./AddUserModal";
import YesNoModal from "../../../Components/YesNoModal/YesNoModal";
import { displayAllError } from "../../../Helpers/helper";

export default function Users() {
  const [state, setState] = React.useState({
    loading: true,
    data: [],
    error: false
  });

  const [showAddUser, setShowAddUser] = React.useState(false);

  const [showDeleteUser, setShowDeleteUser] = React.useState(false);
  const [deleteUserId, setDeleteUserId] = React.useState(false);
  const [deleteLoading, setDeleteLoading] = React.useState(false);

  const [showResetUser, setShowResetUser] = React.useState(false);
  const [resetUserId, setResetUserId] = React.useState(false);
  const [resetLoading, setResetLoading] = React.useState(false);

  const fetchUsers = () => {
    setState({ ...state, loading: true, error: false, data: [] });
    getUsers()
      .then(res => {
        setState({ ...state, loading: false, error: false, data: res });
      })
      .catch(err => {
        setState({
          ...state,
          loading: false,
          error: err.message,
          data: []
        });
      });
  };

  const delUsers = () => {
    setDeleteLoading(true);
    deleteUser(deleteUserId)
      .then(res => {
        setDeleteLoading(false);
        setShowDeleteUser(false);
        fetchUsers();
      })
      .catch(err => {
        setDeleteLoading(false);
        displayAllError(err);
      });
  };

  const rstUser = () => {
    setResetLoading(true);
    resetUser(resetUserId)
      .then(res => {
        setResetLoading(false);
        setShowResetUser(false);
      })
      .catch(err => {
        setResetLoading(false);
        displayAllError(err);
      });
  };

  React.useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line
  }, [true]);

  return (
    <section id="contents">
      <AddUserModal
        visible={showAddUser}
        onCancelPressed={() => {
          setShowAddUser(false);
        }}
        refresh={() => {
          fetchUsers();
        }}
      />
      {/* For delete user  */}
      <YesNoModal
        visible={showDeleteUser}
        loading={deleteLoading}
        title="Confirm Delete User"
        text="Are you sure you want to remove this user?"
        onCancelPressed={() => {
          setShowDeleteUser(false);
        }}
        onOkPressed={() => {
          delUsers();
        }}
      />
      {/* For Reset User Password */}
      <YesNoModal
        visible={showResetUser}
        loading={resetLoading}
        title="Confirm Reset User Password"
        text="Are you sure you want to reset this user password to default?"
        onCancelPressed={() => {
          setShowResetUser(false);
        }}
        onOkPressed={() => {
          rstUser();
        }}
      />
      <br />
      <div className="flex jcsb">
        <h1 className="title"> Users </h1>
        <Button
          onClick={() => {
            setShowAddUser(true);
          }}
          type="primary"
          icon="plus"
        >
          Add Users
        </Button>
      </div>
      <br />
      {state.loading && <Loading />}
      {state.error && <p style={{ color: "red" }}>{state.error}</p>}
      {state.data && state.data.length > 0 && (
        <React.Fragment>
          <div className="contents-table">
            <table cellPadding="0" cellSpacing="0">
              <ContentTableHead />
              <tbody>
                {state.data.map(item => {
                  return (
                    <ContentTableItems
                      onDeletePressed={() => {
                        setDeleteUserId(item.id);
                        setShowDeleteUser(true);
                      }}
                      onResetPressed={() => {
                        setResetUserId(item.id);
                        setShowResetUser(true);
                      }}
                      key={item.id}
                      {...item}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        </React.Fragment>
      )}
    </section>
  );
}

const ContentTableHead = () => {
  return (
    <thead>
      <tr>
        <th style={{ maxWidth: "40px" }}>ID</th>
        <th>Name</th>
        <th>Username</th>
        <th>Phone</th>
        <th>Gender</th>
        <th style={{ maxWidth: "200px" }}>Created At</th>
        <th style={{ maxWidth: "200px" }}>Actions</th>
      </tr>
    </thead>
  );
};

const ContentTableItems = props => {
  return (
    <tr>
      <td>{props.id}</td>
      <td>
        <div>{props.name}</div>
      </td>
      <td>{props.username}</td>
      <td>{props.phone}</td>
      <td>{props.gender}</td>
      <td>{props.created_at}</td>
      <td className="actions">
        <Button
          onClick={() => {
            props.onDeletePressed();
          }}
          shape="circle"
          icon="close"
          size="small"
          type="danger"
        />
        <div className="hgap"></div>
        <Tooltip title="Reset user password">
          <Button
            onClick={() => {
              props.onResetPressed();
            }}
            shape="circle"
            icon="unlock"
            size="small"
            type="primary"
          />
        </Tooltip>
      </td>
    </tr>
  );
};
