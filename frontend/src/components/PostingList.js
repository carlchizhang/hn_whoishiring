import React from 'react';
import '../App.css'
import '../stylesheets/postingList.css';
import '../stylesheets/webfonts/fontawesome-all.css';
import PostingCard from './PostingCard'

const PostingList = ({postings, pinCard, deleteCard}) => {
    return (
      <div className='posting-list'>
      {
        postings.sort(dateCompare).map(posting => {
          return <PostingCard 
            key={posting.postingId} 
            posting={posting}
            pinCard={() => pinCard(posting.postingId)}
            deleteCard={() => deleteCard(posting.postingId)}
          />
        })
      }
      </div>
    );
}

function dateCompare(a, b) {
  if (a.postingTime < b.postingTime) {
    return 1;
  }
  if (a.postingTime > b.postingTime) {
    return -1;
  }
  return 0;
}

export default PostingList;