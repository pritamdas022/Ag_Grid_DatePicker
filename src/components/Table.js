// import { AgGridReact } from "ag-grid-react";
// import "ag-grid-community/styles/ag-grid.css";
// import "ag-grid-community/styles/ag-theme-alpine.css";
// import { useEffect, useState } from "react";
// import { useMemo } from "react";
// import { useCallback } from "react";
// // import User from './users.json'


// function Table({data}) {
//   const [rowData, setRowData] = useState(data);
//   const [columnDefs, setColumnDefs] = useState([
//     {headerName:'Appointment Type', field: "appointmentType", sortable: true, filter: true },
//     { headerName:'Booking From',field: "bookingFrom", sortable: true, filter: true },
//     { headerName:'Clinic Id',field: "clinicId", sortable: true, filter: true },
//     { headerName:'Created On',field: "createdOn", sortable: true, filter: true },
//     { headerName:'Email',field: "email", sortable: true, filter: true },
//     { headerName:'How Heard',field: "howHeard", sortable: true, filter: true },
//     { headerName:'Id',field: "id", sortable: true, filter: true },
//     { headerName:'Modified On',field: "modifiedOn", sortable: true, filter: true },
//     { headerName:'Name',field: "name", sortable: true, filter: true },
//     { headerName:'Operatory Id',field: "operatoryId", sortable: true, filter: true },
//     { headerName:'Patient Id',field: "patientId", sortable: true, filter: true },
//     { headerName:'Phone Number',field: "phoneNumber", sortable: true, filter: true },
//     { headerName:'Provider ID',field: "providerId", sortable: true, filter: true },
//     { headerName:'',field: "providerName", sortable: true, filter: true },
//     { headerName:'Status',field: "startTime", sortable: true, filter: true },
//     { headerName:'Status',field: "status", sortable: true, filter: true },
//   ]);
//   const defaultColDef = useMemo(
//     () => ({
//       sortable: true,
//       filter: true,
//     }),
//     []
//   );
//   const celClickedListener=useCallback(e=>{
//     console.log('cellClicked',e);
//   },[])
// useEffect=()=>{

// }
//   return (
//     <div className="ag-theme-alpine" style={{ height: 500 }}>
//       <AgGridReact
//       onCellClicked={celClickedListener}
//         rowSelection="multiple"
//         animateRows={true}
//         rowData={rowData}
//         columnDefs={columnDefs}
//         defaultColDef={defaultColDef}
//       />
//     </div>
//   );
// }

// export default Table;


// import React, { useMemo, useEffect, useState } from 'react';
// import { createRoot } from 'react-dom/client';
// import { AgGridReact } from '@ag-grid-community/react';
// import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
// import { RangeSelectionModule } from '@ag-grid-enterprise/range-selection';
// import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
// import { RichSelectModule } from '@ag-grid-enterprise/rich-select';
// // import '@ag-grid-community/styles/ag-grid.css';
// // import '@ag-grid-community/styles/ag-theme-alpine.css';

// // import { ModuleRegistry } from '@ag-grid-community/core';
// // Register the required feature modules with the Grid
// // ModuleRegistry.registerModules([ClientSideRowModelModule, RangeSelectionModule, RowGroupingModule, RichSelectModule]);

// // this is a hook, but we work also with classes
// function MyRenderer(params) {
//     return (
//         <span className="my-renderer">
//             <img src="https://d1yk6z6emsz7qy.cloudfront.net/static/images/loading.gif" className="my-spinner" />
//             {params.value}
//         </span>
//     );
// }

// function Table() {

//     // never changes, so we can use useMemo
//     const columnDefs = useMemo(() => [
//         { field: 'athlete' },
//         { field: 'age', cellRenderer: MyRenderer },
//         { field: 'country' },
//         { field: 'year' },
//         { field: 'date' },
//         { field: 'sport' },
//         { field: 'gold' },
//         { field: 'silver' },
//         { field: 'bronze' },
//         { field: 'total' }
//     ], []);

//     // never changes, so we can use useMemo
//     const defaultColDef = useMemo(() => ({
//         resizable: true,
//         sortable: true
//     }), []);

//     // changes, needs to be state
//     const [rowData, setRowData] = useState();

//     // gets called once, no dependencies, loads the grid data
//     useEffect(() => {
//         fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
//             .then(resp => resp.json())
//             .then(data => setRowData(data));
//     }, []);

//     return (
//         <AgGridReact
//             className="ag-theme-alpine"
//             animateRows="true"
//             columnDefs={columnDefs}
//             defaultColDef={defaultColDef}
//             enableRangeSelection="true"
//             rowData={rowData}
//             rowSelection="multiple"
//             suppressRowClickSelection="true"
//         />
//     );
// }

