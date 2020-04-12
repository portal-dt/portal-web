import React from 'react';

import { useDispatch } from 'react-redux';
import { changeLang } from '../../actions/actions';
import { useIntl } from 'react-intl';

import { messages } from './messages';
import './LanguageSwitcher.less';

const languages = [
  {label: 'English', code: 'en'},
  {label: 'Svenska', code: 'sv'},
  {label: 'Norsk', code: 'no'}
];

const LanguageSwitcher = () => {

  const dispatch = useDispatch();
  const { formatMessage } = useIntl();
  const renderOptions = languages.map((language, index) => <option className="language-select__option" key={index} value={language.code}>{language.label}</option>);

  const handleChange = (event) => {
    dispatch(changeLang(event.target.value));
  };

  return (
    <div className="language-select">
      <span className="language-select__label">{formatMessage(messages.languages)}:</span>
      <select onChange={handleChange} className="language-select__dropdown">
        {renderOptions}
      </select>
    </div>
  );
};

export default LanguageSwitcher;
