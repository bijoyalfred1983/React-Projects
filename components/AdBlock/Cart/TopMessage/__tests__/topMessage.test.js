import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import TopMessage from '../index';

describe('<TopMessage />', () => {
  let PROPS;
  beforeEach(() => {
    const orderSummaryData = {
      totalSavings: '20',
      couponVOList: {
        couponList: [
            {
              name: 'test'
            }
          ]
      }
    }
    PROPS = {
      data: [1, 2, 3],
      orderSummaryData
    };
  });

  test('renders on desktop/mobile correctly', () => {
     global.utagData = {
    topmsg:false
  }
    const wrapper = mount(<TopMessage {...PROPS} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  test('renders on desktop/mobile correctly when flag = ERROR', () => {
     global.utagData = {
    topmsg:false
  }
    PROPS.flag = 'ERROR';
    const wrapper = mount(<TopMessage {...PROPS} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  test('renders on desktop/mobile correctly when flag = SUCCESS', () => {
     global.utagData = {
  }
    PROPS.flag = 'SUCCESS';
    PROPS.orderSummaryData.totalSavings = 20;
    const wrapper = mount(<TopMessage {...PROPS} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
