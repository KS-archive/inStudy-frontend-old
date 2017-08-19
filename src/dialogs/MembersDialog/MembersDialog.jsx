import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import ReactMarkdown from 'react-markdown';
import './membersDialog.scss';

export default class MembersDialog extends Component {
  renderSocials = () => this.props.socials.map(social => (
    <a className={`membersDialog__socialCircle social__${social.name} bg borderHover textHover`} href={social.link} key={social.name}>
      <i className={`fa fa-${social.name}`} aria-hidden="true" />
    </a>
  ));

  render() {
    console.log(this.props);
    return (
      <Dialog
        open={this.props.open}
        onRequestClose={this.props.closeDialog}
        className="membersDialog__modal"
        bodyClassName="membersDialog__container"
        autoScrollBodyContent
      >
        <div className="membersDialog__image" style={{ backgroundImage: `url(${this.props.coverImage})` }} />
        <h3 className="membersDialog__name">{`${this.props.firstname} ${this.props.surname}`}</h3>
        {(this.props.role) &&
          <p className="membersDialog__role" style={{ color: this.props.color }}>{this.props.role}</p>
        }
        {(this.props.socials && this.props.socials.length !== 0 && this.props.description) &&
          <div className="membersDialog__line" />
        }
        {(this.props.description) &&
          <p className="membersDialog__description">{this.props.description}</p>
        }
        {(this.props.socials && this.props.socials.length !== 0) &&
          <div className="membersDialog__socials">
            {this.renderSocials()}
          </div>
        }
      </Dialog>
    );
  }
}
