import React, { PureComponent } from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';
import Granim from 'granim';
import { detectIE } from '../../js/utils';
import { Background, Container, Content, Logo, Text, Buttons, StyledRaisedButton } from './Hero_styles';

class Hero extends PureComponent {
  componentDidMount() {
    this.granim = new Granim(this.bgConfig);
  }

  bgConfig = {
    element: '#background',
    opacity: [0.88, 0.92, 0.96],
    direction: 'top-bottom',
    states: {
      'default-state': {
        gradients: [
          ['#101D7D', '#202D7D', '#1D3093'],
        ],
        transitionSpeed: 10000,
      },
    },
  }

  render() {
    const isMobile = (window.screen.width <= 700);
    return (
      <Container isIE={detectIE()}>
        <Background id="background" />
        <Content>
          <Logo src="./img/logo-instudy-rectangle.png" alt="Logo inStudy" />
          <Text>Więcej niż studia!</Text>
          <Buttons>
            <StyledRaisedButton
              label="Odkryj inicjatywy"
              onClick={() => { this.props.history.push('/inicjatywy'); }}
            />
            {!isMobile &&
              <StyledRaisedButton
                label="Załóż konto"
                onClick={() => { this.props.history.push('/rejestracja'); }}
              />
            }
          </Buttons>
        </Content>
      </Container>
    );
  }
}

export default muiThemeable()(Hero);
