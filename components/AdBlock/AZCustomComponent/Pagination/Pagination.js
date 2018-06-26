/* @flow */
import React from 'react';
import FlatPagination from 'material-ui-flat-pagination';
import { withRouter } from 'react-router-dom';
import styles from './styles.scss';

type Props = {
  total: number,
  limit: number,
  getPaginatedList: (Array<Object>) => void,
  currentOffSet?: number,
  getPageValues: Function
};

type State = {
  offset: number
};

export class PaginationComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      offset: this.props.currentOffSet
    };
  }

  handleClick(offset: number) {
    this.setState({ offset });
    const limit = offset + this.props.limit;
    global.scrollTo(0, 0);
    this.props.getPaginatedList(offset, limit);
    this.props.getPageValues(offset, limit);
  }

  render() {
    const isMobile = global.innerWidth <= 1139;
    const paginationSytle = {
      style: {
        color: 'rgb(0,0,0) !important',
        height: '25px',
        marginTop: '12px',
        padding: '0 5px',
        lineHeight: '1px !important'
      },
      activeLink: {
        color: 'rgb(0,0,0)',
        fontWeight: 'bolder',
        fontSize: isMobile ? '12px' : '16px',
        padding: '0 5px',
        margin: isMobile ? '0 7px' : '0 10px',
        borderBottom: '3px solid rgb(242,97,0)'
      },
      otherLink: {
        color: 'rgb(160,160,160)',
        fontWeight: 'bolder',
        fontSize: isMobile ? '12px' : '16px',
        padding: isMobile ? '0 5px' : '0 10px',
        margin: isMobile ? '0 7px' : '0 10px'
      },
      next: {
        color: 'rgb(160,160,160)'
      }
    };
    return (
      <div className={styles.pagination}>
        <FlatPagination
          style={paginationSytle.style}
          offset={this.state.offset}
          limit={this.props.limit}
          total={this.props.total}
          reduced={isMobile}
          nextPageLabel={
            <span>
              <span className={styles.next}>NEXT</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="8"
                viewBox="0 0 14 8"
              >
                <path
                  fill="#F26100"
                  d="M8.78 6.823L9.984 8.03 14 4.015 9.985 0 8.78 1.206l1.956 1.956H0v1.706h10.735z"
                />
              </svg>
            </span>
          }
          previousPageLabel={
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="8"
                viewBox="0 0 14 8"
              >
                <path
                  fill="#F26100"
                  d="M5.22 6.823L4.016 8.03 0 4.015 4.015 0 5.22 1.206 3.265 3.162H14v1.706H3.265z"
                />
              </svg>
              <span className={styles.prev}>PREV</span>
            </span>
          }
          currentPageLabelStyle={paginationSytle.activeLink}
          otherPageLabelStyle={paginationSytle.otherLink}
          onClick={(e, offset) => this.handleClick(offset)}
        />
      </div>
    );
  }
}

PaginationComponent.defaultProps = {
  currentOffSet: 0
};

export default withRouter(PaginationComponent);
