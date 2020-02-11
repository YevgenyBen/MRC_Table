import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import TableComponent from "./components/TableComponent";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import SaveIcon from "@material-ui/icons/Save";
import LoopIcon from "@material-ui/icons/Loop";
import { CSVLink, CSVDownload } from "react-csv";
import GetAppOutlinedIcon from "@material-ui/icons/GetAppOutlined";

function App() {
  const [data, setData] = useState(null);
  const [filterFieldsState, setfilterFieldsState] = useState([]);

  const useStyles = makeStyles(theme => ({
    title: {
      flexGrow: 0
    }
  }));

  const classes = useStyles();

  const filterObj = {
    CUST_NAME: useSelector(state => state.filterReducer.custNameFilter),
    TECHNOLOGY: useSelector(state => state.filterReducer.technologyFilter),
    FLOW: useSelector(state => state.filterReducer.flowFilter),
    PRODUCT: useSelector(state => state.filterReducer.productFilter),
    GDPW: useSelector(state => state.filterReducer.gdpwFilter),
    AUTOMOTIVE: useSelector(state => state.filterReducer.automotiveFilter),
    LIMIT: useSelector(state => state.filterReducer.limitFilter)
  };

  useEffect(() => {
    {
      fetch(process.env.REACT_APP_GET_MAIN_FILE)
        .then(response => response.json())
        .then(tableInfo => {
          setData(JSON.parse(tableInfo));
        });
    }
  }, []);

  if (data) {
    var csvData = [];
    csvData = data.map(item => {
      let obj = {
        CUST_NAME: item.CUST_NAME,
        TECHNOLOGY: item.TECHNOLOGY,
        Flow: item.Flow,
        Product: item.Product,
        GDPW: item.GDPW,
        AUTOMOTIVE: item.AUTOMOTIVE,
        Limit: item.Limit
      };

      item.months.map((oneMonth, index) => {
        index += 1;
        obj["Month " + index] = oneMonth.MONTH;
        obj["Month " + index + " Count_wf"] = oneMonth.Count_wf;
        obj["Month " + index + " N_Maverick_lots"] = oneMonth.N_Maverick_lots;
        obj["Month " + index + " N_wf_RMA"] = oneMonth.N_wf_RMA;
        obj["Month " + index + " Stdev"] = oneMonth.Stdev;
        obj["Month " + index + " Yield"] = oneMonth.Yield;
      });
      return obj;
    });
    // );
  }

  return (
    <div className="App ">
      <AppBar color="primary" position="static">
        <Toolbar className={"header"}>
          <Typography edge="start" variant="h5" className={classes.title}>
            MRC Table
          </Typography>
        </Toolbar>
      </AppBar>

      <div>
        <div className="py-2">
          <div style={{ display: "inline-block", float: "right" }}>
            {csvData && (
              <CSVLink
                style={{ textDecoration: "none" }}
                filename={"MRC_Parsed.csv"}
                data={csvData}>
                <Button
                  variant="text"
                  size="medium"
                  className={classes.button}
                  startIcon={<GetAppOutlinedIcon />}>
                  Download
                </Button>
              </CSVLink>
            )}
          </div>
        </div>
        {data && <TableComponent yieldData={data} filterObj={filterObj} />}
      </div>
    </div>
  );
}

export default App;
