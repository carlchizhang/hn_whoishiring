import React, { Component } from 'react';
import '../App.css'
import '../stylesheets/card.css';
import '../stylesheets/webfonts/fontawesome-all.css';

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
    return null;
  }
}

function ToolBox(props) {
  return (
    <div className='tool-box'>
      <i className='tool-box-icon fas fa-trash-alt' title={'Remove'}/>
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
		this.state = {
			expanded: false,
      pinned: false,
		};
	}

  toggleExpanded() {
    let expanded = this.state.expanded;
    this.setState({expanded: !expanded});
  }

  togglePinned() {
    let pinned = this.state.pinned;
    this.setState({pinned: !pinned});
  }

	render() {
    if(this.props.posting !== null && this.props.posting !== undefined) {
      //data
      let company = truncateString(this.props.posting.company, LABEL_MAX_LENGTH);
      let role = truncateString(this.props.posting.role, LABEL_MAX_LENGTH);
      let location = truncateString(this.props.posting.location, LABEL_MAX_LENGTH);
      let salary = truncateString(this.props.posting.salary, LABEL_MAX_LENGTH);
      let visa = this.props.posting.remoteTags.includes('visa');
      let remote = this.props.posting.remoteTags.includes('remote');
      let postingUrl = HN_LINK_BASE + this.props.posting.postingId;
      let firstLine = this.props.posting.postingFirstLine;
      let fullText = this.props.posting.postingText;
      let fieldTags = this.props.posting.fieldTags;
      let remoteTags = this.props.posting.remoteTags;
      //appearances
      return (
        <div className='posting-card'>
          <div className='posting-card-info-section' onClick={this.toggleExpanded.bind(this)}>
            <div className='info-left-sections'>
              <IconTextBox icon={'fas fa-building'} text={company} tooltip={'Company'}/>
              <IconTextBox icon={'fas fa-map-marker-alt'} text={location} tooltip={'Location'}/>
            </div>
            <div className='info-left-sections'>
              <IconTextBox icon={'fas fa-users'} text={role} tooltip={'Role'}/>
              <IconTextBox icon={'fas fa-dollar-sign'} text={salary} tooltip={'Salary'}/>
            </div>
            <div className='info-right-section'>
              <div className='date-link-box'>
                <p className='date-text ellipsis-text'>{'One day ago'}</p>
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
          <div className='posting-card-expandable-section'>
            <div className={'collapsed-section' + (this.state.expanded ? ' hide' : '')} onClick={this.toggleExpanded.bind(this)}>
              <div className='first-line-text ellipsis-text' dangerouslySetInnerHTML={{__html: firstLine}} />
              <ToolBox 
                expanded={this.state.expanded} 
                pinned={this.state.pinned} 
                toggleExpanded={this.toggleExpanded.bind(this)}
                togglePinned={this.togglePinned.bind(this)}
              />
            </div>
            <div className={'expanded-section' + (this.state.expanded ? '' : ' hide')}>
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
                  expanded={this.state.expanded} 
                  pinned={this.state.pinned} 
                  toggleExpanded={this.toggleExpanded.bind(this)}
                  togglePinned={this.togglePinned.bind(this)}
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

export default PostingCard