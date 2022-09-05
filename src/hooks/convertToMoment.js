import moment from "moment";

export const ConvertToMoment = (items) => {
  let momentItems = items.map((item) => {
    let startTime = moment(item.start_time, "MMMM Do YYYY, h:mm:ss a Z");
    let endTime = moment(item.end_time, "MMMM Do YYYY, h:mm:ss a Z");
    return {
      id: item.id,
      group: item.group,
      start_time: startTime,
      end_time: endTime,
      
    };
  });
  return momentItems;
};
