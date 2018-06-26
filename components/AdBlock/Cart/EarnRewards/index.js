/* @flow */

import React from 'react';
import styles from './styles.scss';
import { fetchStaticLabel } from '../../../containers/App';

type Props = {
  data: Object,
  tablet: boolean,
  staticLabelData: Object
};

const anonymousUserMsg = (rewardsInfo, staticLabel) => {
  if (rewardsInfo.rewardsCreditEligible) {
    return (
      <div className={styles.qualifilesText}>
        <span>
          {fetchStaticLabel(
            'label_cart_rewards_ThisOrderQualifiesForRewardsToClaimTheEarnCredits',
            staticLabel
          )}
        </span>
        <a href="/signin">
          {fetchStaticLabel('label_cart_rewards_LogIn', staticLabel)}
        </a>
        <span>
          &nbsp;{fetchStaticLabel(
            'label_cart_rewards_toYourExistingAccountOrSignnupAfterCheckout',
            staticLabel
          )}
        </span>
      </div>
    );
  }
  return (
    <div className={styles.qualifilesText}>
      <span>
        This order does not qualify for a rewards credit. Spend an additional $
      </span>
      {rewardsInfo.requiredAmountToQualify}
      <span> to qualify. To claim and earn credits </span>
      <a href="/signin">
        {fetchStaticLabel('label_cart_rewards_LogIn', staticLabel)}
      </a>
      <span>
        &nbsp;{fetchStaticLabel(
          'label_cart_rewards_toYourExistingAccountOrSignnupAfterCheckout',
          staticLabel
        )}
      </span>
    </div>
  );
};

const loggedInUserMsg = (rewardsInfo, staticLabel) => {
  if (rewardsInfo.rewardsAccountLinked) {
    if (rewardsInfo.rewardsCreditEligible) {
      if (parseFloat(rewardsInfo.rewardsBalanceInfo.rewardBalance) > 0) {
        return (
          <div className={styles.qualifilesText}>
            {fetchStaticLabel('label_checkout_os_YouHave', staticLabel)} ${
              rewardsInfo.rewardsBalanceInfo.rewardBalance
            }{' '}
            rewards rewards credit on your account #{
              rewardsInfo.rewardsBalanceInfo.loyaltyCardNumber
            }. During checkout you can use your rewards credit to pay for your
            order.
          </div>
        );
      }
      return (
        <div className={styles.qualifilesText}>
          You have ${rewardsInfo.rewardsBalanceInfo.rewardBalance} rewards
          credit on your account #{
            rewardsInfo.rewardsBalanceInfo.loyaltyCardNumber
          }. This order qualfies for rewards points that can be used towards
          your next order.
        </div>
      );
    }
    return (
      <div className={styles.qualifilesText}>
        You have ${rewardsInfo.rewardsBalanceInfo.rewardBalance} rewards credit
        on your account #{rewardsInfo.rewardsBalanceInfo.loyaltyCardNumber}.
        This order does not qualify for a rewards credit. Spend an additional ${
          rewardsInfo.requiredAmountToQualify
        }{' '}
        to qualify.
      </div>
    );
  }
  return (
    <div className={styles.qualifilesText}>
      Doesn’t look like you have rewards linked with your My Zone account. Enter
      an existing rewards number at checkout or register for rewards at order
      confirmation to claim rewards credit for this order.
    </div>
  );
};

const renderMessage = (rewardsInfo, staticLabel) => {
  if (rewardsInfo.loggedInUser) {
    return loggedInUserMsg(rewardsInfo, staticLabel);
  }
  return anonymousUserMsg(rewardsInfo, staticLabel);
};

export default (props: Props) => {
  const rewardsInfo = props.data;
  const balance =
    rewardsInfo.rewardsBalanceInfo &&
    rewardsInfo.rewardsBalanceInfo.rewardBalance
      .toFixed(2)
      .toString()
      .split('.');
  const staticLabel = props.staticLabelData ? props.staticLabelData : {};
  const lblEarnAutozoneRewards = fetchStaticLabel(
    'label_cart_rewards_EarnAutozoneRewards',
    staticLabel
  );
  return (
    <div
      style={{
        display: props.tablet && props.tablet === true ? 'none' : 'block'
      }}
      className={styles.earnRewardsContainer}
    >
      <div className={styles.earnRewardsBox}>
        <div className={styles.rewardsTextBoxMob}>
          <span className={styles.imageContent}>
            <img
              className={styles.AZ_Rewards_Card}
              src="/images/autoZoneRewards.png"
              alt="AZ_rewards"
            />
          </span>
          <span
            className={`${styles.rewardsTextMob} ${styles.rewardsFormatText}`}
          >
            <span>{lblEarnAutozoneRewards}</span>
          </span>
        </div>
        <div className={styles.contentFlex}>
          <div className={styles.rewardsText}>
            <span>{lblEarnAutozoneRewards}</span>
            {rewardsInfo.loggedInUser &&
              balance &&
              balance.length > 0 && (
                <span className={styles.rewards_balance_heading}>
                  <sup className={styles.superScript}>$</sup>
                  {balance[0]}
                  <sup className={styles.superScript}>{balance[1]}</sup>
                </span>
              )}
          </div>
          {renderMessage(rewardsInfo, staticLabel)}
        </div>
      </div>
    </div>
  );
};
