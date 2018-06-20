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

  searchTags: [],
  searchStrings: [],
  rawSearchString: '',
  searchRegexes: [],
  rawSearchRegexString: '',

  roleTags: [],
  remoteTags: [],

  expandedIds: [],
  pinnedPostings: [],
  showFavorites: false,
  lights: false,
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
  else {
    state.allPostings.forEach(posting => {
      let postingTextDecoded = entities.decode(posting.postingText).toLowerCase();
      for(let i = 0; i < stringParams.length; ++i) {
        if(stringParams[i].length < 2) {
          continue;
        }
        if(postingTextDecoded.search(stringParams[i].toLowerCase()) !== -1) {
          continue;
        }
        else {
          return;
        }
      }
      stringFiltered.push(posting);
    })
  }
  //console.log(stringFiltered);

  //regex filter
  let regexFiltered = [];
  let regexParams = (searchType === SearchTypes.REGEX) ? searchParams : state.searchRegexes;
  if(regexParams === undefined || regexParams === null
    || regexParams.length === 0
    || (regexParams.length === 1 && regexParams[0] === '')) {
    regexFiltered = stringFiltered;
  }
  else {
    stringFiltered.forEach(posting => {
      let postingTextDecoded = entities.decode(posting.postingText).toLowerCase();
      for(let i = 0; i < regexParams.length; ++i) {
        if(regexParams[i].length < 1) {
          continue;
        }
        try {
          var regex = new RegExp(regexParams[i], 'gi');
        } catch(e) {
          return;
        }
        console.log(regex);
        if(regex.test(postingTextDecoded)) {
          continue;
        }
        else {
          return;
        }
      }
      regexFiltered.push(posting);
    })
  }

  let tagFiltered = [];
  let tagParams = state.searchTags;
  if(tagParams === undefined || tagParams === null || tagParams.length === 0) {
    tagFiltered = regexFiltered;
  }
  else {
    regexFiltered.forEach(posting => {
      for(let i = 0; i < tagParams.length; ++i) {
        if(posting.fieldTags.includes(tagParams[i]) || posting.remoteTags.includes(tagParams[i])) {
          tagFiltered.push(posting);
          return;
        }
      }
    })
  }

  //console.log(tagFiltered);
  return tagFiltered;
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
    case 'SEARCH_BY_TAGS':
      return filterPostings(fullState, [], SearchTypes.TAGS);
    default:
      return state;
  }
}

function pinnedPostings(state = [], action) {
  switch (action.type) {
    case 'FAV_POSTING':
      if(state.includes(action.postingId)) {
        return state;
      }
      let newArr = state.slice();
      newArr.push(action.postingId);
      localStorage.setItem('favorites', JSON.stringify(newArr));
      return newArr;
    case 'UNFAV_POSTING':
      let newArr2 = [];
      state.forEach(postingId => {
        if(postingId !== action.postingId) {
          newArr2.push(postingId);
        }
      })
      localStorage.setItem('favorites', JSON.stringify(newArr2));
      return newArr2;
    case 'HYDRATE_FAVORITES_LIST':
      return action.favorites;
    default:
      return state;
  }
}

function searchStrings(state = [], action) {
  switch (action.type) {
    case 'SEARCH_BY_STRINGS':
      return action.searchStrings;
    case 'CLEAR_FILTERS':
      return [];
    default:
      return state;
  }
}

function searchRegexes(state = [], action) {
  switch (action.type) {
    case 'SEARCH_BY_REGEXES':
      return action.searchRegexes;
    case 'CLEAR_FILTERS':
      return [];
    default:
      return state;
  }
}

function searchTags(state = [], action) {
  switch (action.type) {
    case 'TOGGLE_SEARCH_TAG':
      if (!state.includes(action.tag)) {
        let tempArr = state.slice()
        tempArr.push(action.tag);
        return tempArr;
      }
      else {
        let newArr = [];
        state.forEach((item) => {
          if (item !== action.tag) {
            newArr.push(item);
          }
        })
        return newArr;
      }
    case 'CLEAR_FILTERS':
      return [];
    default:
      return state;
  }
}

