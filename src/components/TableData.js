import React, { useState, useMemo, useEffect } from "react";
import { DatePicker } from "antd";
import axios from "axios";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import { Blocks } from "react-loader-spinner";
import dayjs from "dayjs";

const TableData = () => {
  const { RangePicker } = DatePicker;


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
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImFmMzNlMTEzLTI2ODgtNDQyNC05YjZkLWZkNjlhYzMwZDFiZSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6ImRlbnRhbEluZm90ZWNoQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOlsiRGVudGFsIFNvZnR3YXJlIiwiZGVudGFsSW5mb3RlY2hAZ21haWwuY29tIl0sImp0aSI6ImEyN2ExY2QzLTk3MzktNGZjYS1iMGI0LWYxNjA3NTQzNWQzNCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyIEFkbWluIiwiZXhwIjoxNjg5NzQ2NDkxLCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo1MDAxIiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NTAwMSJ9.WMjPhXcXG9ciiuR_6BMUq1PFoieS5Q-PGEhI27Rzmx8";
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
