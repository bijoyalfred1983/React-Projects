/* flow */
import React from 'react';
import Dialog from 'material-ui/Dialog';
import styles from './styles.scss';
import { imageServer } from '../../../config/serviceAPI';
import { MiniCartModalContent } from './MiniCartModalContent';
import { concatUrl } from '../../../utils/common';

/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
type Props = {
  isModalOpen: boolean,
  staticData: Object,
  image: any,
  successData: Object,
  productDetails: any,
  miniCartData: Object,
  closeStoreModal: () => void,
  url: string
};

export default (props: Props) => (
  <Dialog
    modal
    className={styles.storeDialogClass}
    open={props.isModalOpen}
    overlayClassName={styles.overlayClass}
    bodyClassName={styles.dialogBodyClass}
    contentClassName={styles.customContentStyle}
  >
    <MiniCartModalContent
      miniCartData={props.successData}
      staticData={props.staticData}
      image={props.image && concatUrl(imageServer, props.image)}
      productDetails={props.productDetails}
      url={props.url}
      cartTotalData={props.miniCartData}
      closeStoreModal={props.closeStoreModal}
    />
  </Dialog>
);
