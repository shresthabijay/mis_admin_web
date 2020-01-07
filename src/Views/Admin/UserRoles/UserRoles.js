import React from "react";
import { Button } from "antd";
import { getRoles, getUsers, getStores } from "../../../api/apiCalls";
import AddRoleModal from "./AddRoleModel";
import Loading from "../../../Components/Loading";

export default function UserRole() {
  const [state, setState] = React.useState({
    loading: true,
    data: [],
    error: false
  });
  const [store, setStore] = React.useState(false);
  const [user, setUser] = React.useState(false);
  const [addLoadig, setAddLoading] = React.useState(false);
  const [showAddRole, setShowAddRole] = React.useState(false);

  const getReadyForAddingRole = () => {
    setAddLoading(true);
    Promise.all([getStores(), getUsers()])
      .then(res => {
        setStore(res[0]);
        setUser(res[1]);
        setShowAddRole(true);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setAddLoading(false);
      });
  };

  const fetchRole = () => {
    setState({ ...state, loading: true, error: false, data: [] });
    getRoles()
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

  React.useEffect(() => {
    fetchRole();
    // eslint-disable-next-line
  }, [true]);

  return (
    <section id="contents">
      <br />
      <AddRoleModal
        store={store}
        user={user}
        visible={showAddRole}
        onCancelPressed={() => {
          setShowAddRole(false);
        }}
        refresh={() => {
          fetchRole();
        }}
      />
      <div className="flex jcsb">
        <h1 className="title"> Store User Role </h1>
        <Button
          type="primary"
          loading={addLoadig}
          onClick={() => {
            getReadyForAddingRole();
          }}
          icon="plus"
        >
          Add Role
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
                  return <ContentTableItems key={item.id} {...item} />;
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
        <th>Store Name</th>
        <th>Role</th>
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
      <td>
        <div>{props.username}</div>
      </td>
      <td>
        <div>{props.store_name}</div>
      </td>
      <td>
        <div>{props.role_name}</div>
      </td>
      <td>{props.created_at}</td>
      <td className="actions">
        <Button shape="circle" icon="close" size="small" type="danger" />
      </td>
    </tr>
  );
};
