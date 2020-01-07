import React from "react";
import Loading from "../../../Components/Loading";
import { getMyStores, getStoreSupplier } from "../../../api/apiCalls";
import { Select, Button, Spin } from "antd";
import { Link } from "react-router-dom";

export default function StoreSupplier() {
  const [state, setState] = React.useState({
    loading: false,
    data: [],
    error: false
  });

  const [storeState, setStoreState] = React.useState({
    loading: true,
    data: [],
    error: false
  });

  const fetchStore = () => {
    setStoreState({ ...state, loading: true, error: false, data: [] });
    getMyStores()
      .then(res => {
        setStoreState({ ...state, loading: false, error: false, data: res });
        setState({
          ...state,
          loading: false,
          error: "Please select any store first to get suppliers",
          data: []
        });
      })
      .catch(err => {
        setStoreState({
          ...state,
          loading: false,
          error: false,
          data: []
        });
        setState({
          ...state,
          loading: false,
          error: err.message,
          data: []
        });
      });
  };

  const fetchSupplier = id => {
    setState({ ...state, loading: true, error: false, data: [] });
    getStoreSupplier(id)
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
      <div className="flex jcsb">
        <div className="flex ci">
          <h1 className="title"> Store Supplier </h1>
          <div className="hgap"></div>
          {storeState.loading && <Spin size="small" />}
          {storeState.error && (
            <p style={{ color: "red" }}>{storeState.error}</p>
          )}
          {storeState.data && storeState.data.length > 0 && (
            <SelectForStore
              onSelectChange={fetchSupplier}
              data={storeState.data}
            />
          )}
        </div>
        <div>
          <Link to="/store_user/add_supplier">
            <Button type="primary" icon="plus">
              Add Supplier
            </Button>
          </Link>
        </div>
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

const SelectForStore = props => {
  return (
    <Select
      style={{ minWidth: "200px" }}
      placeholder="Select Store"
      onChange={value => {
        props.onSelectChange(value);
      }}
    >
      {props.data.map(item => {
        return (
          <Select.Option key={item.id} value={item.id}>
            {item.name}
          </Select.Option>
        );
      })}
    </Select>
  );
};

const ContentTableHead = () => {
  return (
    <thead>
      <tr>
        <th style={{ maxWidth: "40px" }}>ID</th>
        <th>Organization Name</th>
        <th>Pan Number</th>
        <th>Address</th>
        <th>Phone</th>
        <th>Mobile</th>
        <th>Owner Name</th>
        <th>Email</th>
        <th style={{ maxWidth: "200px" }}>Created At</th>
      </tr>
    </thead>
  );
};

const ContentTableItems = props => {
  return (
    <tr>
      <td>{props.id}</td>
      <td>
        <div>{props.organization_name}</div>
      </td>
      <td>{props.pan_number}</td>
      <td>{props.address}</td>
      <td>{props.phone}</td>
      <td>{props.mobile}</td>
      <td>{props.owner_name}</td>
      <td>{props.email}</td>
      <td>{props.created_at}</td>
    </tr>
  );
};
