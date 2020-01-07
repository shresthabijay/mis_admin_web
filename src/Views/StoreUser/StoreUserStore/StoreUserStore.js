import React from "react";
import Loading from "../../../Components/Loading";
import { getMyStores } from "../../../api/apiCalls";

export default function StoreUserStore() {
  const [state, setState] = React.useState({
    loading: true,
    data: [],
    error: false
  });

  const fetchUsers = () => {
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
    fetchUsers();
    // eslint-disable-next-line
  }, [true]);

  return (
    <section id="contents">
      <br />
      <div className="flex jcsb">
        <h1 className="title"> My Stores </h1>
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
        <th>Store Name</th>
        <th>Role</th>
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
        <div>{props.name}</div>
      </td>
      <td>{props.role_name}</td>
      <td>{props.created_at}</td>
    </tr>
  );
};
