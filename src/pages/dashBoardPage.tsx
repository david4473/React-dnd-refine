import React from "react";
import { useState, useEffect } from "react";
import Column from "../components/columns";
import Cards from "../components/cards";
import { ColumnTypes } from "components/constants/enums";
import { Space } from "@pankod/refine-antd";
import { IProduct } from "components/constants/models";
import { useList } from "@pankod/refine-core";

function DashboardPage() {
  //Fetching data from the products endpoint
  //using refine's useList hook

  const { data } = useList<IProduct>({
    config: {
      pagination: {
        current: 2,
      },
    },
    resource: "products",
  });

  //modifying fecthed data and adding column property

  const newArr = data?.data.map((i: IProduct) => {
    return {
      ...i,
      column: ColumnTypes.ORDERS,
    };
  });

  const [orders, setOrders] = useState<any[] | undefined>([]);

  //creating side effects based on the data's response.

  useEffect(() => {
    setOrders(newArr);
  }, [data?.data]);

  const columnItem = (columnName: string) => {
    return (
      orders &&
      orders
        .filter((order) => order.column === columnName)
        .map((order, index) => (
          <Cards
            key={order.id}
            title={order.name}
            desc={order.material}
            setOrders={setOrders}
            index={index}
          />
        ))
    );
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
          marginLeft: "20px",
          marginTop: "20px",
          gap: "7rem",
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
