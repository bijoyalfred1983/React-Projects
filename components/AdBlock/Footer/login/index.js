/* @flow */
import React from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import styles from './styles.scss';

const textStyles = {
  floatingLabel: {
    fontSize: 16,
    fontWeight: 'normal',
    fontFamily: 'Helvetica Neue, Arial, sans-serif',
    color: '#5b5d5b',
    zIndex: 1,
    top: '16px',
    left: '10px',
    border: 'none'
  },
  floatingLabelFocus: {
    color: '#a9aaa8',
    marginTop: '10px'
  },
  floatingLabelShrink: {
    color: '#a9aaa8',
    left: '10px',
    marginTop: '10px'
  },
  errorUnderline: {
    border: '1px solid red',
    left: 0,
    bottom: 0,
    opacity: 1,
    display: 'block',
    width: '100%'
  },
  input: {
    paddingLeft: '16px',
    paddingRight: '10px',
    color: '#484848',
    marginTop: '0px',
    marginBottom: '0px',
    paddingTop: '14px',
    backgroundColor: 'white'
  },
  rootElement: {
    width: '100%',
    height: '48px',
    border: '1px solid #a9aaa8',
    marginBottom: '0px'
  },
  saveButton: {
    width: '179px',
    height: '48px',
    border: '1px solid #a9aaa8',
    backgroundColor: '#000',
    fontSize: '15px',
    fontWeight: '600',
    marginTop: '0',
    float: 'right'
  },
  arrowBtn: {
    width: '64px',
    height: '48px',
    border: '1px solid #a9aaa8',
    backgroundColor: '#000',
    fontSize: '15px',
    fontWeight: '600',
    marginTop: '0',
    float: 'right',
    minWidth: '30px',
    paddingTop: '4px'
  }
};
const FooterLoginComponent = () => (
  <div className={styles.footerWrapper}>
    <section className={styles.loginSection}>
      <div className={styles.leftContent}>
        <h4>GET IN THE ZONE</h4>
        <div>Subscribe to get the latest deals, promotions, and offerings.</div>
      </div>
      <div className={styles.loginHolder}>
        <div className={styles.loginContent}>
          <div className={styles.fieldWrapper}>
            <div className="row">
              <div className={`col m7 s10 ${styles.printMediaWidth}`}>
                <TextField
                  id="login"
                  type="text"
                  floatingLabelText="Email"
                  underlineShow={false}
                  floatingLabelStyle={textStyles.floatingLabel}
                  floatingLabelFocusStyle={textStyles.floatingLabelFocus}
                  floatingLabelShrinkStyle={textStyles.floatingLabelShrink}
                  errorStyle={textStyles.error}
                  inputStyle={textStyles.input}
                  style={textStyles.rootElement}
                  underlineFocusStyle={textStyles.errorUnderline}
                />
              </div>
              <div className="col m4 hide-on-small-only">
                <FlatButton
                  label="SIGN UP"
                  type="submit"
                  style={textStyles.saveButton}
                  labelStyle={{
                    color: '#fff',
                    fontWeight: '500',
                    fontFamily: 'AutoZoneCond-Medium, Arial, sans-serif',
                    fontSize: '15px'
                  }}
                />
              </div>
              <div className="col s2 m4 hide-on-med-and-up">
                <FlatButton
                  label="ar"
                  type="submit"
                  style={textStyles.arrowBtn}
                  icon={
                    <img
                      src="/images/footer/arrow-right.svg"
                      alt="roundedPlus"
                      role="presentation"
                    />
                  }
                  labelStyle={{
                    color: '#fff',
                    fontWeight: '500',
                    fontFamily: 'AutoZoneCond-Medium, Arial, sans-serif',
                    fontSize: '15px'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default FooterLoginComponent;
