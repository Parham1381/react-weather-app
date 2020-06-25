/*
import * as React from "react";
import { NavBarState } from "../constants/types";
import { withRouter, Link } from "react-router-dom";
import { Utils } from "../utils";
import { Nav, Row, Col, Popover } from 'react-bootstrap';

export const NavBar: React.FC<any> = () => {
  const [] = React.useState<NavBarState>({ location: '', timestamp: 0 });

  const WeatherLink = withRouter(({ history }) => (
    <Link to='/' onClick={() => history.push('/')}>
      Weather
    </Link>
  ));

  const WeatherMapLink = withRouter(({ history }) => (
    <Link to='/map' onClick={() => history.push('/map')}>
      Map
    </Link>
  ));
  const MenuContent = withRouter(({ location }) => {
    const pathname = location.pathname;
    const urlPath = pathname.substring(1) === '' ? 'weather' : pathname.substring(1);

    return (
      <NavBar style={{ width: '18rem' }} defaultSelectedKeys={[`${urlPath}`]} mode='inline'>
        <Nav className="mr-auto">
          <Nav.Link key='weather'>
            <WeatherLink />
          </Nav.Link>
          <Nav.Link key='map'>
            <WeatherMapLink />
          </Nav.Link>
        </Nav>
      </NavBar>
    );
  });

  const NavBarMobile = (
    <div className='nav-bar-mobile'>
      <Row>
        <Col>
          <img src='../assets/favicon.ico' width='33' height='30' alt='' />
        </Col>
        <Col>
          <Popover id='main-popover' placement='bottom'>
            <Popover.Content>
              {<MenuContent />}
            </Popover.Content>
          </Popover>
        </Col>
      </Row>
    </div>
  );
  return <div>{Utils.isMobile() ? NavBarMobile : <NavBar />}</div>;
};
*/