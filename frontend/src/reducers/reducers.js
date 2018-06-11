import { UpdateTypes } from '../actions/actions'
import { 
  concatPostingArraysNoDuplicates,
  removePostingElements,
  filterPostingsByStrings
} from '../utilities/utilities'

//state shape design
const initialState = {
  isLoading: false,
  allPostings: [],
  currentLoadedIndex: 0,

  visiblePostings: [],
  pinnedPostings: [],

  //selectedTags: [],
  searchStrings: [],
  //searchRegexes: [],
}

function allPostings(state = [], action) {
  switch(action.type) {
    case 'RECEIVE_POSTING_LIST':
      return action.allPostings;
    default:
      return state;
  }
}

function isLoading(state = false, action) {
  switch(action.type) {
    case 'REQUEST_POSTING_LIST' :
      return true;
    case 'RECEIVE_POSTING_LIST' :
      return false;
    case 'REQUEST_POSTING_LIST_ERROR' :
      return false;
    default:
      return state;
  }
}

function visiblePostings(state = [], action, allPostings) {
  switch(action.type) {
    case 'UPDATE_VISIBLE_POSTINGS':
      switch(action.subType) {
        case UpdateTypes.ADD:
          return concatPostingArraysNoDuplicates(state, action.postings);
        case UpdateTypes.REMOVE:
          return removePostingElements(state, action.postings);
        case UpdateTypes.REPLACE:
          return action.postings;
        default:
          return state;
      }
    case 'SEARCH_BY_STRINGS':
      return filterPostingsByStrings(allPostings, action.searchStrings);
    default:
      return state;
  }
}

function pinnedPostings(state = [], action) {
  switch (action.type) {
    case 'FAV_POSTING':
      return concatPostingArraysNoDuplicates(state, [action.posting]);
    case 'UNFAV_POSTING':
      return removePostingElements(state, [action.posting]);
    case 'UPDATE_PINNED_POSTINGS':
      switch(action.subType) {
        case UpdateTypes.ADD:
          return concatPostingArraysNoDuplicates(state, action.postings);
        case UpdateTypes.REMOVE:
          return removePostingElements(state, action.postings);
        case UpdateTypes.REPLACE:
          return action.postings.splice();
        default:
          return state;
      }
    default:
      return state;
  }
}

function searchStrings(state = [], action) {
  switch (action.type) {
    case 'SEARCH_BY_STRINGS':
      return action.searchStrings;
    default:
      return state;
  }
}

export default function rootReducer(state = initialState, action) {
  return {
    allPostings: allPostings(state.allPostings, action),
    isLoading: isLoading(state.isLoading, action),
    visiblePostings: visiblePostings(state.visiblePostings, action, state.allPostings),
    pinnedPostings: pinnedPostings(state.pinnedPostings, action),
    searchStrings: searchStrings(state.searchStrings, action),
  }
}