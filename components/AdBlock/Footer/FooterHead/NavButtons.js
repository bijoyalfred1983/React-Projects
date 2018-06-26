/* @flow */

import React from 'react';
import { Link } from 'react-router-dom';
import type { Element } from 'react';
import styles from './styles.scss';
import { jsTrack } from '../../../containers/Analytics/ClickTrack';

type Props = { btnContainer: Array<Object> };

export const trackFooterLink = (e, linkName) => {
  jsTrack.trackFooterNavMenu(linkName);
};

const NavButtons = ({ btnContainer }: Props): Element<'div'> => (
  <div className={styles.footerTop}>
    <ul className={styles.liWidthPrint}>
      {btnContainer.map(navbutton => (
        <li className={`col m4 s12 ${navbutton.className}`} key={navbutton.id}>
          <Link
            to={navbutton.linkTo}
            onClick={e => trackFooterLink(e, navbutton.content)}
          >
            <img src={navbutton.iconUrl} alt="not found" />
            <span>{navbutton.content.toUpperCase()}</span>
            <img
              src="/images/footer/right.svg"
              alt=""
              className={`hide-on-small-only ${styles.rightArrow}`}
            />
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default NavButtons;
