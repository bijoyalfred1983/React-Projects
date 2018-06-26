import React from 'react';
import { mount } from 'enzyme';
import { MuiThemeProvider } from 'material-ui/styles';
import RaisedButton from 'material-ui/RaisedButton';
import toJson from 'enzyme-to-json';
import PromoCodeItem from '../';

describe('<PromoCodeItem />', () => {
	let PROPS;
	PROPS = {
      staticLabelData: { test: 'aa' }
  }
  test('renders correctly PromoCodeItem', () => {
    const wrapper = mount(
      <MuiThemeProvider>
        <PromoCodeItem {...PROPS}/>
      </MuiThemeProvider>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
