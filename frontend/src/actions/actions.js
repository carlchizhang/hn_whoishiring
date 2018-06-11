import fetch from 'cross-fetch'

export const API_URL = '/api';
export const UpdateTypes = {
  ADD: 0,
  REMOVE: 1,
  REPLACE: 2
}

export const pinCard = (postingId) => ({
  type: 'PIN_CARD',
  postingId
})

export const updateVisiblePostings = (postings, subType) => ({
  type: 'UPDATE_VISIBLE_POSTINGS',
  postings,
  subType
})

export const updatePinnedPostings = (postings, subType) => ({
  type: 'UPDATE_PINNED_POSTINGS',
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

export const searchByStrings = (searchStrings) => ({
  type: 'SEARCH_BY_STRINGS',
  searchStrings
})