import * as React from "react";
import PropTypes from "prop-types";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import { blue } from "@mui/material/colors";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Typography } from "@mui/material";
import { useState } from "react";
import moment from "moment";
import { useEffect } from "react";
import { removeTimeItem } from "../hooks/removeTimeItem";

export function ClickedItemDialog(props) {
  const [itemInfo, setItemInfo] = useState({ start: "", end: "" });

  useEffect(() => {
    if (props.selected.itemId) {
      let arr = props.eventData.eventData.items.filter(
        (item) => item.id === props.selected.itemId
      );
      console.log(arr);
      setItemInfo({ start: arr[0].start_time, end: arr[0].end_time });
      console.log("eff");
    }
  }, [props.selected]);
  return (
    <Dialog onClose={() => props.onClose(true)} open={props.open}>
      <DialogTitle>Item Info</DialogTitle>
      <List sx={{ pt: 0 }}>
        <ListItem key={"start"}>
          <ListItemAvatar>
            From:
          </ListItemAvatar>
          <ListItemText primary={`${itemInfo.start} UTC`} />
        </ListItem>

        <ListItem key={"end"}>
          <ListItemAvatar>
            To:
          </ListItemAvatar>
          <ListItemText primary={`${itemInfo.end} UTC`} />
        </ListItem>

        <ListItem
          autoFocus
          button
          onClick={() => {
            props.onClose(true);
            console.log(props.eventData.eventId, props.selected.itemId);
            removeTimeItem(props.eventData, props.selected.itemId,props.setSelected);
            console.log("this item deleted:", props.selected);
          }}
        >
          <ListItemAvatar>
            <Avatar>
              <DeleteForeverIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Remove" />
        </ListItem>
      </List>
    </Dialog>
  );
}

ClickedItemDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};
