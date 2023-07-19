import React, { useState, useMemo, useEffect } from "react";
import { DatePicker } from "antd";
import axios from "axios";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import { Blocks } from "react-loader-spinner";
import dayjs from "dayjs";
import { useLocation } from "react-router";

const TableData = () => {
  const { RangePicker } = DatePicker;

  const location=useLocation();
  console.log("state",location.state);


  const [selectStartDate, setSelectStartDate] = useState(
    dayjs().startOf("month").format("YYYY-MM-DD")
  );
  
  const [selectEndDate, setSelectEndDate] = useState(
    dayjs().endOf("month").format("YYYY-MM-DD")
  );
  

  const [rowData, setRowData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [columnDefs] = useState([
    {
      headerName: "Appointment Type",
      field: "appointmentType",
    },
    {
      headerName: "Booking From",
      field: "bookingFrom",
    },
    {
      headerName: "Clinic Id",
      field: "clinicId",
    },
    {
      headerName: "Created On",
      field: "createdOn",
    },
    {
      headerName: "Email",
      field: "email",
    },
    {
      headerName: "How Heard",
      field: "howHeard",
    },
    {
      headerName: "Id",
      field: "id",
    },
    {
      headerName: "Modified On",
      field: "modifiedOn",
    },
    {
      headerName: "Name",
      field: "name",
    },
    {
      headerName: "Operatory Id",
      field: "operatoryId",
    },
    {
      headerName: "Patient Id",
      field: "patientId",
    },
    {
      headerName: "Phone Number",
      field: "phoneNumber",
    },
    {
      headerName: "Provider Id",
      field: "providerId",
    },
    {
      headerName: "Provider Name",
      field: "providerName",
    },
    {
      headerName: "Start Time",
      field: "startTime",
    },
  ]);
  console.log("StartDate", selectStartDate);
  console.log("EndDate", selectEndDate);

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
    }),
    []
  );

  useEffect(() => {
    DateFetchData(selectStartDate, selectEndDate);
  }, [selectStartDate, selectEndDate]);

  const DateFetchData = async (selectStartDate, selectEndDate) => {
    setIsLoading(true);
    const token =location.state[0];
   
    const apiUrl = `https://api.dentalbookingonline.com/api/Appointment/get-allappointments?id=66&startDate=${selectStartDate}&endDate=${selectEndDate}`;
    try {
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setRowData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };
const DatePikerChange=(date,dateString)=>{
  console.log("change");
  setSelectStartDate(dateString[0]);
  setSelectEndDate(dateString[1]);
}
  return (
    <>
      <div className="date" style={{ marginLeft: "10%" }}>
        <RangePicker
          onChange={DatePikerChange}
          format="YYYY-MM-DD"
          defaultValue={[dayjs(selectStartDate), dayjs(selectEndDate)]}
        />
      </div>
      <div className="grid-container">
        {isLoading ? (
          <div style={{ textAlign: "center" ,marginTop:"10%" }}>
            <Blocks
              visible={true}
              height="80"
              width="80"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
            />
          </div>
        ) : (
          <div style={{ height: "400px", width: "80%", marginLeft: "10%" }}>
            <div style={{ height: "80vh" }} className="ag-theme-alpine">
              <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                animateRows={true}
                
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TableData;
