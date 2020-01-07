import React from "react";
import Loading from "../../../Components/Loading";
import { getMyStores, getStoreProduct } from "../../../api/apiCalls";
import { Select, Button, Spin } from "antd";
import { Link } from "react-router-dom";

export default function StoreProduct() {
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
          error: "Please select any store first to get products",
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

  const fetchProduct = id => {
    setState({ ...state, loading: true, error: false, data: [] });
    getStoreProduct(id)
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
          <h1 className="title"> Products </h1>
          <div className="hgap"></div>
          {storeState.loading && <Spin size="small" />}
          {storeState.error && (
            <p style={{ color: "red" }}>{storeState.error}</p>
          )}
          {storeState.data && storeState.data.length > 0 && (
            <SelectForStore
              onSelectChange={fetchProduct}
              data={storeState.data}
            />
          )}
        </div>
        <div>
          <Link to="/store_user/add_product">
            <Button type="primary" icon="plus">
              Add Products
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
        <th>Product Name</th>
        <th>Picture</th>
        <th style={{ maxWidth: "200px" }}>Created At</th>
      </tr>
    </thead>
  );
};

const ContentTableItems = props => {
  const [showLargeImg, setShowLargeImg] = React.useState(false);

  return (
    <React.Fragment>
      <tr>
        <td>{props.id}</td>
        <td>
          <div>{props.name}</div>
        </td>
        <td>
          <div>
            <img
              src={props.picture}
              alt=""
              style={{
                height: "40px",
                margin: "5px",
                borderRadius: "4px",
                cursor: "pointer"
              }}
              onClick={() => {
                setShowLargeImg(true);
              }}
            />
          </div>
        </td>
        <td>{props.created_at}</td>
      </tr>
      {showLargeImg && (
        <React.Fragment>
          <div
            style={{
              position: "fixed",
              top: "0",
              left: "0",
              right: "0",
              bottom: "0",
              background: "rgba(0,0,0,0.7)"
            }}
            onClick={() => {
              setShowLargeImg(false);
            }}
          ></div>
          <img
            src={props.picture}
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              maxHeight: "90vh",
              maxWidth: "90vw",
              transform: "translate(-50%, -50%)",
              borderRadius: "10px"
            }}
            alt=""
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
