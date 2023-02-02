import React from "react";
import { Row, Col } from "@pankod/refine-antd";
import { useDrop } from "react-dnd";
import { cardType } from "./constants/enums";

function Column({ children, title }: { children: any; title: string }) {
  const [{ isOver }, dropref] = useDrop({
    accept: cardType.ORDER,
    drop: () => ({
      title,
    }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <Row gutter={30}>
      <Col
        style={{
          backgroundColor: "#e3e7ee",
          width: "270px",
          padding: "15px",
          minHeight: "170px",
          maxHeight: "690px",
          borderRadius: "5px",
          overflowY: "scroll",
        }}
      >
        <div
          style={{
            fontSize: "17px",
            marginLeft: "10px",
            marginBottom: "15px",
            color: "#84878c",
          }}
        >
          {title}
        </div>
        <div
          ref={dropref}
          style={{
            width: "100%",
            height: "75%",
            padding: "4px",
            border: isOver ? "dashed 1px black" : "",
          }}
        >
          {children}
        </div>
      </Col>
    </Row>
  );
}

export default Column;
