import axios from 'axios';
import _ from 'lodash';

const state = {
  user: {
    id: '',
    nickname: '',
    following: [],
    follower: [],
    descript: '',
    filteredFollowing: [],
    filteredFollower: [],
  },
  bridge: {
    id: '',
    nickname: '',
    following: [],
    follower: [],
    descript: '',
    filteredFollowing: [],
    filteredFollower: [],
  },
  searchToken: '',
  searchedNicknameList: [],
  nicknameData: '',
  idData: null,
  dropdown: false,
};

const mutations = {
  setSearchToken(state, payload) {
    state.searchToken = payload;
  },
  pushFollowingUser(state, payload) {
    state.user.following.push(payload);
  },
  clearNicknameList(state) {
    state.searchedNicknameList = [];
  },
  setNicknameData(state, payload) {
    state.nicknameData = payload;
  },
  setUserDescript(state, payload) {
    state.user.descript = payload;
  },
  setBridgeDescript(state, payload) {
    state.bridge.descript = payload;
  },
  bridgeDataUpdate(state, payload) {
    state.bridge.id = payload.id;
    state.bridge.nickname = payload.nickname;
    state.bridge.following = payload.following;
    state.bridge.follower = payload.follower;
    state.bridge.descript = payload.descript;
  },
};

const getters = {
  getSearchToken: state => state.searchToken,
  getUserId: state => state.user.id,
  getUserNickname: state => state.user.nickname,
  getUserFollowing: state => state.user.following,
  getUserFollower: state => state.user.follower,
  getUserDescript: state => state.user.descript,
  getSearchedNicknameList: state => state.searchedNicknameList,
  getBridgeId: state => state.bridge.id,
  getBridgeNickname: state => state.bridge.nickname,
  getBridgeDescript: state => state.bridge.descript,
  getBridgeFilteredFollowing: state => state.bridge.filteredFollowing,
  getBridgeFilteredFollower: state => state.bridge.filteredFollower,
};

const actions = {
  searchNicknameList: _.debounce(function() {
    if (state.searchToken.length !== 0) {
      api.searchAllUser();
  }}, 500),
  filteringFollowingLists() {
    state.bridge.following.length === 0
      ? api.clearFollowingLists()
      : api.filteringFollowingLists();
  },
  filteringFollowerLists() {
    state.bridge.follower.length === 0
      ? api.clearFollowerLists()
      : api.filteringFollowerLists();
  },

  async follow() {
    await api.searchIdByNickname()
      .then(api.addFollowingUser)
      .then(api.addFollowerUser);
  },
  async unfollow() {
    await api.searchIdByNickname()
      .then(api.removeFollowingUser)
      .then(api.removeFollowerUser);
  },
  async editDescript() {
    await api.updateDescript();
  },
};

const api = {
  searchAllUser: async () => {
    axios.get(`/api/${state.user.id}/nickname-list/${state.searchToken}`, {
      params: {
        id: state.user.id,
        input: state.searchToken,
      },
    })
      .then(async (result) => {
        state.searchedNicknameList = [];
        state.searchedNicknameList = await _.cloneDeep(result.data);
      })
      .catch((err) => {
        console.error(err);
      })
  },
  searchIdByNickname: async () => {
    await axios.get(`/api/id/${state.nicknameData}`, {
      params: {
        nickname: state.nicknameData,
      },
    })
      .then((result) => {
        state.idData = result.data[0].id;
      })
      .catch((err) => {
        console.error(err);
      });
  },
  addFollowingUser: async () => {
    await axios.put(`/api/following/${state.user.id}/to/${state.idData}`, {
      params: {
        user_id: state.user.id,
        id: state.idData,
      },
    })
      .then(() => {
        state.user.following.push(state.idData);
      })
      .catch((err) => {
        console.error(err);
      });
  },
  filteringFollowingLists: async () => {
    await axios.get(`api/${state.bridge.id}/${state.bridge.following}/nickname-list`, {
      params: {
        id: state.bridge.id,
        following: state.bridge.following,
      },
    })
      .then(async (result) => {
        state.bridge.filteredFollowing = await _.cloneDeep(result.data);
      })
      .catch((err) => {
        console.error(err);
      });
  },
  filteringFollowerLists: async () => {
    await axios.get(`api/${state.bridge.id}/${state.bridge.follower}/nickname-list`, {
      params: {
        id: state.bridge.id,
        follower: state.bridge.follower,
      },
    })
      .then(async (result) => {
        state.bridge.filteredFollower = await _.cloneDeep(result.data);
      })
      .catch((err) => {
        console.error(err);
      });
  },
  clearFollowingLists: () => { state.bridge.filteredFollowing = []; },
  clearFollowerLists: () => { state.bridge.filteredFollower = []; },
  addFollowerUser: async () => {
    await axios.put(`/api/follower/${state.idData}/to/${state.user.id}`, {
      params: {
        user_id: state.user.id,
        id: state.idData,
      },
    });
  },
  removeFollowingUser: async () => {
    await axios.put(`/api/unfollowing/${state.user.id}/to/${state.idData}`, {
      params: {
        user_id: state.user.id,
        id: state.idData,
      },
    })
      .then(() => {
        state.user.following = state.user.following.filter(id => id !== state.idData);
      })
      .catch((err) => {
        console.error(err);
      })
  },
  removeFollowerUser: async () => {
    await axios.put(`/api/unfollower/${state.idData}/to/${state.user.id}`, {
      params: {
        user_id: state.user.id,
        id: state.idData,
      },
    });
  },
  updateDescript: async () => {
    await axios.put(`/api/profile/${state.user.id}/descript`, {
      params: {
        id: state.user.id,
      },data: {
        descript: state.bridge.descript,
      },
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
}
