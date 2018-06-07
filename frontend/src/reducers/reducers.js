import { combineReducers } from 'redux'

//state shape design
const initialState = {
  //postingList: [],
  //fetchingPostingList: false,

  //allPostingObjects: [],

  visiblePostings: [],
  pinnedPostings: [],
  deletedPostings: [],

  //fetchingPostingIds: [],

  //selectedTags: [],
  //searchStrings: [],
  //searchRegexes: [],
}

function visiblePostings(state = [], action) {
  switch(action.type) {
    case 'PIN_CARD':
      console.log('Pinned received - visiblePostings: ' + action.postingId);
      return state;
    case 'DELETE_CARD':
      console.log('Deleted received - visiblePostings: ' + action.postingId);
      return state;
    case 'UPDATE_VISIBLE_POSTINGS':
      console.log('Added: ' + action.postings.length);
      return [...state, ...action.postings]
    default:
      return state;
  }
}

function pinnedPostings(state = [], action) {
  switch (action.type) {
    case 'PIN_CARD':
      console.log('Pinned received - pinnedPostings: ' + action.postingId);
      return state;
    case 'DELETE_CARD':
      console.log('Deleted received - pinnedPosting: ' + action.postingId);
      return state;
    default:
      return state;
  }
}

function deletedPostings(state = [], action) {
  switch (action.type) {
    case 'PIN_CARD':
      console.log('Pinned received - deletedPostings: ' + action.postingId);
      return state;
    case 'DELETE_CARD':
      console.log('Deleted received - deletedPostings: ' + action.postingId);
      return state;
    default:
      return state;
  }  
}

export default function rootReducer(state = initialState, action) {
  return {
    visiblePostings: visiblePostings(state.visiblePostings, action),
    pinnedPostings: pinnedPostings(state.pinnedPostings, action),
    deletedPostings: deletedPostings(state.deletedPostings, action)
  }
}