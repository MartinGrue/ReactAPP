import React, { Fragment, useContext, useEffect } from "react";
import { Segment, Header, Form, Button, Comment } from "semantic-ui-react";
import { Form as FinalForm, Field } from "react-final-form";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { Link } from "react-router-dom";
import TextAreaInput from "../../../app/common/form/TextAreaInput";
import { observer } from "mobx-react-lite";
import { formatDistance, parseISO } from "date-fns";

const ActivityDetailedChat = () => {
  const rootContext = useContext(RootStoreContext);
  const {
    connectToSignalRHub,
    stopSignalRHub,
    selectedActivity,
    addComment,
  } = rootContext.activityStore;

  useEffect(() => {
    connectToSignalRHub();
    return () => {
      stopSignalRHub();
    };
  }, [connectToSignalRHub, stopSignalRHub]);
  return (
    <Fragment>
      <Segment
        textAlign="center"
        attached="top"
        inverted
        color="teal"
        style={{ border: "none" }}
      >
        <Header>Chat about this event</Header>
      </Segment>
      <Segment attached>
        <Comment.Group>
          {selectedActivity &&
            selectedActivity.comments &&
            selectedActivity.comments.map((comment) => {
              return (
                <Comment key={comment.createdAt}>
                  <Comment.Avatar src={comment.image || "/assets/user.png"} />
                  <Comment.Content>
                    <Comment.Author
                      as={Link}
                      to={`/profile/${comment.userName}`}
                    ></Comment.Author>
                    <Comment.Metadata>
                      <div>
                        {formatDistance(
                          parseISO(comment.createdAt),
                          new Date()
                        )}
                      </div>
                    </Comment.Metadata>
                    <Comment.Text>{comment.body}</Comment.Text>
                  </Comment.Content>
                </Comment>
              );
            })}
          <FinalForm
            onSubmit={addComment}
            render={({ handleSubmit, submitting, form, pristine, invalid }) => (
              <Form onSubmit={() => handleSubmit()!.then(() => form.reset())}>
                <Field
                  name="body"
                  component={TextAreaInput}
                  rows={2}
                  placeholder="Add your comment"
                />
                <Button
                  disabled={invalid || pristine}
                  loading={submitting}
                  content="Add Reply"
                  labelPosition="left"
                  icon="edit"
                  primary
                />
              </Form>
            )}
          />
        </Comment.Group>
      </Segment>
    </Fragment>
  );
};

export default observer(ActivityDetailedChat);
