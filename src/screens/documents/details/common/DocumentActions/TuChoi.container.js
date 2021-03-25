import { connect } from 'react-redux';

import { actions } from 'eoffice/store/documents/detail';
import ProcessAction from './ProcessAction';
import { selectors as detailSelectors } from 'eoffice/store/documents/detail';
import { selectors as documentSelectors } from 'eoffice/store/documents/list';
import { actions as actionsSelectors } from 'eoffice/store/documents/list';

const mapStateToProps = state => ({
  mode: documentSelectors.modeSelector(state),
  document: detailSelectors.documentSelector(state),
});

const mapDispatchToProps = {
  action: actions.tuChoi,
  resetDocuments: actionsSelectors.resetDocuments,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProcessAction);
