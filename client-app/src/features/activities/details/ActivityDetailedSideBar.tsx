import { Fragment } from "react";
import * as React from "react";
import { Segment, List, Item, Label, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { IAttendee } from "../../../app/models/IActivity";
import { observer } from "mobx-react-lite";

interface IProps {
  attendees: IAttendee[];
}
const ActivityDetailedSidebar: React.FC<IProps> = ({ attendees }) => {
  return (
    <Fragment>
      <Segment
        textAlign="center"
        style={{ border: "none" }}
        attached="top"
        secondary
        inverted
        color="teal"
      >
        {attendees.length}{" "}
        {attendees.length === 1 ? "Person is going" : "People are going"}
      </Segment>

      <Segment attached>
        <List relaxed divided>
          {attendees.map((attendee) => (
            <List.Item
              cy-data="SideBarItem"
              as={Link}
              to={`/profiles/${attendee.userName}`}
              key={attendee.userName}
              style={{ position: "relative" }}
            >
              {attendee.isHost && (
                <Item.Description>
                  <Label
                    ribbon="right"
                    color="orange"
                    style={{ position: "absolute" }}
                  >
                    Host
                  </Label>
                </Item.Description>
              )}
              <Image
                circular
                size="tiny"
                src={attendee.image || "/assets/user.png"}
              ></Image>

              <Item.Content verticalAlign="middle">
                <Item.Header as="h3">{attendee.userName}</Item.Header>
                {attendee.following && (
                  <Item.Extra style={{ color: "orange" }}>Following</Item.Extra>
                )}
              </Item.Content>
            </List.Item>
          ))}
        </List>
      </Segment>
    </Fragment>
  );
};

export default observer(ActivityDetailedSidebar);
