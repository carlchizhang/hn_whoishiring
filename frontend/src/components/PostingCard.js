import React, { Component } from 'react';

const LABEL_MAX_LENGTH = 100;
const HN_LINK_BASE = 'https://news.ycombinator.com/item?id=';

function IconTextBox(props) {
  if(props.text !== null && props.text !== undefined) {
    return (
      <div className='icon-text-box'>
        <i className={'icon-text-box-icon ' + props.icon} alt={props.tooltip} title={props.tooltip}/>
        <p className='icon-text-box-text ellipsis-text'>
          {props.text}
        </p>
      </div>
    );
  }
  else {
    return <div className='icon-text-box'/>;
  }
}

function ToolBox(props) {
  return (
    <div className='tool-box'>
      { props.pinned &&
        <i className='tool-box-icon fas fa-bookmark' onClick={props.togglePinned} title={'Unpin'}/>
      }
      { !props.pinned &&
        <i className='tool-box-icon far fa-bookmark' onClick={props.togglePinned} title={'Pin'}/>
      }
      { props.expanded &&
        <i className='tool-box-icon fas fa-angle-up' onClick={props.toggleExpanded} title={'Minimize'}/>
      }
      { !props.expanded &&
        <i className='tool-box-icon fas fa-angle-down' onClick={props.toggleExpanded} title={'Expand'}/>
      }
    </div>
  );
}

class PostingCard extends Component {
	constructor(props) {
		super(props);

    this.togglePinned = this.togglePinned.bind(this);
	}

  togglePinned() {
    let pinned = this.props.pinned;
    if(!pinned) {
      this.props.favPosting();
    }
    else {
      this.props.unfavPosting();
    }
  }

	render() {
    if(this.props.posting !== null && this.props.posting !== undefined) {
      //data
      let availInfoCount = 4;
      let company = truncateString(this.props.posting.company, LABEL_MAX_LENGTH);
      if (company === null) {
        availInfoCount--;
      }
      let role = truncateString(this.props.posting.role, LABEL_MAX_LENGTH);
      if (role === null) {
        availInfoCount--;
      }
      let location = truncateString(this.props.posting.location, LABEL_MAX_LENGTH);
      if (location === null) {
        availInfoCount--;
      }
      let salary = truncateString(this.props.posting.salary, LABEL_MAX_LENGTH);
      if (salary === null) {
        availInfoCount--;
      }
      if(availInfoCount <= 1) {
        company = 'No information was able to be parsed...';
        role = null;
        location = null;
        salary = null;
      }
      let visa = this.props.posting.remoteTags.includes('visa');
      let remote = this.props.posting.remoteTags.includes('remote');
      let postingUrl = HN_LINK_BASE + this.props.posting.postingId;
      let firstLine = this.props.posting.postingFirstLine;
      let fullText = this.props.posting.postingText;
      let fieldTags = this.props.posting.fieldTags;
      let remoteTags = this.props.posting.remoteTags;
      let datePosted = timeSince(new Date(this.props.posting.postingTime*1000)) + ' Ago';
      //appearances
      return (
        <div className='posting-card'>
          <div className='posting-card-info-section' onClick={this.props.toggleExpanded}>
            <div className='info-left-sections'>
              <IconTextBox icon={(availInfoCount > 1) ? 'fas fa-building' : 'fas fa-exclamation-triangle'} text={company} tooltip={'Company'}/>
              <IconTextBox icon={'fas fa-map-marker-alt'} text={location} tooltip={'Location'}/>
            </div>
            <div className='info-left-sections'>
              <IconTextBox icon={'fas fa-users'} text={role} tooltip={'Role'}/>
              <IconTextBox icon={'fas fa-dollar-sign'} text={salary} tooltip={'Salary'}/>
            </div>
            <div className='info-right-section'>
              <div className='date-link-box'>
                <p className='date-text ellipsis-text'>{datePosted}</p>
                <a href={postingUrl} target={'_blank'}>
                  <i className='link-icon fas fa-external-link-alt' alt={'Link'} title={'HackerNews Link'}/>
                </a>
              </div>
              <div className='icons-box'>
                <div className='right-icon-div'>
                { visa === true &&
                  <i className='visa-remote-icon fas fa-address-card' alt={'Visa'} title={'Visa Offered'}/>
                }
                </div>
                <div className='right-icon-div'>
                { remote === true &&
                  <i className='visa-remote-icon fas fa-plane' alt={'Remote'} title={'Remote Available'}/>
                }
                </div>
              </div>
            </div>
          </div>
          <div className={'posting-card-expandable-section' + (this.props.expanded ? ' collapsed' : ' expanded')} id='expanding-div'>
            <div className={'collapsed-section' + (this.props.expanded ? ' hide' : '')}>
              <div className='first-line-text ellipsis-text' dangerouslySetInnerHTML={{__html: firstLine}} />
              <ToolBox 
                expanded={this.props.expanded} 
                pinned={this.props.pinned} 
                toggleExpanded={this.props.toggleExpanded}
                togglePinned={this.togglePinned}
              />
            </div>
            <div className={'expanded-section' + (this.props.expanded ? '' : ' hide')}>
              <div className='tags-controls-section'>
                <div className='field-tags tags-section'>
                  { fieldTags.map(tag => {
                    return <p key={tag} className={'tag-box'}>{tag}</p>
                  })}
                  { remoteTags.length > 0 && 
                    <p className='tag-classes-separator'>|</p>
                  }
                  { remoteTags.length > 0 && 
                    remoteTags.map(tag => {
                      return <p key={tag} className={'tag-box'}>{tag}</p>
                    })
                  }
                </div>
                <ToolBox 
                  className='expanded-tool-box' 
                  expanded={this.props.expanded} 
                  pinned={this.props.pinned} 
                  toggleExpanded={this.props.toggleExpanded}
                  togglePinned={this.togglePinned}
                />
              </div>
              <div className='full-text-box'>
                <div className='full-text' dangerouslySetInnerHTML={{__html: fullText}} />
              </div>
            </div>
          </div>
        </div>
      );
    }

    else {
      return null;
    }
	}
}

//helpers
function truncateString(string, length = 50) {
  if(string === null || string === undefined) {
    return string;
  }
  if(string.length < length) {
    return string;
  }
  let truncated = string.substr(0, length-1) + '...';
  return truncated;
}

function timeSince(date) {
  var seconds = Math.floor((new Date() - date) / 1000);
  var interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + " Years";
  }
  else if (interval === 1) {
    return "1 Year"
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " Months";
  }
  else if (interval === 1) {
    return "1 Month"
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " Days";
  }
  else if (interval === 1) {
    return "1 Day"
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " Hours";
  }
  else if (interval === 1) {
    return "1 Hour"
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " Minutes";
  }
  return Math.floor(seconds) + " Seconds";
}

export default PostingCard