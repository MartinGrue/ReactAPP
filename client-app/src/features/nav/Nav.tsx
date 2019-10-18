import React from 'react';
import { Menu, Container, Button } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { NavLink } from 'react-router-dom';

const Nav: React.FC = () => {
  return (
    <div>
      <Menu fixed='top' inverted>
        <Container>
          <Menu.Item header exact as={NavLink} to='/'>
            <img
              src='/assets/logo.png'
              alt='logo'
              style={{ marginRight: '10px' }}
            ></img>
            React Demo
          </Menu.Item>
          <Menu.Item name='Activities' as={NavLink} to='/activities'/>
          <Menu.Item>
            <Button
              positive
              content='Create Activity'
              as={NavLink} to='/createactivity'
            ></Button>{' '}
          </Menu.Item>
        </Container>
      </Menu>
    </div>
  );
};

export default observer(Nav);
