import React, { Component } from 'react';
import '../App.css'
import '../stylesheets/card.css';

import companyIcon from '../icons/company.svg';
import locationIcon from '../icons/location.svg';
import remoteIcon from '../icons/remote.svg';
import rolesIcon from '../icons/roles.svg';
import salaryIcon from '../icons/salary.svg';
import visaIcon from '../icons/visa.svg';
import linkIcon from '../icons/link.svg';
import starIconChecked from '../icons/star.svg';
import starIconUnchecked from '../icons/star_outline.svg';
import removeIcon from '../icons/delete.svg';

const LABEL_MAX_LENGTH = 100;
const HN_LINK_BASE = 'https://news.ycombinator.com/item?id=';

function IconTextBox(props) {
  if(props.text !== null && props.text !== undefined) {
    return (
      <div className='icon-text-box'>
        <img className='icon-text-box-icon' src={props.icon} alt={props.tooltip} title={props.tooltip}/>
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
      <img className='tool-box-icon' src={props.removeIcon} alt={'Remove'} title={'Remove'}/>
      <img className='tool-box-icon' src={props.pinIcon} alt={'Pin'} title={'Pin'}/>
      <img className='tool-box-icon' src={props.expandIcon} alt={'Details'} title={'Details'}/>
    </div>
  );
}

class PostingCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			expanded: false,
      favorited: false,
		};
	}

	render() {
    if(this.props.posting !== null && this.props.posting !== undefined) {
      //data
      let company = truncateString(this.props.posting.company, LABEL_MAX_LENGTH);
      let role = truncateString(this.props.posting.role, LABEL_MAX_LENGTH);
      let location = truncateString(this.props.posting.location, LABEL_MAX_LENGTH);
      let salary = truncateString(this.props.posting.salary, LABEL_MAX_LENGTH);
      let visa = true;//this.props.posting.remoteTags.includes('visa');
      let remote = true;//this.props.posting.remoteTags.includes('remote');
      let postingUrl = HN_LINK_BASE + this.props.posting.postingId;
      let firstLine = this.props.posting.postingFirstLine;
      let fullText = this.props.posting.postingText;

      //appearances
      let expandableSectionHeight = this.state.expanded ? 240 : 40;
      let cardHeight = 80 + expandableSectionHeight
      return (
        <div className='posting-card' style={{height: cardHeight+'px'}}>
          <div className='posting-card-info-section'>
            <div className='info-left-sections'>
              <IconTextBox icon={companyIcon} text={company} tooltip={'Company'}/>
              <IconTextBox icon={locationIcon} text={location} tooltip={'Location'}/>
            </div>
            <div className='info-left-sections'>
              <IconTextBox icon={rolesIcon} text={role} tooltip={'Role'}/>
              <IconTextBox icon={salaryIcon} text={salary} tooltip={'Salary'}/>
            </div>
            <div className='info-right-section'>
              <div className='date-link-box'>
                <a href={postingUrl} target={'_blank'}>
                  <p className='date-text ellipsis-text'>{'One day ago'}</p>
                  <img className='link-icon' src={linkIcon} alt={'Link'} title={'HackerNews Link'}/>
                </a>
              </div>
              <div className='icons-box'>
                <div className='right-icon-div'>
                { visa === true &&
                  <img className='visa-icon' src={visaIcon} alt={'Visa'} title={'Visa Offered'}/>
                }
                </div>
                <div className='right-icon-div'>
                { remote === true &&
                  <img className='remote-icon' src={remoteIcon} alt={'Remote'} title={'Remote Available'}/>
                }
                </div>
              </div>
            </div>
          </div>
          <div className='posting-card-expandable-section' style={{height: expandableSectionHeight+'px'}}>
            { !this.state.expanded &&
            <div className='collapsed-section'>
              <div className='first-line-text ellipsis-text' dangerouslySetInnerHTML={{__html: firstLine}} />
              <ToolBox removeIcon={removeIcon} pinIcon={starIconChecked} expandIcon={starIconUnchecked}/>
            </div>
            }
            { this.state.expanded &&
            <div className='expanded-section'>
              <div className='full-text ellipsis-text' dangerouslySetInnerHTML={{__html: fullText}} />
            </div>
            }
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