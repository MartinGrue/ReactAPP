import React from "react";
import { Card, Image, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { IProfileForFollowerOrFollowing } from "../../app/models/IProfile";
import { observer } from "mobx-react-lite";

const ProfileCard: React.FC<{ ffprofile: IProfileForFollowerOrFollowing }> = ({
  ffprofile,
}) => {
  return (
    <Card
      as={Link}
      to={`/profiles/${ffprofile.userName}`}
      data-cy="profilecard"
    >
      <Image src={ffprofile.image || "/assets/user.png"} wrapped />
      <Card.Content>
        <Card.Header>{ffprofile.displayName}</Card.Header>
      </Card.Content>
      <Card.Content extra>
        {ffprofile.followersCount ? (
          <div>
            <Icon name="user" />
            {ffprofile.followersCount} Followers
          </div>
        ) : (
          <div></div>
        )}
      </Card.Content>
    </Card>
  );
};

export default observer(ProfileCard);
