/* @flow */
import React, { PureComponent } from 'react';
import Item from './Item';

type Props = {
  items: Array<any>
};

export default class CartItems extends PureComponent<Props> {
  render() {
    return this.props.items.map(item => (
      <Item key={item.commerceItemId} data={item} />
    ));
  }
}
