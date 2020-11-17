import React from "react";
import { Select } from "antd";

const getOptionList = (data) => {
  if (!data) {
    return [];
  }

  let options = [];
  data.map(item => (
    options.push(
      <Select.Option value={item.id} key={item.id}>
        {item.name}
      </Select.Option>
    )
  ));

  return options;
};

export default getOptionList;
