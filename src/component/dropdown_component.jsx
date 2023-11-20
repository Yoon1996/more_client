import { Select, Space } from "antd";
import React, { useState } from "react";
import "./dropdown_component.scss";
import { FaCaretDown } from "react-icons/fa";

const DropdownComponent = () => {
  const [category, setCategory] = useState("최신순");
  const [isDrop, setIsDrop] = useState(false);

  const dropDown = () => {
    setIsDrop((isDrop) => !isDrop);
  };

  console.log(category);

  return (
    <>
      {/* <Space wrap>
        <Select
          className="dropdown__dropdown"
          defaultValue={`${category}`}
          style={{
            width: 120,
          }}
          onChange={handleChange}
          options={[
            {
              value: "조회순",
              label: "조회순",
            },
            {
              value: "최신순",
              label: "최신순",
            },
            {
              value: "자주 본 순",
              label: "자주 본 순",
            },
          ]}
        />
      </Space> */}
      <div className="dropdown__wrap" onClick={dropDown}>
        <div className="dropdown__dropdown">조회순</div>
        <div className="dropdown__carrot">
          <FaCaretDown />
        </div>
        {isDrop ? (
          <div className="dropdown__menu">
            <div>최신순</div>
            <div>조회순</div>
            <div>자주 본 순</div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default DropdownComponent;
