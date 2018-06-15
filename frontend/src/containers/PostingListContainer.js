import { connect } from 'react-redux';
import PostingList from '../components/PostingList';
import { favPosting, unfavPosting, toggleExpandCard } from '../actions/actions';

const mapStateToProps = (state) => {
  let visiblePostings = state.allPostings;
  if(!state.showFavorites) {
    visiblePostings = state.visiblePostings;
  }
  return {
    postings: visiblePostings,
    favPostings: state.pinnedPostings,
    isLoading: state.isLoading,
    expandedIds: state.expandedIds,
    showFavorites: state.showFavorites
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    favPosting: (postingId) => dispatch(favPosting(postingId)),
    unfavPosting: (postingId) => dispatch(unfavPosting(postingId)),
    toggleExpandCard: (postingId) => dispatch(toggleExpandCard(postingId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostingList)