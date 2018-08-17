import React from 'react';
import PropTypes from 'prop-types';
import { ListView, PullToRefresh, Flex } from 'antd-mobile';

const Content = (props) => (<div>{props.children}</div>);

const Footer = () => (
  <div style={{ padding: 30, textAlign: 'center' }}>加载中</div>
);

const FooterNo = () => (
  <div style={{ padding: 30, textAlign: 'center' }} />
);

const NoDataShow = (props) => (
  <Flex justify="center" align="center">
    <div style={{ marginTop: 15 }}>{props.text}</div>
  </Flex>
);

const DataSource = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2
});

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: DataSource.cloneWithRows(props.data)
    };
  }

  componentDidMount() {
    if (this.props.firstCome) {
      const scrollTop = localStorage.getItem('scrollTop');
      if (scrollTop) {
        this.ref.refs.listview.scrollTo(0, Number(scrollTop));
        this.ref.refs.listview.scrollProperties.offset = Number(scrollTop);
      }
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({ dataSource: DataSource.cloneWithRows(nextProps.data) });
  }

  componentWillUnmount() {
    if (this.props.saveScrollTop) {
      this.props.saveScrollTop(this.ref.refs.listview.scrollProperties.offset);
    }
  }

  loadMore = () => {
    const { loading, refresh, getData, disableLoadMore } = this.props;
    if (disableLoadMore || loading || refresh) return;
    getData && getData();
  }

  refresh = () => {
    const { loading, refresh, onRefresh, disableRefresh } = this.props;
    if (disableRefresh || loading || refresh) return;
    onRefresh && onRefresh();
  }

  render() {
    const { refresh, disableRefresh, disableLoadMore, ListItem, offsetHeight, reachEnd } = this.props;
    return (
      <div>
        {
          this.props.data.length > 0 ?
            <ListView
              ref={listview => { this.ref = listview }}
              dataSource={this.state.dataSource}
              initialListSize={10}
              pageSize={10}
              stickySectionHeadersEnabled={false}
              onEndReachedThreshold={80}
              scrollEventThrottle={500}
              renderBodyComponent={() => <Content />}
              onEndReached={disableLoadMore ? null : this.loadMore}
              renderRow={(rowData) => <ListItem itemInfo={rowData} {...this.props} />}
              renderFooter={() => (reachEnd ? <Footer /> : <FooterNo />)}
              pullToRefresh={
                !disableRefresh ?
                  <PullToRefresh
                    refreshing={refresh}
                    onRefresh={this.refresh}
                  /> : null
              }
              style={{
                height: `${document.documentElement.clientHeight - offsetHeight}px`,
                overflow: 'auto'
              }}
            /> :
            <NoDataShow text="很抱歉，没有相关数据" />
        }
      </div>
    );
  }
}

List.propTypes = {
  disableRefresh: PropTypes.bool,
  disableLoadMore: PropTypes.bool,
  reachEnd: PropTypes.bool,
  loading: PropTypes.bool,
  refresh: PropTypes.bool,
  onRefresh: PropTypes.func,
  getData: PropTypes.func,
  saveScrollTop: PropTypes.func,
  ListItem: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  offsetHeight: PropTypes.number
};

List.defaultProps = {
  disableRefresh: true,
  disableLoadMore: false,
  reachEnd: false,
  loading: false,
  refresh: false,
  data: [],
  onRefresh() {},
  getData() {},
  scrollToTop() {},
  ListItem() {},
  offsetHeight: 0
};

export default List;