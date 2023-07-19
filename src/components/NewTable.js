import { AgGridReact } from "ag-grid-react";
import axios from "axios";
import { DatePicker } from "antd";
import { Blocks } from "react-loader-spinner";
import React, { useEffect, useState,useMemo } from "react";
import dayjs from "dayjs";

const NewTable = () => {
  const { RangePicker } = DatePicker;

  // creating startDate state with using dayJs date format
  const [startDate, setStartDate] = useState(
    dayjs().startOf("month").format("YYYY-MM-DD")
  );
  // creating endDate state with using dayJs date format
  const [endDate, setEndDate] = useState(
    dayjs().endOf("month").format("YYYY-MM-DD")
  );
  // creating row data state with empty array
  const [rowData, setRowData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Ag Grid column Defs
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

  console.log("startDate", startDate);
  console.log("endDate", endDate);

  // when page isloading useEffect DateFetchData functuion
  useEffect(() => {
    DateFetchData(startDate, endDate);
  }, [startDate, endDate]);

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
    }),
    []
  );
  // creating DateFetchData async function it's fetching API data with token
  const DateFetchData = async (startDate, endDate) => {
    setIsLoading(true);
    // token
    const token =
     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImFmMzNlMTEzLTI2ODgtNDQyNC05YjZkLWZkNjlhYzMwZDFiZSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6ImRlbnRhbEluZm90ZWNoQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOlsiRGVudGFsIFNvZnR3YXJlIiwiZGVudGFsSW5mb3RlY2hAZ21haWwuY29tIl0sImp0aSI6ImEyN2ExY2QzLTk3MzktNGZjYS1iMGI0LWYxNjA3NTQzNWQzNCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyIEFkbWluIiwiZXhwIjoxNjg5NzQ2NDkxLCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo1MDAxIiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NTAwMSJ9.WMjPhXcXG9ciiuR_6BMUq1PFoieS5Q-PGEhI27Rzmx8"
      // API
    const apiUrl = `https://api.dentalbookingonline.com/api/Appointment/get-allappointments?id=66&startDate=${startDate}&endDate=${endDate}`;
    try {
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setRowData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  // handleChange function
  const handleChange = (date, dateString) => {
    console.log("change");
    setStartDate(dateString[0]);
    setEndDate(dateString[1]);
  };

  return (
    <>
      <div className="date" style={{ marginLeft: "10%" }}>
        <RangePicker
          onChange={handleChange}
          format="YYYY-MM-DD"
          defaultValue={[dayjs(startDate), dayjs(endDate)]}
        />
      </div>
      <div className="grid-container">
        {isLoading ? (
          <div style={{ textAlign: "center", marginTop: "10%" }}>
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
            <div style={{ height: 500 }} className="ag-theme-alpine">
              <AgGridReact rowData={rowData} columnDefs={columnDefs} defaultColDef={defaultColDef}/>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default NewTable;
