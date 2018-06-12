export function findPostingInArray(arrPostings, postingId) {
  for(let i = 0; i < arrPostings.length; ++i) {
    if(arrPostings[i].postingId === postingId) {
      return true;
    }
  }
  return false;
}

export function concatPostingArraysNoDuplicates(arr1, arr2) {
  arr2.forEach(item => {
    if(!findPostingInArray(arr1, item.postingId)) {
      arr1.push(item);
    }
  })
  return arr1;
}

export function removePostingElements(base, toBeRemoved) {
  const new_base = [];
  base.forEach(item => {
    if(!findPostingInArray(toBeRemoved, item.postingId)) {
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