import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TablePagination from "@material-ui/core/TablePagination";
import TimelineRoundedIcon from "@material-ui/icons/TimelineRounded";
import IconButton from "@material-ui/core/IconButton";
import "./TableComponent.css";
import SelectComponent from "./SelectComponent";
import CostumModal from "./ModalComponent";
import InsertChartOutlinedIcon from "@material-ui/icons/InsertChartOutlined";

export default function TableComponent(props) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [modalShow, setModalShow] = React.useState(false);
  const monthDataNames = ["Count", "Yield", "Stdev", "RMA", "Maverick"];
  const fetchGraphData = prod => {
    setModalShow(true);
    fetch(process.env.REACT_APP_GET_CHART_FILE + "?product=" + prod)
      .then(response => response.json())
      .then(ChartInfo => {});
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const dataForFiler = [...props.yieldData]; //here

  const CustNames = dataForFiler
    .map(item => item.CUST_NAME)
    .filter((value, index, self) => self.indexOf(value) === index);

  const TECHNOLOGY = dataForFiler
    .map(item => item.TECHNOLOGY)
    .filter((value, index, self) => self.indexOf(value) === index);

  const Flow = dataForFiler
    .map(item => item.Flow)
    .filter((value, index, self) => self.indexOf(value) === index);

  const Product = dataForFiler
    .map(item => item.Product)
    .filter((value, index, self) => self.indexOf(value) === index);

  const GDPW = dataForFiler
    .map(item => item.GDPW)
    .filter((value, index, self) => self.indexOf(value) === index);

  const AUTOMOTIVE = dataForFiler
    .map(item => item.AUTOMOTIVE)
    .filter((value, index, self) => self.indexOf(value) === index);

  const Limit = dataForFiler
    .map(item => item.Limit)
    .filter((value, index, self) => self.indexOf(value) === index);

  /*filters*/
  //experimental filter
  const allFiltered = props.yieldData.filter(item => {
    return (
      (!props.filterObj.CUST_NAME ||
        item.CUST_NAME === props.filterObj.CUST_NAME) &&
      (!props.filterObj.TECHNOLOGY ||
        item.TECHNOLOGY === props.filterObj.TECHNOLOGY) &&
      (!props.filterObj.FLOW || item.Flow === props.filterObj.FLOW) &&
      (!props.filterObj.PRODUCT || item.Product === props.filterObj.PRODUCT) &&
      (!props.filterObj.GDPW || item.GDPW === props.filterObj.GDPW) &&
      (!props.filterObj.AUTOMOTIVE ||
        item.AUTOMOTIVE === props.filterObj.AUTOMOTIVE) &&
      (!props.filterObj.LIMIT || item.Limit === props.filterObj.LIMIT)
    );
  });

  return (
    <TableContainer className="container-fluid" component={Paper}>
      <CostumModal show={modalShow} onHide={() => setModalShow(false)} />
      <Table aria-label="spanning table">
        <TableHead>
          <TableRow className="top-table-header">
            <TableCell align="center" colSpan={8}>
              General
            </TableCell>
            <TableCell align="center" colSpan={5}>
              {allFiltered.length > 0 && allFiltered[0].months[0].MONTH}
            </TableCell>
            <TableCell align="center" colSpan={5}>
              {allFiltered.length > 0 && allFiltered[0].months[1].MONTH}
            </TableCell>
            <TableCell align="center" colSpan={5}>
              {allFiltered.length > 0 && allFiltered[0].months[2].MONTH}
            </TableCell>
            <TableCell align="center" colSpan={5}>
              {allFiltered.length > 0 && allFiltered[0].months[3].MONTH}
            </TableCell>
          </TableRow>
          <TableRow className="second-table-header">
            <TableCell align="center">
              <InsertChartOutlinedIcon fontSize="large" />
            </TableCell>
            <TableCell align="center">
              {CustNames && (
                <SelectComponent
                  name="CUST_NAME"
                  propsToFilter={CustNames}
                  nameField="Customer"
                />
              )}
            </TableCell>
            <TableCell align="center">
              {TECHNOLOGY && (
                <SelectComponent
                  name="TECHNOLOGY"
                  propsToFilter={TECHNOLOGY}
                  nameField="Tech"
                />
              )}
            </TableCell>
            <TableCell align="center">
              {Flow && (
                <SelectComponent
                  name="FLOW"
                  propsToFilter={Flow}
                  nameField="Flow"
                />
              )}
            </TableCell>
            <TableCell align="center">
              {Product && (
                <SelectComponent
                  name="PRODUCT"
                  propsToFilter={Product}
                  nameField="Product"
                />
              )}
            </TableCell>
            <TableCell align="center">
              {GDPW && (
                <SelectComponent
                  name="GDPW"
                  propsToFilter={GDPW}
                  nameField="GDPW"
                />
              )}
            </TableCell>
            <TableCell align="center">
              {AUTOMOTIVE && (
                <SelectComponent
                  name="AUTOMOTIVE"
                  propsToFilter={AUTOMOTIVE}
                  nameField="Auto"
                />
              )}
            </TableCell>
            <TableCell align="center">
              {Limit && (
                <SelectComponent
                  name="LIMIT"
                  propsToFilter={Limit}
                  nameField="Limit"
                />
              )}
            </TableCell>

            {monthDataNames.map((item, index) => {
              return (
                <TableCell align="center" key={index}>
                  {item}
                </TableCell>
              );
            })}
            {monthDataNames.map((item, index) => {
              return (
                <TableCell align="center" key={index}>
                  {item}
                </TableCell>
              );
            })}
            {monthDataNames.map((item, index) => {
              return (
                <TableCell align="center" key={index}>
                  {item}
                </TableCell>
              );
            })}
            {monthDataNames.map((item, index) => {
              return (
                <TableCell align="center" key={index}>
                  {item}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>

        <TableBody>
          {allFiltered &&
            allFiltered
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  <TableCell>
                    <div
                      prod={row.Product}
                      onClick={() => fetchGraphData(row.Product)}>
                      <IconButton>
                        <TimelineRoundedIcon
                          fontSize="default"
                          color="action"
                        />
                      </IconButton>
                    </div>
                  </TableCell>
                  <TableCell align="center">{row.CUST_NAME}</TableCell>
                  <TableCell align="center">{row.TECHNOLOGY}</TableCell>
                  <TableCell align="center">{row.Flow}</TableCell>
                  <TableCell align="center">{row.Product}</TableCell>
                  <TableCell align="center">{row.GDPW}</TableCell>
                  <TableCell align="center">{row.AUTOMOTIVE}</TableCell>
                  <TableCell align="center">{row.Limit}</TableCell>
                  {row.months.map((mRow, innerIndex) => (
                    <React.Fragment key={innerIndex}>
                      <TableCell
                        align="center"
                        className={"month" + innerIndex}>
                        {mRow.Count_wf}
                      </TableCell>
                      <TableCell
                        align="center"
                        className={"month" + innerIndex}>
                        {mRow.Yield &&
                          (Math.round(mRow.Yield * 100) / 100).toFixed(2)}
                      </TableCell>
                      <TableCell
                        align="center"
                        className={"month" + innerIndex}>
                        {mRow.Yield &&
                          (Math.round(mRow.Stdev * 100) / 100).toFixed(2)}
                      </TableCell>
                      <TableCell
                        align="center"
                        className={"month" + innerIndex}>
                        {mRow.N_wf_RMA}
                      </TableCell>
                      <TableCell
                        align="center"
                        className={"month" + innerIndex}>
                        {mRow.N_Maverick_lots}
                      </TableCell>
                    </React.Fragment>
                  ))}
                </TableRow>
              ))}
        </TableBody>
      </Table>
      <>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={allFiltered.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </>
    </TableContainer>
  );
}
