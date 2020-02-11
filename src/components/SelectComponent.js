import React from "react";
import { useDispatch } from "react-redux";
import { actions } from "../actions";
import Select from "react-select";
import FormControl from "@material-ui/core/FormControl";

export default function SelectComponent(props) {
  const incomingArray = props.propsToFilter;
  const dispatch = useDispatch();

  const handleChange = selected => {
    selected
      ? dispatch(actions[props.name](selected.value))
      : dispatch(actions[props.name](""));
  };

  const options = incomingArray.map(item => {
    return { value: item, label: item };
  });

  return (
    <FormControl>
      <Select
        labelId="label"
        className="select"
        onChange={handleChange}
        clearValue=""
        placeholder={props.nameField}
        isClearable={true}
        options={options}></Select>
    </FormControl>
  );
}
