import React, { Component } from 'react';
import { withRouter } from 'react-router';
import connect from 'react-redux/lib/connect/connect';
import NotificationSystem from 'react-notification-system';
import Nav from '../../components/Nav/Nav';
import './index.scss';

class Index extends Component {
  componentDidMount() {
    this._notificationSystem = this.notificationSystem;
  }

  componentWillReceiveProps(nextProps) {
    const notification = nextProps.notifications[nextProps.notifications.length - 1];
    if (this.props.notifications !== nextProps.notifications) this.addNotification(notification);
  }

  addNotification = (notification) => {
    this._notificationSystem.addNotification({
      ...notification,
      position: 'tc',
    });
  };

  render() {
    const path = this.props.location.pathname;
    const bodyMargin = (path !== '/' && path !== '/rejestracja' && path !== '/logowanie' && !path.includes('/odzyskiwanie_hasla') && !path.includes('/potwierdz_email'))
      ? { marginTop: 60, minHeight: 'calc(100vh - 60px)' }
      : { minHeight: '100vh' };

    return (
      <div className="index__container">
        <Nav />
        <div className="index__body" style={bodyMargin}>
          {this.props.children}
        </div>
        <NotificationSystem ref={(c) => { this.notificationSystem = c; }} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    notifications: state.notifications,
  };
}

export default withRouter(connect(mapStateToProps)(Index));
