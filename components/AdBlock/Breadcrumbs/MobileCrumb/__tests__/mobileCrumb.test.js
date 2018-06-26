import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import MobileCrumb from '../mobileCrumbComponent';

describe('<MobileCrumb />', () => {
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

  test('renders on mobile correctly', () => {
    const wrapper = mount(<MobileCrumb {...PROPS} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  test('on click of ellipsis show expanded view', () => {
    const wrapper = mount(<MobileCrumb {...PROPS} />);
    wrapper.instance().onClickEllipsis();
  });
});
