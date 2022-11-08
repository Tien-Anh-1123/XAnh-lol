import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import MainButton from '../../components/MainButton';
import MainInput from '../../components/MainInput';
export default function LoginScreen({ navigation }) {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const goToHome = () => {
    if (email.trim() == '' || !email) {
      alert('Không được để trống email !');
    } else if (password.trim() == '' || !password) {
      alert('Không được để trống mật khẩu !');
    } else {
      login();
    }
  };
  const login = async () => {
    let userData = await AsyncStorage.getItem('userData');
    if (userData) {
      userData = JSON.parse(userData);
      let arr = [...userData];
      arr = arr.filter(
        (value) =>
          value.email.toLocaleLowerCase() == email.toLocaleLowerCase() &&
          value.password == password
      );
      if (arr.length > 0) {
        let curUser = arr[0];
        AsyncStorage.setItem('curUser', JSON.stringify(curUser));
        navigation.replace('HomeTab');
      } else alert('Email hoặc mật khẩu không chính xác!');
    } else {
      alert('Email hoặc mật khẩu không chính xác!');
    }
  };
  const goToSignUp = async () => {
    navigation.navigate('SignUpScreen');
  };
  const checkLogin = async () => {
    let userData = await AsyncStorage.getItem('curUser');
    if (userData) navigation.replace('HomeTab');
  };
  useEffect(() => {
    checkLogin();
  }, []);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            paddingHorizontal: 12,
            backgroundColor: 'white',
          }}
        >
          <Text style={{textAlign:'center',fontWeight:'bold',fontSize:30,color:'#0099FF'}}>Đăng nhập</Text>
          <Image
            style={{
              alignSelf: 'center',
              height: 170,
              resizeMode: 'contain',
              width: '100%',
              borderRadius:20,
              marginTop:50,
            }}
            source={require('../../../assets/logo1.png')}
          />
          <Text
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              color: '#2FDBBC',
              fontSize: 25,
              marginBottom: 20,
            }}
          >
          
          </Text>

          <MainInput
            title={'Email'}
            placeholder={'Nhập email'}
            value={email}
            onChangeText={setemail}
          />
          <MainInput
            placeholder={'Nhập mật khẩu'}
            title={'Mật khẩu'}
            value={password}
            secureTextEntry={true}
            onChangeText={setpassword}
          />
          <MainButton
            style={{ marginTop: 20 }}
            title={'Đăng Nhập'}
            onPress={goToHome}
          />
          <MainButton
            style={{ marginTop: 12 }}
            title={'Đăng Ký'}
            isSubButton={true}
            onPress={goToSignUp}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
});
