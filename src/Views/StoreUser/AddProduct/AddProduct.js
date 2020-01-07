import React from "react";
import Loading from "../../../Components/Loading";
import { getMyStores, addProduct } from "../../../api/apiCalls";
import { Input, Select, Button } from "antd";
import { displayAllError } from "../../../Helpers/helper";

export default function AddProduct(props) {
  const [state, setState] = React.useState({
    loading: true,
    data: [],
    error: false
  });

  const [editState, setEditState] = React.useState({
    store_id: 0,
    name: "",
    picture_id: 1
  });

  const [addLoading, setAddLoading] = React.useState(false);

  const doAddProduct = () => {
    setAddLoading(true);
    addProduct(editState)
      .then(res => {
        props.history.push("/store_user/products");
      })
      .catch(err => {
        setAddLoading(false);
        displayAllError(err);
      });
  };

  const handleStoreChange = id => {
    setEditState({ ...editState, store_id: id });
  };

  const handleStateChange = e => {
    setEditState({ ...editState, [e.target.name]: e.target.value });
  };

  const fetchStore = () => {
    setState({ ...state, loading: true, error: false, data: [] });
    getMyStores()
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
        <h1 className="title"> Add Product </h1>
      </div>
      <br />
      {state.loading && <Loading />}
      {state.error && <p style={{ color: "red" }}>{state.error}</p>}
      {state.data && state.data.length > 0 && (
        <React.Fragment>
          <div className="add-supplier flex">
            <div className="add-supplier-left">
              <SelectForStore
                data={state.data}
                onSelectChange={handleStoreChange}
              />
              <div className="gap"></div>
              <Input
                type="text"
                placeholder="Product Name"
                name="name"
                onChange={handleStateChange}
              />
            </div>
            <div className="add-supplier-right"></div>
          </div>
          <br />
          <Button
            type="primary"
            icon="plus"
            loading={addLoading}
            onClick={() => {
              doAddProduct();
            }}
          >
            Add Product
          </Button>
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
        props.onSelectChange && props.onSelectChange(value);
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
