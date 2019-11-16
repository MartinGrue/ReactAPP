import React from 'react';
import { Card, Image, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { IProfileForFollowerOrFollowing } from '../../app/models/IProfile';

const ProfileCard: React.FC<{ member: IProfileForFollowerOrFollowing }> = ({
  member
}) => {
  return (
    <Card as={Link} to={`/profile/${member.userName}`}>
      <Image src={member.image || '/assets/user.png'} />
      <Card.Content>
        <Card.Header>{member.displayName}</Card.Header>
      </Card.Content>
      <Card.Content extra>
        <div>
          <Icon name='user' />
          22 Followers
        </div>
      </Card.Content>
    </Card>
  );
};

export default ProfileCard;
