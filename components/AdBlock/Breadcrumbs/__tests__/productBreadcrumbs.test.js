import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import Breadcrumbs from '../index';

describe('<Breadcrumbs />', () => {
  let PROPS;
  beforeEach(() => {
    PROPS = {
      data: [
        {
          '@class': 'com.autozone.diy.vo.AZBreadcrumbVO',
          displayName: 'Parts',
          url: '/Parts'
        },
        {
          '@class': 'com.autozone.diy.vo.AZBreadcrumbVO',
          displayName: 'Brakes And Traction Control',
          url: '/parts/brakes-and-traction-control'
        },
        {
          '@class': 'com.autozone.diy.vo.AZBreadcrumbVO',
          displayName: 'Disc Brake System',
          url: '/parts/brakes-and-traction-control/disc-brake-system'
        },
        {
          '@class': 'com.autozone.diy.vo.AZBreadcrumbVO',
          displayName: 'Brake Pads',
          url: '/brakes-and-traction-control/brake-pads'
        },
        {
          '@class': 'com.autozone.diy.vo.AZBreadcrumbVO',
          displayName: 'Duralast PlatinumBattery_BT',
          url: ''
        }
      ]
    };
  });

  test('renders on breadcrumbs correctly', () => {
    const wrapper = mount(<Breadcrumbs {...PROPS} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  test('renders error when breadcrumbs is empty', () => {
    const LOCAL_PROPS = {
      data: []
    };
    const wrapper = mount(<Breadcrumbs {...LOCAL_PROPS} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
