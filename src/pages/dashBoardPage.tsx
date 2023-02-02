import React from "react";
import { useState, useCallback } from "react";
import Column from "../components/columns";
import Cards from "../components/cards";
import Data from "../components/constants/data";
import update from "immutability-helper";
import { ColumnTypes } from "components/constants/enums";
import { Space } from "@pankod/refine-antd";

type Props = {};

function DashboardPage({}: Props) {
  const [orders, setOrders] = useState(Data);

  const columnItem = (columnName: string) => {
    return orders
      .filter((order) => order.column === columnName)
      .map((order, index) => (
        <Cards
          key={order.id}
          title={order.title}
          desc={order.desc}
          setOrders={setOrders}
          index={index}
        />
      ));
  };

  const { ORDERS, IN_PROGRESS, DELIVERED, RETURNED } = ColumnTypes;

  return (
    <div className="App">
      <Space
        direction="horizontal"
        align="baseline"
        size={109}
        style={{
          display: "flex",

          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <Column title={ORDERS}>{columnItem(ORDERS)}</Column>
        <Column title={IN_PROGRESS}>{columnItem(IN_PROGRESS)}</Column>
        <Column title={DELIVERED}>{columnItem(DELIVERED)}</Column>
        <Column title={RETURNED}>{columnItem(RETURNED)}</Column>
      </Space>
    </div>
  );
}

export default DashboardPage;
