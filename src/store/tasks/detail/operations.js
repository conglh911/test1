import { Alert } from 'react-native';
import { Toast } from 'native-base';

import { COMMENT_TYPES } from '../../../constants/common';
import { actions as listActions } from '../list';
import createOperation from '../../createOperation';
import * as selector from './selectors';
import * as service from './service';
import slice from './slice';
import NavigationService from 'eoffice/utils/NavigationService';

const { actions } = slice;
const onSuccess = ({ dispatch }) => dispatch(listActions.updateQuery());

export const addComment = createOperation({
  actions: {
    successAction: actions.addCommentSuccess,
  },
  async process({ getState, payload }) {
    const state = getState();
    const task = selector.taskSelector(state);

    const comment = await service.addComment({
      ...payload,
      objectId: task.id,
      objectType: COMMENT_TYPES.TASK,
    });

    return {
      id: comment.id,
      actionName: comment.actionName,
      creatorName: comment.fromUserName,
      creatorId: comment.fromUserId,
      createTime: comment.createTime,
      dataType: 'comment',
      attachments: comment.attachments,
      content: comment.content,
    };
  },
});

// actions
export const findReceiversForTask = createOperation({
  actions: {
    successAction: actions.receiversForTaskSuccess,
  },
  async process() {
    const receiversForTask = await service.findReceiversForTask();
    return receiversForTask;
  },
});

export const findAllAssignersForTask = createOperation({
  actions: {
    successAction: actions.assignersForTaskSuccess,
  },
  async process() {
    const assignersForTask = await service.findAllAssignersForTask();
    return assignersForTask;
  },
});

export const findAllCoordinatorsForTask = createOperation({
  actions: {
    successAction: actions.listCoordinatorsSuccess,
  },
  async process() {
    const listCoordinatorsSuccess = await service.findAllCoordinatorsForTask();
    return listCoordinatorsSuccess;
  },
});

export const approveCompletedTask = createOperation({
  onSuccess,
  process: async ({ getState, payload: { note, score } }) => {
    const state = getState();
    const task = selector.taskSelector(state);

    const data = {
      comment: note,
      score,
    };
    await service.approveCompletedTask({ taskId: task.id, data });

    return true;
  },
  successMessage: 'Ph?? duy???t ho??n th??nh c??ng vi???c th??nh c??ng',
});


export const createTask = form => async () => {
  await service
    .createTask(form)
    .then(res => {
      Toast.show({
        text: 'T???o c??ng vi???c th??nh c??ng',
        type: 'success',
        duration: 3000,
      });
      NavigationService.goBack();
    })
    .catch(err => console.log(err));
};

export const approveTask = createOperation({
  onSuccess,
  process: async ({ getState }) => {
    const state = getState();
    const task = selector.taskSelector(state);

    await service.approveTask({ taskId: task.id });
    NavigationService.goBack();
    return true;
  },
  successMessage: 'Ph?? duy???t c??ng vi???c th??nh c??ng',
  requireConfirm: true,
  confirmTitle: 'X??c nh???n ph?? duy???t c??ng vi???c',
});

export const cancelTask = createOperation({
  onSuccess,
  process: async ({ getState, payload: { note } }) => {
    const state = getState();
    const task = selector.taskSelector(state);

    const data = {
      comment: note,
    };
    await service.cancelTask({ taskId: task.id, data });

    return true;
  },
  successMessage: 'Hu??? c??ng vi???c th??nh c??ng',
});

export const completeTask = createOperation({
  onSuccess,
  process: async ({ getState, payload: { note } }) => {
    const state = getState();
    const task = selector.taskSelector(state);

    const data = {
      comment: note,
    };
    await service.completeTask({ taskId: task.id, data });

    return true;
  },
  successMessage: 'Ho??n th??nh c??ng vi???c th??nh c??ng',
});

export const extendTask = createOperation({
  onSuccess,
  async process({ dispatch, getState, payload: { deadline, note } }) {
    const task = selector.taskSelector(getState());

    const data = {
      deadline,
      comment: note,
    };
    await service.extendTask({ taskId: task.id, data });
    dispatch(
      actions.loadDetail({
        taskId: task.id,
      })
    );
    return true;
  },
  successMessage: 'Gia h???n c??ng vi???c th??nh c??ng',
});

export const pauseTask = createOperation({
  onSuccess,
  process: async ({ getState, payload: { note } }) => {
    const state = getState();
    const task = selector.taskSelector(state);

    const data = {
      comment: note,
    };
    await service.pauseTask({ taskId: task.id, data });

    return true;
  },
  successMessage: 'T???m d???ng c??ng vi???c th??nh c??ng',
});

export const refuseTask = createOperation({
  onSuccess,
  process: async ({ getState, payload: { note } }) => {
    const state = getState();
    const task = selector.taskSelector(state);

    const data = {
      comment: note,
    };
    await service.refuseTask({ taskId: task.id, data });

    return true;
  },
  successMessage: 'T??? ch???i ????ng k?? c??ng vi???c th??nh c??ng',
});

export const refuseCompletedTask = createOperation({
  onSuccess,
  process: async ({ getState, payload: { note } }) => {
    const state = getState();
    const task = selector.taskSelector(state);

    const data = {
      comment: note,
    };
    await service.refuseCompletedTask({ taskId: task.id, data });

    return true;
  },
  successMessage: 'T??? ch???i ho??n th??nh c??ng vi???c th??nh c??ng',
});

export const updateProgress = createOperation({
  onSuccess,
  async process({ dispatch, getState, payload }) {
    const task = selector.taskSelector(getState());
    const data = {
      ...payload,
      taskId: task.id,
    };
    try {
      await service.updateProgress({ data });
      Toast.show({
        text: 'C???p nh???t ti???n ????? c??ng vi???c th??nh c??ng',
        type: 'success',
      });
      dispatch(
        actions.loadDetail({
          taskId: task.id,
        })
      );
    } catch (error) {
      Alert.alert('Th??ng b??o', 'C???p nh???t ti???n ????? c??ng vi???c kh??ng th??nh c??ng', [
        { text: '????ng', style: 'destructive' },
      ]);
    }
  },
});
