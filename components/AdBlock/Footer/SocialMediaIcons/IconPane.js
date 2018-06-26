/* @flow */

import React from 'react';
import type { Element } from 'react';
import styles from './styles.scss';

type Props = { btnContainer: Array<Object> };

const IconPane = ({ btnContainer }: Props): Element<'div'> => (
  <div className={styles.footerTop}>
    <ul className="">
      {btnContainer.map(navbutton => (
        <li key={navbutton.id}>
          <a href={navbutton.url}>
            <img src={navbutton.iconUrl} alt="" />
          </a>
        </li>
      ))}
    </ul>
  </div>
);

export default IconPane;
