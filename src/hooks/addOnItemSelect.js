import moment from "moment";

export const addOnItemSelect = (items) => {
  items.forEach((item) => {
    item.itemProps.onItemSelect = (itemId, e, time) => {
      console.log(itemId, e, time);
    };
  });
};