function roleTags(state = [], action) {
  switch (action.type) {
    case 'RECEIVE_TAGS_LIST':
      return action.roleTags;
    default:
      return state;
  }
}

function remoteTags(state = [], action) {
  switch (action.type) {
    case 'RECEIVE_TAGS_LIST':
      return action.remoteTags;
    default:
      return state;
  }
}

function rawSearchString(state = '', action) {
  switch (action.type) {
    case 'UPDATE_RAW_SEARCH_STRING':
      return action.string;
    case 'CLEAR_FILTERS':
      return '';
    default:
      return state;
  }
}

function rawSearchRegexString(state = '', action) {
  switch (action.type) {
    case 'UPDATE_RAW_SEARCH_REGEX_STRING':
      return action.string;
    case 'CLEAR_FILTERS':
      return '';
    default:
      return state;
  }
}

function showFavorites(state = false, action) {
  switch (action.type) {
    case 'TOGGLE_SHOW_FAVORITES':
      return !state;
    default:
      return state;
  }
}

function expandedIds(state = [], action, fullState) {
  switch (action.type) {
    case 'TOGGLE_EXPAND_CARD':
      if(state.includes(action.postingId)) {
        let newArr = [];
        state.forEach(postingId => {
          if(postingId !== action.postingId) {
            newArr.push(postingId);
          }
        })
        return newArr;
      }
      else {
        let newArr = state.slice();
        newArr.push(action.postingId);
        return newArr;
      }
    case 'EXPAND_ALL':
      let newArr = [];
      fullState.allPostings.forEach(posting => {
        newArr.push(posting.postingId);
      })
      return newArr;
    case 'COLLAPSE_ALL':
      return [];
    default:
      return state;
  }
}

function lights(state = false, action) {
  switch (action.type) {
    case 'TOGGLE_LIGHTS':
      if(!state === true) {
        document.documentElement.style.setProperty('--main-root-color', 'rgb(230, 234, 238)');
        document.documentElement.style.setProperty('--card-background-color', 'rgb(255, 255, 255)');
        document.documentElement.style.setProperty('--card-lighter-background-color', 'rgb(240, 241, 244)');
        document.documentElement.style.setProperty('--main-text-color', 'rgb(37, 43, 57)');
        document.documentElement.style.setProperty('--highlight-color', 'rgb(68, 73, 96)');
        document.documentElement.style.setProperty('--placeholder-text-color', 'rgb(195, 206, 227)');
        document.documentElement.style.setProperty('--search-text-color', 'rgb(37, 43, 57)');
      }
      else {
        document.documentElement.style.setProperty('--main-root-color', 'rgb(132, 140, 163)');
        document.documentElement.style.setProperty('--card-background-color', 'rgb(37, 43, 57)');
        document.documentElement.style.setProperty('--card-lighter-background-color', 'rgb(50, 58, 78)');
        document.documentElement.style.setProperty('--main-text-color', 'rgb(195, 206, 227)');
        document.documentElement.style.setProperty('--highlight-color', 'rgb(141, 196, 240)');
        document.documentElement.style.setProperty('--placeholder-text-color', 'rgb(195, 206, 227)');
        document.documentElement.style.setProperty('--search-text-color', 'rgb(37, 43, 57)');
      }
      return !state;
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
    searchTags: searchTags(state.searchTags, action),
    roleTags: roleTags(state.roleTags, action),
    remoteTags: remoteTags(state.remoteTags, action),
    rawSearchString: rawSearchString(state.rawSearchString, action),
    rawSearchRegexString: rawSearchRegexString(state.rawSearchRegexString, action),
    showFavorites: showFavorites(state.showFavorites, action),
    expandedIds: expandedIds(state.expandedIds, action, state),
    lights: lights(state.lights, action)
  }
}
