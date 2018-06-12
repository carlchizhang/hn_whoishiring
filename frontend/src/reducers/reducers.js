import { UpdateTypes } from '../actions/actions'
import { 
  concatPostingArraysNoDuplicates,
  removePostingElements,
} from '../utilities/utilities'
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

//state shape design
const initialState = {
  isLoading: false,
  allPostings: [],
  currentLoadedIndex: 0,

  visiblePostings: [],
  pinnedPostings: [],

  searchTags: [],
  searchStrings: [],
  searchRegexes: [],

  availableTags: {
    roleTags: [],
    remoteTags: [],
  }
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

export const SearchTypes = {
  STRING: 0,
  REGEX: 1,
  TAGS: 2
}

export function filterPostings(state, searchParams, searchType) {
  //filter by sections
  //string filter
  let stringFiltered = [];
  let stringParams = (searchType === SearchTypes.STRING) ? searchParams : state.searchStrings;
  if(stringParams === undefined || stringParams === null 
    || stringParams.length === 0 
    || (stringParams.length === 1 && stringParams[0] === '')) {
    stringFiltered = state.allPostings;
  }
  state.allPostings.forEach(posting => {
    let postingTextDecoded = entities.decode(posting.postingText).toLowerCase();
    for(let i = 0; i < stringParams.length; ++i) {
      if(stringParams[i].length < 2) {
        continue;
      }
      if(postingTextDecoded.search(stringParams[i]) !== -1) {
        stringFiltered.push(posting);
        return;
      }
    }
  })
  //console.log(stringFiltered);

  //regex filter
  let regexFiltered = [];
  let regexParams = (searchType === SearchTypes.REGEX) ? searchParams : state.searchRegexes;
  if(regexParams === undefined || regexParams === null 
    || regexParams.length === 0 
    || (regexParams.length === 1 && regexParams[0] === '')) {
    regexFiltered = stringFiltered;
  }
  stringFiltered.forEach(posting => {
    let postingTextDecoded = entities.decode(posting.postingText).toLowerCase();
    for(let i = 0; i < regexParams.length; ++i) {
      if(regexParams[i].length < 1) {
        continue;
      }
      let regex = new RegExp(regexParams[i], 'gi');
      if(regex.test(postingTextDecoded)) {
        regexFiltered.push(posting);
        return;
      }
    }
  })

  console.log(regexFiltered);
  return regexFiltered;
}

function visiblePostings(state = [], action, fullState) {
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
      return filterPostings(fullState, action.searchStrings, SearchTypes.STRING);
    case 'SEARCH_BY_REGEXES':
      return filterPostings(fullState, action.searchRegexes, SearchTypes.REGEX);
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
          return action.postings;
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

function searchRegexes(state = [], action) {
  switch (action.type) {
    case 'SEARCH_BY_REGEXES':
      return action.searchRegexes;
    default:
      return state;
  }
}

function availableTags(state = {roleTags: [], remoteTags: []}, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default function rootReducer(state = initialState, action) {
  return {
    allPostings: allPostings(state.allPostings, action),
    isLoading: isLoading(state.isLoading, action),
    visiblePostings: visiblePostings(state.visiblePostings, action, state),
    pinnedPostings: pinnedPostings(state.pinnedPostings, action),
    searchStrings: searchStrings(state.searchStrings, action),
    searchRegexes: searchRegexes(state.searchRegexes, action),
    availableTags: availableTags(state.availableTags, action),
  }
}