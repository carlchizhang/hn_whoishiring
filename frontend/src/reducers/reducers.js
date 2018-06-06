//state shape design
const initialState = {
  postingList: [],
  fetchingPostingList: false,

  allPostingObjects: [],

  visiblePostings: [],
  pinnedPostings: [],
  deletedPostings: [],
  fetchingPostingIds: [],

  selectedTags: [],
  searchStrings: [],
  searchRegexes: [],
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_VISIBLE_POSTINGS':
      console.log('Added: ' + action.postings.length);
      return Object.assign({}, state, {
        allPostingObjects: [
          ...state.allPostingObjects,
          ...action.postings
        ]
      })
    case 'PIN_CARD':
      console.log('Pinned: ' + action.postingId);
      return state;
    case 'DELETE_CARD':
      console.log('Deleted: ' + action.postingId);
      return state;
    default:
      return state;
  }
}

export default rootReducer