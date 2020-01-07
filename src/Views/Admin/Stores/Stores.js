import React from "react";
import { Button } from "antd";
import { getStores, deleteStore } from "../../../api/apiCalls";
import AddStoreModal from "./AddStoreModel";
import YesNoModal from "../../../Components/YesNoModal/YesNoModal";
import { displayAllError } from "../../../Helpers/helper";
import Loading from "../../../Components/Loading";

export default function Stores() {
  const [state, setState] = React.useState({
    loading: true,
    data: [],
    error: false
  });

  const [showAddStore, setShowAddStore] = React.useState(false);
  const [showDeleteStore, setShowDeleteStore] = React.useState(false);
  const [deleteStoreId, setDeleteStoreId] = React.useState(false);
  const [deleteLoading, setDeleteLoading] = React.useState(false);

  const delStore = () => {
    setDeleteLoading(true);
    deleteStore(deleteStoreId)
      .then(res => {
        setDeleteLoading(false);
        setShowDeleteStore(false);
        fetchStore();
      })
      .catch(err => {
        setDeleteLoading(false);
        displayAllError(err);
      });
  };

  const fetchStore = () => {
    getStores()
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
    fetchStore();
    // eslint-disable-next-line
  }, [true]);

  return (
    <section id="contents">
      <br />
      <AddStoreModal
        visible={showAddStore}
        onCancelPressed={() => {
          setShowAddStore(false);
        }}
        refresh={() => {
          fetchStore();
        }}
      />

      <YesNoModal
        visible={showDeleteStore}
        loading={deleteLoading}
        title="Confirm Delete Store"
        text="Are you sure you want to remove this store?"
        onCancelPressed={() => {
          setShowDeleteStore(false);
        }}
        onOkPressed={() => {
          delStore();
        }}
      />

      <div className="flex jcsb">
        <h1 className="title"> Stores </h1>
        <Button
          type="primary"
          onClick={() => {
            setShowAddStore(true);
          }}
          icon="plus"
        >
          Add Stores
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
                        setDeleteStoreId(item.id);
                        setShowDeleteStore(true);
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
      </td>
    </tr>
  );
};