// export default Table;
// import React, { useState } from 'react';
// import axios from 'axios';
// import { AgGridReact } from 'ag-grid-react';
// import 'ag-grid-community/dist/styles/ag-grid.css';
// import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
// import { DatePicker } from "antd";
// // import { DateRangePicker } from 'react-date-range';
// // import 'react-date-range/dist/styles.css';
// // import 'react-date-range/dist/theme/default.css';

// function MyComponent() {
//   const [selectedDateRange, setSelectedDateRange] = useState([
//     {
//       startDate: null,
//       endDate: null,
//       key: 'selection',
//     },
//   ]);
//   const [rowData, setRowData] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const fetchData = async () => {
//     const startDate = selectedDateRange[0].startDate;
//     const endDate = selectedDateRange[0].endDate;

//     if (!startDate || !endDate) return; // Return if no start or end date is selected

//     setLoading(true);
//     try {
//       const response = await axios.get(`https://api.example.com/data?start=${startDate}&end=${endDate}`, {
//         headers: {
//           Authorization: 'Bearer YOUR_TOKEN',
//         },
//       });

//       setRowData(response.data);
//     } catch (error) {
//       console.log('Error fetching data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDateRangeChange = (ranges) => {
//     setSelectedDateRange([ranges.selection]);
//   };

//   return (
//     <div>
//       <DatePicker
//         ranges={selectedDateRange}
//         onChange={handleDateRangeChange}
//       />

//       <button onClick={fetchData}>Fetch Data</button>

//       <div className="ag-theme-alpine" style={{ height: '500px', width: '600px', marginTop: '20px' }}>
//         <AgGridReact
//           rowData={rowData}
//           loading={loading}
//           suppressCellSelection={true}
//           columnDefs={[
//             { headerName: 'ID', field: 'id' },
//             { headerName: 'Name', field: 'name' },
//             // ...add more columns as needed
//           ]}
//         ></AgGridReact>
//       </div>
//     </div>
//   );
// }





// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { AgGridReact } from 'ag-grid-react';
// import 'ag-grid-community/dist/styles/ag-grid.css';
// import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

// function MyComponent() {
//   const [rowData, setRowData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedStartDate, setSelectedStartDate] = useState(null);
//   const [selectedEndDate, setSelectedEndDate] = useState(null);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get('https://api.example.com/data', {
//         headers: {
//           Authorization: 'Bearer YOUR_TOKEN',
//         },
//       });
//       setRowData(response.data);
//       setLoading(false);
//     } catch (error) {
//       console.log('Error fetching data:', error);
//       setLoading(false);
//     }
//   };

//   const handleDateRangeChange = (dates) => {
//     setSelectedStartDate(dates[0]);
//     setSelectedEndDate(dates[1]);

//     const filteredRows = rowData.filter((row) => {
//       const rowDate = new Date(row.date);
//       return (
//         rowDate >= dates[0] &&
//         rowDate <= dates[1]
//       );
//     });

//     setFilteredData(filteredRows);
//   };

//   const columnDefs = [
//     { headerName: 'ID', field: 'id' },
//     { headerName: 'Name', field: 'name' },
//     // ...add more columns as needed
//   ];

//   return (
//     <div>
//       <div style={{ marginBottom: '20px' }}>
//         <DatePicker
//           selected={selectedStartDate}
//           onChange={handleDateRangeChange}
//           selectsRange
//           startDate={selectedStartDate}
//           endDate={selectedEndDate}
//           placeholderText="Select date range"
//         />
//       </div>

//       <div className="ag-theme-alpine" style={{ height: '500px', width: '600px' }}>
//         <AgGridReact
//           rowData={selectedStartDate && selectedEndDate ? filteredData : rowData}
//           columnDefs={columnDefs}
//           loading={loading}
//           suppressCellSelection={true}
//         ></AgGridReact>
//       </div>
//     </div>
//   );
// }





import React, { useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

function Table() {
    const [initialStartDate, setInitialStartDate] = useState(new Date('2023-07-01'));
    const [initialEndDate, setInitialEndDate] = useState(new Date('2023-07-15'));
  
    return (
      <div>
        <DateRangePicker
          ranges={[
            {
              startDate: initialStartDate,
              endDate: initialEndDate,
              key: 'selection'
            }
          ]}
          onChange={(ranges) => {
            setInitialStartDate(ranges.selection.startDate);
            setInitialEndDate(ranges.selection.endDate);
          }}
        />
      </div>
    );
  }
  
  export default Table;
  
