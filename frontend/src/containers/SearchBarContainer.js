import { connect } from 'react-redux';
import SearchBar from '../components/SearchBar';
import { searchByStrings, searchByRegexes, updateRawSearchString, updateRawSearchRegexString } from '../actions/actions';

const mapStateToProps = (state, ownProps) => {
  let searchString;
  if(ownProps.searchType === 'string') {
    searchString = state.rawSearchString;
  }
  else {
    searchString = state.rawSearchRegexString;
  }
  return {
    label: ownProps.label,
    placeholderText: ownProps.placeholderText,
    valueString: searchString
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    search: (paramsArr) => {
      if(ownProps.searchType === 'string') {
        return dispatch(searchByStrings(paramsArr));
      }
      else if(ownProps.searchType === 'regex') {
        return dispatch(searchByRegexes(paramsArr));
      }
    },
    updateSearchString: (string) => {
      if(ownProps.searchType === 'string') {
        return dispatch(updateRawSearchString(string));
      }
      else if(ownProps.searchType === 'regex') {
        return dispatch(updateRawSearchRegexString(string));
      }
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar)