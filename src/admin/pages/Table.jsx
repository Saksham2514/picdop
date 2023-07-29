import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Loading } from "./Loading";

const ExpandedComponent = ({ data }) => {
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

const Table = (props) => {
  const [loading, setloading] = useState(true);

  useEffect(
    () => {
      if (props?.status === 200) setloading(false);
      else if (props?.status > 0) setloading(false);
      else if (props?.data.length > 0) setloading(false);
      else setloading(true);
    },
    [props?.status]
  );

  return (
    <div>
      {loading ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          <DataTable
            paginationRowsPerPageOptions={[1, 5, 10, 15, 20]}
            paginationPerPage={5}
            columns={props.columns}
            expandableRows={props.expand !== undefined ? props.expand : true}
            expandableRowsComponent={ExpandedComponent}
            data={props.data}
            options={{
              search: true,
            }}
            pagination
          />
        </>
      )}
    </div>
  );
};

export default Table;
