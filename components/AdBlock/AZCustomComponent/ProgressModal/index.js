import React from 'react';
// import Dialog from 'material-ui/Dialog';
import styles from './styles.scss';

export default class ProgressModal extends React.Component {
  state = {};
  componentWillUnmount() {
    global.scrollTo(0, 0);
  }
  render() {
    return (
      <div className={styles.dialog}>
        <img
          className={styles.modalGif}
          src="/images/AZ_Loading_optimized_SMALL.gif"
          alt="loading..."
        />
      </div>
    );
  }
}
