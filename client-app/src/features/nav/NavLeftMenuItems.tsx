import React from 'react';
import { Container, Menu, Button } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

interface IProps {
  visibile?: boolean;
  onPusherClick?: () => void;
}
export const NavLeftMenuItems: React.FC<IProps> = ({
  visibile,
  onPusherClick
}) => {
  return (
    <Container>
      <Menu.Item
        header
        exact
        as={NavLink}
        to='/'
        onClick={() => (onPusherClick ? onPusherClick!() : () => {})}
      >
        <img
          src='/assets/logo.png'
          alt='logo'
          style={{ marginRight: '10px' }}
          sizes='large'
        ></img>
        React Demo
      </Menu.Item>
      <Menu.Item
        name='Activities'
        as={NavLink}
        to='/activities'
        className='item'
        onClick={() => (onPusherClick ? onPusherClick!() : () => {})}
      />
      <Menu.Item>
        <Button
          positive
          content='Create Activity'
          as={NavLink}
          to='/createactivity'
          onClick={() => (onPusherClick ? onPusherClick!() : () => {})}
        ></Button>
      </Menu.Item>
    </Container>
  );
};

export default NavLeftMenuItems;
