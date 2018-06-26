/* @flow */

import React from 'react';
import type { Element } from 'react';
import styles from './styles.scss';
import { jsTrack } from '../../../containers/Analytics/ClickTrack';

type Props = { footerColumn: Array<Object> };

export const trackFooterLink = (e, linkName) => {
  jsTrack.trackFooterNavMenu(linkName);
};

const FooterList = ({ footerColumn }: Props): Element<'div'> => (
  <div className={styles.footerBody}>
    <div className={`${footerColumn.className}`}>
      <div className={styles.heading}>{footerColumn.title.toUpperCase()}</div>
      <ul className={styles.list}>
        {footerColumn.list.map(listItem => (
          <li key={listItem.id}>
            <a
              href={listItem.URL}
              onClick={e => trackFooterLink(e, listItem.content)}
            >
              {' '}
              {listItem.content}
            </a>
          </li>
        ))}
      </ul>
      <hr className="hide-on-med-and-up" />
    </div>
  </div>
);

export default FooterList;
