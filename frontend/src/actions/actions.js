import fetch from 'cross-fetch'

export const API_URL = '/api';
export const UpdateTypes = {
  ADD: 0,
  REMOVE: 1,
  REPLACE: 2
}

export const favPosting = (posting) => ({
  type: 'FAV_POSTING',
  posting
})

export const unfavPosting = (posting) => ({
  type: 'UNFAV_POSTING',
  posting
})

export const updateVisiblePostings = (postings, subType) => ({
  type: 'UPDATE_VISIBLE_POSTINGS',
  postings,
  subType
})
export const requestPostingList = () => ({
  type: 'REQUEST_POSTING_LIST'
})

export const receivePostingList = (allPostings) => ({
  type: 'RECEIVE_POSTING_LIST',
  allPostings
})

export const requestPostingListError = (error) => ({
  type: 'REQUEST_POSTING_LIST_ERROR',
  error
})

export function fetchPostingList() {
  return dispatch => {
    dispatch(requestPostingList())

    return fetch(API_URL + '/postings')
      .then(
        response => response.json(), 
        error => dispatch(requestPostingListError(error))
      )
      .then(json => 
        dispatch(receivePostingList(json))
      )
  }
}

export const requestTagsList = () => ({
  type: 'REQUEST_TAGS_LIST'
})

export const receiveTagsList = (roleTags, remoteTags) => ({
  type: 'RECEIVE_TAGS_LIST',
  roleTags,
  remoteTags
})

export const requestTagsListError = (error) => ({
  type: 'REQUEST_TAGS_LIST_ERROR',
  error
})

export function fetchTagsList() {
  return dispatch => {
    dispatch(requestTagsList())

    return fetch(API_URL + '/tags')
      .then(
        response => response.json(),
        error => dispatch(requestTagsListError(error))
      )
      .then(json =>
        dispatch(receiveTagsList(json.roleTags, json.remoteTags))
      )
  }
}

export const toggleSearchTag = (tag) => ({
  type: 'TOGGLE_SEARCH_TAG',
  tag
})

export const updateRawSearchString = (string) => ({
  type: 'UPDATE_RAW_SEARCH_STRING',
  string
})

export const searchByStrings = (searchStrings) => ({
  type: 'SEARCH_BY_STRINGS',
  searchStrings
})

export const updateRawSearchRegexString = (string) => ({
  type: 'UPDATE_RAW_SEARCH_REGEX_STRING',
  string
})

export const searchByRegexes = (searchRegexes) => ({
  type: 'SEARCH_BY_REGEXES',
  searchRegexes
})

export const searchByTags = () => ({
  type: 'SEARCH_BY_TAGS'
})

export const clearFilters = () => ({
  type: 'CLEAR_FILTERS'
})

export const toggleExpandCard = (postingId) => ({
  type: 'TOGGLE_EXPAND_CARD',
  postingId
})

export const expandAll = () => ({
  type: 'EXPAND_ALL'
})

export const collapseAll = () => ({
  type: 'COLLAPSE_ALL'
})

export const toggleShowFavorites = () => ({
  type: 'TOGGLE_SHOW_FAVORITES'
})