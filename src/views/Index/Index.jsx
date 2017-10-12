import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';
import connect from 'react-redux/lib/connect/connect';
import NotificationSystem from 'react-notification-system';
import Nav from '../../components/Nav/Nav';
import { Container, Body } from './Index_styles';

class Index extends PureComponent {
  componentDidMount() {
    this._notificationSystem = this.notificationSystem;
  }

  componentWillReceiveProps(nextProps) {
    this.innerBody.scrollTop = 0;
    const notification = nextProps.notifications[nextProps.notifications.length - 1];
    if (this.props.notifications !== nextProps.notifications) this.addNotification(notification);
  }

  addNotification = (notification) => {
    this._notificationSystem.addNotification({
      ...notification,
      position: 'tc',
      autoDismiss: 8,
    });
  };

  render() {
    const path = this.props.location.pathname;
    const isNormalPath = (
      path !== '/' &&
      path !== '/rejestracja' &&
      path !== '/logowanie' &&
      !path.includes('/odzyskiwanie_hasla') &&
      !path.includes('/potwierdz_email'));

    return (
      <Container>
        <Nav />
        <Body
          isNormalPath={isNormalPath}
          id="appContainer"
          innerRef={(innerBody) => { this.innerBody = innerBody; }}
        >
          {this.props.children}
        </Body>
        <NotificationSystem ref={(c) => { this.notificationSystem = c; }} />
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    notifications: state.notifications,
  };
}

export default withRouter(connect(mapStateToProps)(Index));
