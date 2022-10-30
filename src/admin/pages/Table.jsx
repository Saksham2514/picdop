import React from "react";
import DataTable from "react-data-table-component";

const Table = (props) => {
 
  return (
    <div>
      <DataTable
        paginationRowsPerPageOptions={[1, 5, 10, 15, 20]}
        paginationPerPage={5}
        columns={props.columns }
        data={props.data}
        options={{
          search: true,
        }}
        pagination
      />
    </div>
  );
};

export default Table;
