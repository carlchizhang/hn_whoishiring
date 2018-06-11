import { connect } from 'react-redux';
import PostingList from '../components/PostingList';
import { pinCard } from '../actions/actions';

const mapStateToProps = (state) => {
  return {
    postings: state.visiblePostings,
    isLoading: state.isLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    pinCard: (postingId) => {console.log('dispatched pin'); return dispatch(pinCard(postingId))},
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostingList)