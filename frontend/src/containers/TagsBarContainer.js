import { connect } from 'react-redux';
import TagsBar from '../components/TagsBar';

const mapStateToProps = (state, ownProps) => {
  return {
    label: ownProps.label,
    searchTags: state.searchTags,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    search: (tagsArr) => {}
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TagsBar)