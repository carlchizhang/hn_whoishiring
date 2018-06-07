import { connect } from 'react-redux';
import PostingList from '../components/PostingList';
import { pinCard, deleteCard} from '../actions/actions';

const mapStateToProps = (state) => {
  console.log('mapping states');
  return {
    postings: state.visiblePostings,
  }
}

const mapDispatchToProps = (dispatch) => {
  console.log('mapping dispatchers');
  return {
    pinCard: (postingId) => {console.log('dispatched pin'); return dispatch(pinCard(postingId))},
    deleteCard: (postingId) => {console.log('dispatched delete'); return dispatch(deleteCard(postingId))}
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostingList)