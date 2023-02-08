import React from "react";
import { useDrag } from "react-dnd";
import { cardType, ColumnTypes } from "./constants/enums";
import { Card } from "@pankod/refine-antd";

type obj = {
  title: {};
};

function Cards({
  title,
  desc,
  setOrders,
}: {
  title: string;
  desc: string;
  setOrders: any;
  index: number;
}) {
  const orderColumnChange = (CurrentOrder: any, columnName: string) => {
    setOrders((prevState: string[]) => {
      return prevState.map((item: any) => {
        return {
          ...item,
          column: item.name === CurrentOrder.title ? columnName : item.column,
        };
      });
    });
  };

  const [{ isDragging }, drag] = useDrag({
    type: cardType.ORDER,
    item: { title },
    end: (order, monitor) => {
      const dropResult = monitor.getDropResult<obj>();

      if (dropResult) {
        const { title } = dropResult;
        const { ORDERS, IN_PROGRESS, DELIVERED, RETURNED } = ColumnTypes;
        switch (title) {
          case ORDERS:
            orderColumnChange(order, ColumnTypes.ORDERS);
            break;
          case IN_PROGRESS:
            orderColumnChange(order, ColumnTypes.IN_PROGRESS);
            break;
          case DELIVERED:
            orderColumnChange(order, ColumnTypes.DELIVERED);
            break;
          case RETURNED:
            orderColumnChange(order, ColumnTypes.RETURNED);
            break;
          default:
            break;
        }
      }
    },

    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <Card
      title={title}
      className="card"
      ref={drag}
      style={{
        opacity: isDragging ? "0.5" : "1",
        marginBottom: "15px",
        boxShadow: "1px 4px 11px -2px rgba(135,135,135,0.75)",
      }}
    >
      {desc}
    </Card>
  );
}
export default Cards;
