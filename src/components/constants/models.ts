import { ColumnTypes } from "./enums";

export interface OrderProps {
  id: number;
  title: string;
  desc: string;
  column: ColumnTypes;
}

export interface dragItem {
  index: number;
  id: OrderProps["id"];
}
