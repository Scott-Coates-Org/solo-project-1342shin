import Timeline from "react-calendar-timeline";
// make sure you include the timeline stylesheet or the timeline will not be styled
import "react-calendar-timeline/lib/Timeline.css";
import { TimePicker } from "./TimePicker";
import addHours from "date-fns/addHours";
import subHours from "date-fns/subHours";
import { selectGroups } from "../redux/groupsSlice";
import { selectItems } from "../redux/itemsSlice";
import { useSelector } from "react-redux";
import { AddItem } from "./AddItem";

export const Calendar = () => {
  const groups = useSelector(selectGroups);
  const items = useSelector(selectItems);

  return (
    <div>
      <Timeline
        groups={groups}
        items={items}
        defaultTimeStart={subHours(new Date(), 12)}
        defaultTimeEnd={addHours(new Date(), 12)}
      />
  <AddItem/>
    </div>
  );
};
