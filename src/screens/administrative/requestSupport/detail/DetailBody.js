import { Alert, Platform, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import colors from '../../../../utils/colors';
import format from 'date-fns/format';
import { Button, Form, Icon, Input, Textarea } from 'native-base';
import IconField from '../../common/IconField';

const styles = StyleSheet.create({
  form: {
    flexDirection: 'column',
    marginTop: 10,
  },
  input: {
    paddingBottom: 0,
    height: null,
    marginTop: 0,
    paddingTop: 7,
    color: '#2b2d50',
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft: 0,
    alignSelf: 'stretch',
  },
  textarea: {
    ...Platform.select({
      ios: {
        marginTop: 6,
      },
      android: {
        marginTop: 0,
      },
    }),
    fontSize: 16,
    color: colors.darkGray,
    fontWeight: 'bold',
    alignSelf: 'stretch',
    paddingLeft: 0,
  },
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
      height: 9,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12.35,
    elevation: 19,
  },
  btnCancel: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 4,
    backgroundColor: colors.red,
    paddingHorizontal: 10,
    paddingVertical: 5,
    shadowColor: colors.red,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
  btnText: {
    color: colors.darkGray,
    fontSize: 16,
    fontWeight: 'bold',
  },
  btnIcon: {
    color: 'white',
    fontSize: 14,
    marginRight: 5,
  },
  row: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 5 },
  rowTotal: {
    marginVertical: 10,
    flexDirection: 'row',
    paddingRight: 20,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  label: {
    color: colors.blue,
    fontWeight: 'bold',
    fontSize: 20,
  },

  text: {
    color: colors.blue,
    width: 120,
    fontSize: 20,
    // fontWeight: 'bold',
    textAlign: 'right',
  },
});

const DetailBody = ({
  requestSupportDetail,
  cancelRequest,
  approveRequest,
  isCanAcceptRequest,
  isCanCancelRequest,
}) => {
  const [note, setNote] = useState(requestSupportDetail.note);

  const onCancelRequest = () => {
    if (!note) {
      Alert.alert('Th??ng b??o', 'Ch??a nh???p l?? do', [{ text: '????ng', style: 'destructive' }]);
      return;
    }
    if (note.length > 100) {
      Alert.alert('Th??ng b??o', 'L?? do v?????t qu?? 100 k?? t???. Vui l??ng ki???m tra l???i.', [
        { text: '????ng', style: 'destructive' },
      ]);
      return;
    }

    cancelRequest(note);
  };


  const selectIcon = (
    <Icon
      name="chevron-down"
      type="Feather"
      style={{ fontSize: 16, color: '#fff', marginRight: 0 }}
    />
  );

  const onAcceptRequest = () => {
    approveRequest(requestSupportDetail.id);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView style={{ flex: 1 }}>
        <Form style={styles.form}>
          <IconField label="L??nh v???c y??u c???u" iconName="book" required>
            <Input
              placeholder="-"
              placeholderTextColor={colors.gray}
              value={requestSupportDetail.title}
              onChangeText={txt => setValue('title', txt)}
              style={styles.input}
            />
          </IconField>
          <IconField label="T??n y??u c???u" iconName="alert-circle" required>
            <Input
              placeholder="-"
              placeholderTextColor={colors.gray}
              value={requestSupportDetail.title}
              disabled={true}
              style={styles.input}
            />
          </IconField>
          <IconField label="N???i dung y??u c???u" iconName="alert-circle" required>
            <Input
              placeholder="-"
              placeholderTextColor={colors.gray}
              value={requestSupportDetail.content}
              disabled={true}
              style={styles.input}
            />
          </IconField>
          <IconField label="?????a ??i???m y??u c???u" iconName="alert-circle" required>
            <Input
              placeholder="-"
              placeholderTextColor={colors.gray}
              value={requestSupportDetail.place}
              disabled={true}
              style={styles.input}
            />
          </IconField>
          <IconField label="Th???i gian y??u c???u" iconName="clock" required>
            <Input
              placeholder="-"
              placeholderTextColor={colors.gray}
              value={format(new Date(requestSupportDetail.time), 'dd/MM/yyyy')}
              disabled={true}
              style={styles.input}
            />
          </IconField>
          <IconField label="Ghi ch??" iconName="book" required>
            <Textarea
              rowSpan={3}
              placeholder="-"
              value={note}
              style={styles.input}
              onChangeText={text => setNote(text)}
            />
          </IconField>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 50,
              paddingHorizontal: 20,
            }}
          >
            {isCanAcceptRequest && (
              <Button
                style={[{ flex: 1, marginRight: 10, justifyContent: 'center' }, styles.btn]}
                onPress={() => onAcceptRequest()}
              >
                <Text style={{ color: 'white', fontSize: 20 }}>Ph?? duy???t</Text>
              </Button>
            )}
            {isCanCancelRequest && (
              <Button
                style={[{ flex: 1, justifyContent: 'center' }, styles.btnCancel]}
                onPress={() => {
                  onCancelRequest();
                }}
              >
                <Text style={{ color: 'white', fontSize: 20 }}>H???y y??u c???u</Text>
              </Button>
            )}
          </View>
        </Form>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailBody;
