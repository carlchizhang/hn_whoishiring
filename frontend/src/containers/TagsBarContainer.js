import { connect } from 'react-redux';
import TagsBar from '../components/TagsBar';
import { toggleSearchTag } from '../actions/actions'

const mapStateToProps = (state, ownProps) => {
  return {
    label: ownProps.label,
    searchTags: state.searchTags,
    roleTags: state.roleTags,
    remoteTags: state.remoteTags,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    tagClick: (tag) => {
      dispatch(toggleSearchTag(tag))
    },
    search: (tagsArr) => {}
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TagsBar)