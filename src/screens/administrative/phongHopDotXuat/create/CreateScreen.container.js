import { connect } from 'react-redux';
import { actions } from 'eoffice/store/administrative/phongHopDotXuat/create';
import CreateScreen from './CreateScreen';

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  createMeeting: actions.createMeeting,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateScreen);
