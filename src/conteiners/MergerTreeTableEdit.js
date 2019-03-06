import React from "react";
import TreePage from "../components/Tree";
import EditableTable from "../components/TableEdit";

const MergerTreeTableEdit = ({ match }) => {

  const [checks, setChecks] = React.useState([+match.params.clientId]);

  const set = checked => {
    setChecks(checked); 
  };
  return (
    <>
      <TreePage clientId={match.params.clientId} onChangeCheckbox={set} />
      <EditableTable clientId={match.params.clientId} checks={checks} />
    </>
  );
};

export default MergerTreeTableEdit;
