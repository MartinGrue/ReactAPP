import React from 'react';
import { Container, Menu, Button } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

export const NavLeftMenuItems = () => {
  return (
      <Container>
        <Menu.Item header exact as={NavLink} to='/'>
          <img
            src='/assets/logo.png'
            alt='logo'
            style={{ marginRight: '10px' }}
            sizes='large'
          ></img>
          React Demo
        </Menu.Item>
        <Menu.Item name='Activities' as={NavLink} to='/activities' />
        <Menu.Item>
          <Button
            positive
            content='Create Activity'
            as={NavLink}
            to='/createactivity'
          ></Button>
        </Menu.Item>
      </Container>
  );
};

export default NavLeftMenuItems;
