import React from 'react';
import { SpecialBtn } from '../EditSidebar_styles';

export default (mode, comp) => {
  const { changeContent } = comp.props;
  switch (mode) {
    case 'Moduły':
      return (
        <div>
          <SpecialBtn className="fa fa-plus" aria-hidden="true" onClick={() => { changeContent({ mode: 'Dodaj moduł' }); }} />
        </div>
      );

    case 'Dodaj moduł':
      return (
        <div>
          <SpecialBtn className="fa fa-arrow-left" aria-hidden="true" onClick={() => { changeContent({ mode: 'Moduły' }); }} />
        </div>
      );

    case 'Ustawienia':
      return (
        <div>
          <SpecialBtn
            className="fa fa-arrow-left"
            aria-hidden="true"
            onClick={() => { changeContent({ mode: 'Moduły' }); comp.props.closeDialog(); }}
          />
        </div>
      );
    default: return null;
  }
};
