import React from 'react';

import { connect } from 'react-redux';
import { changeLang } from '../../actions/actions';
import { selectedLangSelector } from '../../selectors/selectors';
import { useIntl } from 'react-intl';

import { messages } from './messages';
import './LanguageSwitcher.less';

const languages = [
  {label: 'English', code: 'en'},
  {label: 'Svenska', code: 'sv'},
  {label: 'Norsk', code: 'no'}
];

const LanguageSwitcher = (props) => {
  const { formatMessage } = useIntl();
  const renderOptions = languages.map((language, index) => <option className="language-select__option" key={index} value={language.code}>{language.label}</option>);

  return (
    <div className="language-select">
      <span className="language-select__label">{formatMessage(messages.languages)}:</span>
      <select onChange={props.onChange} className="language-select__dropdown">
        {renderOptions}
      </select>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    language: selectedLangSelector(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChange: event => dispatch(changeLang(event.target.value))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LanguageSwitcher);