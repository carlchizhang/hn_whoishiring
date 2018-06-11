const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

export function findPostingInArray(arrPostings, postingId) {
  for(let i = 0; i < arrPostings.length; ++i) {
    if(arrPostings[i].postingId === postingId) {
      return true;
    }
  }
  return false;
}

export function concatPostingArraysNoDuplicates(arr1, arr2) {
  const arr1_copy = arr1.splice();
  arr2.forEach(item => {
    if(!arr1.findPostingInArray(item.postingId)) {
      arr1.push(item);
    }
  })
  return arr1_copy;
}

export function removePostingElements(base, toBeRemoved) {
  const new_base = [];
  base.forEach(item => {
    if(!toBeRemoved.findPostingInArray(item.postingId)) {
      new_base.push(base);
    }
  })
  return new_base;
}

export function dateCompare(a, b) {
  if (a.postingTime < b.postingTime) {
    return 1;
  }
  if (a.postingTime > b.postingTime) {
    return -1;
  }
  return 0;
}

export function filterPostingsByStrings(postings, searchStrings) {
  if(searchStrings === undefined || searchStrings === null 
    || searchStrings.length === 0 
    || (searchStrings.length === 1 && searchStrings[0] === '')) {
    return postings;
  }
  let filteredPostings = [];
  postings.forEach(posting => {
    let postingTextDecoded = entities.decode(posting.postingText);
    for(let i = 0; i < searchStrings.length; ++i) {
      if(searchStrings[i].length < 2) {
        continue;
      }
      if(postingTextDecoded.search(searchStrings[i]) !== -1) {
        filteredPostings.push(posting);
        return;
      }
    }
  })
  console.log(filteredPostings);
  return filteredPostings;
}