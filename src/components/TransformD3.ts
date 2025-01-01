import { ascending, descending, extent, group, sort } from "d3-array";

interface TransformD3Type {
  extent: (array: number[]) => any;
  group: (array: number[], key: string) => any;
  sort: (array: number[], sortBy: "asc" | "desc") => any;
}

const TransformD3: TransformD3Type = {
  extent: (array) => {
    return extent(array);
  },
  group: (array, key) => {
    return group(array, (d: any) => d[key]);
  },
  sort: (array, sortBy) => {
    if(sortBy == 'asc') 
      return sort(array, ascending);
    else if(sortBy == 'desc') 
      return sort(array, descending);
    else 
      return array;
  }
};

export default TransformD3;