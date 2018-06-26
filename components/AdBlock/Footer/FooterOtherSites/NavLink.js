/* @flow */

import React from 'react';
import type { Element } from 'react';
import styles from './styles.scss';
import { jsTrack } from '../../../containers/Analytics/ClickTrack';

type Props = { NavLinks: Array<Object> };

export const trackFooterLink = (e, linkName) => {
  jsTrack.trackFooterNavMenu(linkName);
};

const NavLink = ({ NavLinks }: Props): Element<'div'> => (
  <div className={styles.footerOther}>
    <div className={styles.listHolder}>
      <ul className={styles.list}>
        {NavLinks.map(navlink => (
          <li key={navlink.id}>
            <a
              href={navlink.URL}
              onClick={e => trackFooterLink(e, navlink.content)}
            >
              {navlink.content}
            </a>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default NavLink;
