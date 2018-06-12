import { connect } from 'react-redux';
import SearchBar from '../components/SearchBar';
import { searchByStrings, searchByRegexes } from '../actions/actions';

const mapStateToProps = (state, ownProps) => {
  return {
    label: ownProps.label,
    placeholderText: ownProps.placeholderText
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    search: (paramsArr) => {
      if(ownProps.searchType === 'string') {
        return dispatch(searchByStrings(paramsArr));
      }
      else if(ownProps.searchType === 'regex') {
        return dispatch(searchByRegexes(paramsArr))
      }
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar)