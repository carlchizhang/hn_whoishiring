export const API_URL = '/api';

export const fetchPostingRequest = postingId => ({
  type: 'FETCH_POSTING',
  postingId
})

export const receivePosting = postingObj => ({
  type: 'RECEIVE_POSTING',
  postingObj
})

export const fetchPostingListRequest = () => ({
  type: 'FETCH_POSTING_LIST'
})

export const receivePostingList = (postingIds) => ({
  type: 'RECEIVE_POSTING_LIST',
  postingIds
})

export const pinCard = (postingId) => ({
  type: 'PIN_CARD',
  postingId
})

export const deleteCard = (postingId) => ({
  type: 'DELETE_CARD',
  postingId
})

export const updateVisiblePostings = (postings) => ({
  type: 'UPDATE_VISIBLE_POSTINGS',
  postings
})

