import { connect } from 'react-redux';
import PostingList from '../components/PostingList';
import { favPosting, unfavPosting } from '../actions/actions';

const mapStateToProps = (state) => {
  return {
    postings: state.visiblePostings,
    isLoading: state.isLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    favPosting: (posting) => dispatch(favPosting(posting)),
    unfavPosting: (posting) => dispatch(unfavPosting(posting)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostingList)