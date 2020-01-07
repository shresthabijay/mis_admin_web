import React from "react";
import Loading from "../../../Components/Loading";
import { getMyStores, addSupplier } from "../../../api/apiCalls";
import { Input, Select, Button } from "antd";
import { displayAllError } from "../../../Helpers/helper";

export default function AddSupplier(props) {
  const [state, setState] = React.useState({
    loading: true,
    data: [],
    error: false
  });

  const [editState, setEditState] = React.useState({
    store_id: 0,
    organization_name: "",
    pan_number: "",
    phone: "",
    email: "",
    address: "",
    mobile: "",
    owner_name: ""
  });

  const [addLoading, setAddLoading] = React.useState(false);

  const doAddSupplier = () => {
    setAddLoading(true);
    addSupplier(editState)
      .then(res => {
        props.history.push("/store_user/suppliers");
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
        <h1 className="title"> Add Supplier </h1>
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
                placeholder="Pan Number"
                name="pan_number"
                onChange={handleStateChange}
              />
              <div className="gap"></div>
              <Input
                type="text"
                placeholder="Phone"
                name="phone"
                onChange={handleStateChange}
              />
              <div className="gap"></div>
              <Input
                type="text"
                placeholder="Email"
                name="email"
                onChange={handleStateChange}
              />
            </div>
            <div className="hgap"></div>
            <div className="add-supplier-right">
              <Input
                type="text"
                placeholder="Organization Name"
                name="organization_name"
                onChange={handleStateChange}
              />
              <div className="gap"></div>
              <Input
                type="text"
                placeholder="Adddress"
                name="address"
                onChange={handleStateChange}
              />
              <div className="gap"></div>
              <Input
                type="text"
                placeholder="Mobile"
                name="mobile"
                onChange={handleStateChange}
              />
              <div className="gap"></div>
              <Input
                type="text"
                placeholder="Owner Name"
                name="owner_name"
                onChange={handleStateChange}
              />
            </div>
          </div>
          <br />
          <Button
            type="primary"
            icon="plus"
            loading={addLoading}
            onClick={() => {
              doAddSupplier();
            }}
          >
            Add Supplier
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
