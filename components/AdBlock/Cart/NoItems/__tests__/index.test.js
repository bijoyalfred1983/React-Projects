import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { NoItemsComponent as NoItems } from '../index';

jest.mock('react-router-dom', () => ({
  Link:() => null
}));

describe('<NoItems /> container', () => {
  test('renders without breaking', () => {
  	const staticLabelData = {'test':'test'};
    const wrapper = mount(<NoItems staticLabelData={staticLabelData}/>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
