import { ColumnTypes } from "./enums";
import { IProduct } from "components/constants/models";
import { useList } from "@pankod/refine-core";


function useData() {

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

  return [newArr, data?.data]
}

export default useData