import styled from 'styled-components';
import TextField from 'redux-form-material-ui/lib/TextField';
import SelectField from 'material-ui/SelectField';
import Checkbox from 'material-ui/Checkbox';
import { colorPalette, media } from '../../utils/constants/styles';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  background-color: ${colorPalette.primary2Color};

  @media (max-width: 800px) {
    align-items: flex-start;
    padding-top: 120px;
  }

  @media (max-height: 900px) {
    align-items: flex-start;
    padding-top: 120px;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Form = styled.form`
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  width: 750px;
  padding: 40px 50px;
  border-radius: 2px;
  background-color: #fff;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);

  @media (max-width: 800px) {
    width: 448px;
    justify-content: center;
  }

  @media (max-width: 500px) {
    width: 328px;
    padding: 40px 10px;
  }
`;

export const Header = styled.h1`
  width: 650px;
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: 500;
  text-align: center;
`;

export const StyledTextField = styled(TextField)`
  width: 295px !important;
  font-weight: 500 !important;
  ${media.small`
    width: 270px !important;
  `}
`;

export const StyledSelectField = styled(SelectField)`
  width: 295px !important;
  font-weight: 500 !important;
  ${media.small`
    width: 270px !important;
  `}
`;

export const StyledCheckbox = styled(Checkbox)`
  margin-top: 30px;
  width: 100% !important;

  label {
    font-size: 16px;
  }

  @media (max-width: 800px) {
    width: 295px !important;
  }

  ${media.small`
    width: 270px !important;
  `}
`;

export const ButtonContainer = styled.div`
  margin-top: 30px;
  width: 100%;
  display: flex;
  justify-content: center;
  order: 11;
`;

export const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  color: #fff;

  @media (max-width: 800px) {
    margin-bottom: 60px;
  }
`;

export const BottomText = styled.p`
  margin-bottom: 5px;
  font-size: 18px;
`;
