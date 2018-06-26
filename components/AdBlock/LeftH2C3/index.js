import React from 'react';
import { Link } from 'react-router-dom';
import DynamicContent from '../../DynamicContent';
import { imageServer } from '../../../config/serviceAPI';

import * as styles from './styles.scss';

type Props = {
  Headline1: string,
  Headline2: string,
  CTALink1: string,
  CTALink2: string,
  CTAName1: string,
  CTAName2: string,
  TermsAndConditionsLink: string,
  TermsAndConditionsName: string,
  // BackGroundImage: string,
  ForeGroundImage: string
};

const LEFTH2C3 = (props: Props) => (
  // const style = {
  //   backgroundImage: `url(${imageServer}${props.BackGroundImage})`
  // };
  <div className={styles.heroContentBlock}>
    <div className={styles.content}>
      <div className={styles.img}>
        <div
          className={styles.imageblock}
          style={{
            backgroundImage: `url(${imageServer}${props.ForeGroundImage})`
          }}
        />
      </div>
      <DynamicContent
        tagName="div"
        attrs={{ className: styles.headline1 }}
        innerHtml={props.Headline1}
      />
      {/* <p>{props.Headline1}</p> */}
      <DynamicContent
        tagName="div"
        attrs={{ className: styles.headline2 }}
        innerHtml={props.Headline2}
      />
      <div className={styles.cta}>
        {props.CTAName1 && (
          <button className={styles.btnPrimary}>
            <Link to={props.CTALink1} className={styles.btnText}>
              {props.CTAName1}
            </Link>
          </button>
        )}
        {props.CTAName2 && (
          <button className={styles.btnSecondary}>
            <Link to={props.CTALink2} className={styles.btnText}>
              {props.CTAName2}
            </Link>
          </button>
        )}
      </div>
      {props.TermsAndConditionsName && (
        <Link to={props.TermsAndConditionsLink} className={styles.terms}>
          {props.TermsAndConditionsName}
        </Link>
      )}
    </div>

    <div className={styles.border} />
  </div>
);

export default LEFTH2C3;
