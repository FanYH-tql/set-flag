import ajax from '../../config/ajax'
import parseData from '../../utils/parseData'
const SET_USER_INFO = 'global/SET_USER_INFO'
const SET_ALLTASKS = 'global/SET_ALLTASKS'
const SET_RANK = 'global/SET_RANK'
const initState = {
    userInfo: {
        token: '',
        userName: '',
        sex: '',
        email: '',
        avatar: '',
        nickname: '',
        score: 0
    },
    allTasks: [],
    rank: []
}
export default (state = initState, action = {}) => {
  switch (action.type) {
    case SET_USER_INFO:
        const userInfo = action.userInfo
        return {
            ...state,
            userInfo: userInfo,
        }
    case SET_ALLTASKS: {
        return {
            ...state,
            allTasks: [...action.data]
        }
    }
    case SET_RANK: {
        return {
            ...state,
            rank: [...action.data]
        }
    }
    default:
      return state;
  }
};
export const setUserInfo = (values) => ({
    type: SET_USER_INFO,
    userInfo: values
})

export const checkToken = token => async dispatch => {
    try {
        const res = await ajax('/check_token', { token }, 'post')
        const { code, data } = parseData(res)
        if (code === 0) {
            dispatch(setUserInfo(data))
        }
    } catch(e) {
        console.log(e)
    }
}

export const setAllTasks = data => ({
    type: SET_ALLTASKS,
    data
})

export const setRank = data => ({
    type: SET_RANK,
    data
})

