/* eslint-disable global-require,import/no-unresolved */
import PropTypes from 'prop-types';
import React from 'react';
import { Keyboard, StyleSheet, TextInput, View } from 'react-native';
import { Button, Form, Icon, Spinner, Text } from 'native-base';

import variables from 'eoffice/native-base-theme/variables/commonColor';
import { moderateScale } from 'eoffice/utils/scaling';
import Input from './Input';
import useLoginForm from './useLoginForm';
import colors from '../../../utils/colors';

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 4,
    backgroundColor: colors.blue,
    paddingHorizontal: 10,
    paddingVertical: 5,
    shadowColor: '#5386ba',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
  btnText: {
    paddingVertical: 7.5,
    fontSize: moderateScale(16, 0.5),
    color: '#0091ff',
    fontWeight: '600',
  },

  inputContainer: {
    color : "black",
    width: '85%',
    marginBottom: moderateScale(10, 2.5),
    fontWeight: 'bold',
  },

  wrapper: {
    paddingTop: moderateScale(variables.isIphoneX ? 105 : 51, 0.5),
    paddingHorizontal: moderateScale(35, 2),
  },
  iconInput: {
    fontSize: moderateScale(20, 0.8),
    color: "#ccc",
  },
  iconButton: {
    fontSize: moderateScale(24, 0.5),
    color: 'white',
    position: 'absolute',
    right: 0,
  },
  text: {
    alignSelf: 'center',
    fontSize: moderateScale(22, 0.5),
    color: '#fdfeff',
    fontWeight: 'bold',
  },
  viewInput: { flexDirection: 'row', position: 'relative' },
  form: {
    paddingTop: moderateScale(25, 1),
  },
  spinner: { position: 'absolute', right: 16 },

  formItem: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputText: {
    marginLeft : 10,
    flex : 1,
    fontSize: 16,
  },
});

const LoginForm = ({ login }) => {
  const [state, actions] = useLoginForm();
  const submit = async () => {
    actions.setSubmiting(true);
    await login({ username: state.username, password: state.password });
    actions.setSubmiting(false);
    Keyboard.dismiss();
  };

  return (
    <View style={styles.wrapper}>
      <Form style={styles.form}>
        <View style={styles.formItem}>
          <Icon style={styles.iconInput} name="user" type="Feather" />
          <TextInput
            style={styles.inputText}
            autoCapitalize = 'none'
            autoFocus={true}
            placeholder={state.usernamePlaceholder}
            value={state.username}
            onChangeText={actions.setUsername}
            onFocus={actions.setUsernamePlaceholder}
          />
        </View>
        <View style={styles.formItem}>
          <Icon style={styles.iconInput} name="lock" type="Feather" />
          <TextInput
            secureTextEntry
            style={styles.inputText}
            autoCapitalize = 'none'
            autoFocus={true}
            placeholder={state.passwordPlaceholder}
            value={state.password}
            onChangeText={actions.setPassword}
            onFocus={actions.setPasswordPlaceholder}
          />
        </View>
        <View style={{ flexDirection: 'row', width: '100%' }}>
          <Button
            style={[
              { flex: 1, justifyContent: 'center' },
              styles.btn,
            ]}
            onPress={submit}
          >
            <Text style={{ color: 'white', fontSize: 20 }}>
              Đăng nhập
            </Text>
            {!state.submiting && (
              <Icon name="arrow-right" type="Feather" style={styles.iconButton} />
            )}
            {state.submiting && <Spinner size="small" color="#white" style={styles.spinner} />}
          </Button>
        </View>
      </Form>
    </View>
  );
};

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginForm;
