/* @flow */

import React from 'react';
import type { Element } from 'react';
import styles from './styles.scss';
import { jsTrack } from '../../../containers/Analytics/ClickTrack';

type Props = { bottomLinks: Array<Object> };

export const trackFooterLink = (e, linkName) => {
  jsTrack.trackFooterNavMenu(linkName);
};
const LinkButton = ({ bottomLinks }: Props): Element<'div'> => (
  <div className={styles.foooterBottomLinks}>
    <ul>
      {bottomLinks &&
        bottomLinks.map(linkbutton => (
          <li key={linkbutton.id}>
            <a
              href={linkbutton.url}
              onClick={e => trackFooterLink(e, linkbutton.content)}
            >
              {linkbutton.content}
            </a>
          </li>
        ))}
    </ul>
  </div>
);

export default LinkButton;
