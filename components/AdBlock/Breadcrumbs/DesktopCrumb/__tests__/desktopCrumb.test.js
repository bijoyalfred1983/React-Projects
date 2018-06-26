import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import DesktopCrumb from '../desktopCrumbComponent';

describe('<DesktopCrumb />', () => {
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

  test('renders on desktop correctly', () => {
    const wrapper = mount(<DesktopCrumb {...PROPS} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  test('onClick renders correctly', () => {
    const wrapper = shallow(<DesktopCrumb {...PROPS} />);
     wrapper.find('#breadcrumbItem').at(0).simulate('click');
     expect(toJson(wrapper)).toMatchSnapshot();

   });

});
