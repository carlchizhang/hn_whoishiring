import { connect } from 'react-redux';
import PostingList from '../components/PostingList';
import { favPosting, unfavPosting, toggleExpandCard } from '../actions/actions';

const mapStateToProps = (state) => {
  return {
    postings: state.visiblePostings,
    favPostings: state.pinnedPostings,
    isLoading: state.isLoading,
    expandedIds: state.expandedIds,
    showFavorites: state.showFavorites
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    favPosting: (posting) => dispatch(favPosting(posting)),
    unfavPosting: (posting) => dispatch(unfavPosting(posting)),
    toggleExpandCard: (postingId) => dispatch(toggleExpandCard(postingId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostingList)