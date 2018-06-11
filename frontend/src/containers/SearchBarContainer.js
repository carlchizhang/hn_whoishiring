import { connect } from 'react-redux';
import SearchBar from '../components/SearchBar';
import { searchByStrings } from '../actions/actions';

const mapStateToProps = (state, ownProps) => {
  return {
    label: ownProps.label,
    placeholderText: ownProps.placeholderText
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    search: (stringArr) => {
      return  dispatch(searchByStrings(stringArr));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar)