import React from 'react';
import { Card, Image, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { IProfileForFollowerOrFollowing } from '../../app/models/IProfile';

const ProfileCard: React.FC<{ profile: IProfileForFollowerOrFollowing }> = ({
  profile
}) => {
  return (
    <Card as={Link} to={`/profiles/${profile.userName}`}>
      <Image src={profile.image || '/assets/user.png'} />
      <Card.Content>
        <Card.Header>{profile.displayName}</Card.Header>
      </Card.Content>
      <Card.Content extra>
          {profile.followersCount ? (
            <div>
              <Icon name='user' />
              {profile.followersCount} Followers
            </div>
          ) : (
            <div></div>
          )}
      </Card.Content>
    </Card>
  );
};

export default ProfileCard;
