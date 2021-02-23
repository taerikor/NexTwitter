import { all, delay, fork, put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios'
import { 
    CHANGE_NICKNAME_FAILURE,
    CHANGE_NICKNAME_REQUEST,
    CHANGE_NICKNAME_SUCCESS,
    FOLLOW_FAILURE,
    FOLLOW_REQUEST,
    FOLLOW_SUCCESS,
    LOAD_MY_INFO_REQUEST,
LOG_IN_FAILURE,
LOG_IN_REQUEST,
LOG_IN_SUCCESS,
LOG_OUT_FAILURE,
LOG_OUT_REQUEST,
LOG_OUT_SUCCESS,
SIGN_UP_FAILURE,
SIGN_UP_REQUEST,
SIGN_UP_SUCCESS,
UNFOLLOW_FAILURE,
UNFOLLOW_REQUEST,
UNFOLLOW_SUCCESS} from '../reducers/user';


function loadMyInfoApi () {
    return axios.get('/user')
}

function* loadMyInfo(action) {
    try{
        const result = yield call(loadMyInfoApi);
        yield put({
            type:LOG_IN_SUCCESS,
            data: result.data,
        });
    }catch (err){
        console.log(err)
        yield put({
            type:LOG_IN_FAILURE,
            error: err.response.data
        })
    }
}

function logInApi (data) {
    return axios.post('/user/login',data)
}

function* logIn(action) {
    try{
        const result = yield call(logInApi,action.data);
        yield put({
            type:LOG_IN_SUCCESS,
            data: result.data,
        });
    }catch (err){
        console.log(err)
        yield put({
            type:LOG_IN_FAILURE,
            error: err.response.data
        })
    }
}

function logOutApi () {
    return axios.post('/user/logout')
}

function* logOut() {
    try{
        const result = yield call(logOutApi);
        yield put({
            type:LOG_OUT_SUCCESS,
        });
    }catch (err){
        console.log(err)
        yield put({
            type:LOG_OUT_FAILURE,
            error: err.response.data
        })
    }
}

function signUpApi (data) {
    return axios.post('/user',data)
}

function* signUp(action) {
    try{
        const result = yield call(signUpApi, action.data);
        console.log(result)
        yield put({
            type:SIGN_UP_SUCCESS,
        });
    }catch (err){
        console.log(err)
        yield put({
            type:SIGN_UP_FAILURE,
            error: err.response.data
        })
    }
}

function changeNicknameApi (data) {
    return axios.patch('/user/nickname',{nickname: data})
}

function* changeNickname(action) {
    try{
        const result = yield call(changeNicknameApi,action.data);
        yield put({
            type:CHANGE_NICKNAME_SUCCESS,
            data:result.data
        });
    }catch (err){
        console.log(err)
        yield put({
            type:CHANGE_NICKNAME_FAILURE,
            error: err.response.data
        })
    }
}

function followAPI() {
    return axios.post('/api/follow');
  }
  
  function* follow(action) {
    try {
      // const result = yield call(followAPI);
      yield delay(1000);
      yield put({
        type: FOLLOW_SUCCESS,
        data: action.data,
      });
    } catch (err) {
      console.error(err);
      yield put({
        type: FOLLOW_FAILURE,
        error: err.response.data,
      });
    }
  }
  
  function unfollowAPI() {
    return axios.post('/api/unfollow');
  }
  
  function* unfollow(action) {
    try {
      // const result = yield call(unfollowAPI);
      yield delay(1000);
      yield put({
        type: UNFOLLOW_SUCCESS,
        data: action.data,
      });
    } catch (err) {
      console.error(err);
      yield put({
        type: UNFOLLOW_FAILURE,
        error: err.response.data,
      });
    }
  }

function* watchFollow() {
    yield takeLatest(FOLLOW_REQUEST, follow);
  }
  
  function* watchUnfollow() {
    yield takeLatest(UNFOLLOW_REQUEST, unfollow);
  }

function* watchLogIn() {
    yield takeLatest(LOG_IN_REQUEST, logIn)
}

function* watchLogOut() {
    yield takeLatest(LOG_OUT_REQUEST, logOut)
}

function* watchSignUp() {
    yield takeLatest(SIGN_UP_REQUEST, signUp)
}

function* watchChangeNickname() {
    yield takeLatest(CHANGE_NICKNAME_REQUEST, changeNickname)
}

function* watchLoadMyInfo() {
    yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo)
}

export default function* userSaga() {
    yield all([
        fork(watchFollow),
        fork(watchUnfollow),
        fork(watchLogIn),
        fork(watchLogOut),
        fork(watchSignUp),
        fork(watchChangeNickname),
        fork(watchLoadMyInfo)
    ])
}