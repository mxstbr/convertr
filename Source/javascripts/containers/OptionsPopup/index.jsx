import React, { Component } from 'react';

export default class OptionsPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: props.settings,
      showAdvanced: false,
    };
    chrome.storage.onChanged.addListener(this.onStoreChange.bind(this));
  }

  onStoreChange(data) {
    this.setState({ settings: data.settings.newValue });
  }

  toggleMode() {
    this.setState({ showAdvanced: !this.state.showAdvanced })
  }

  handleInputChange(option) {
    return (e) => {
      this.setOption(option, e.target.value);
    };
  }

  handleCheckboxChange(option) {
    return (e) => {
      this.setOption(option, e.target.checked);
    };
  }

  setOption(option, value) {

    // FIXME: not the best place to put validations
    if (option === 'decimalPlaces') {
      value = Math.max(0, Math.min(value, 20));
    }

    const settings = Object.assign({}, this.state.settings, { [option]: value });
    chrome.storage.sync.set({ settings: settings });
  }

  checkbox(label, option) {
    return (
      <label className="setting">
        <input type="checkbox" checked={this.state.settings[option]} onChange={this.handleCheckboxChange(option)} />
        {label}
      </label>
    );
  }

  renderAdvanced() {
    return (
      <div className="tab tab--advanced">
        {this.checkbox('Length', 'length')}
        {this.checkbox('Mass', 'mass')}
        {this.checkbox('Volume', 'volume')}
        {this.checkbox('Temperature', 'temperature')}
        {this.checkbox('Speed', 'speed')}

        <label className="setting">
          <input id="decimalplaces" type="number" min="0" max="99" value={this.state.settings.decimalPlaces} onChange={this.handleInputChange('decimalPlaces')} />
          Decimal places (this setting requires a page refresh)
        </label>
      </div>
    );
  }

  renderBeginner() {
    return (
      <div className="tab tab--beginner">
        {this.checkbox('Imperial to metric', 'metric')}
      </div>
    );
  }

  render() {
    const advancedButtonText = this.state.showAdvanced ? 'basic options' : 'advanced options';
    return (
      <div className="options-popup">
        <a className="button--advanced" onClick={this.toggleMode.bind(this)}>{advancedButtonText}</a>
        {this.state.showAdvanced ? this.renderAdvanced() : this.renderBeginner()}
      </div>
    );
  }
}
