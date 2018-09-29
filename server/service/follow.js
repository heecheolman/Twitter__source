const knex = require('./service.config');

module.exports = {
    // nickname 값으로 고유 식별 번호인 id 를 얻어옴
    getIdByNicknames: async (nickname) => {
        const userId = await knex('users')
            .select('id')
            .where({ nickname })
            .then(result => result)
            .catch(err => err);
        return userId;
    },
    // 본인(user_id) 의 following 배열에 팔로우할 사람(id) 추가
    addFollowingUser: async ({ user_id, id }) => {
        const updatedUser = knex('users')
            .where('id', user_id)
            .update({ following: knex.raw('array_append(following, ?)', [id]) })
            .then(result => result)
            .catch(err => err);
        return updatedUser;
    },
    // 팔로우 당하는사람(id) 의 follower 배열에 팔로잉하는 사람(user_id) 추가
    addFollowerUser: async ({ user_id, id }) => {
        const updatedUser = knex('users')
            .where('id', id)
            .update({ follower: knex.raw('array_append(follower, ?)', [user_id])})
            .then(result => result)
            .catch(err => err);
        return updatedUser;
    },
    removeFollowingUser: async ({ user_id, id}) => {
        const updatedUser = knex('users')
            .where('id', user_id)
            .update({ following: knex.raw('array_remove(following, ?)', [id])})
            .then(result => result)
            .catch(err => err);
        return updatedUser;
    },
    removeFollowerUser: async ({ user_id, id}) => {
        const updatedUser = knex('users')
            .where('id', id)
            .update({ follower: knex.raw('array_remove(follower, ?)', [user_id])})
            .then(result => result)
            .catch(err => err);
        return updatedUser;
    },
    getFollowingFilter: async ({ id, following }) => {
        const followingObject = JSON.parse(`[${following}]`);
        const nicknameList = await knex('users')
            .select('id', 'nickname', 'following', 'follower', 'descript')
            .whereIn('id', followingObject)
            .then(result => result)
            .catch(err => err);
        return nicknameList;
    },
    getFollowerFilter: async ({ id, follower }) => {
        const followerObject = JSON.parse(`[${follower}]`);
        const nicknameList = await knex('users')
            .select('id', 'nickname', 'following', 'follower', 'descript')
            .whereIn('id', followerObject)
            .then(result => result)
            .catch(err => err);
        return nicknameList;
    },
    getFollowing: async ({ id }) => {
        const following = await knex('users')
            .select('following')
            .where({ id })
            .then(result => result)
            .catch(err => err);
        return following;
    },
    getFollower: async ({ id }) => {
        const follower = await knex('users')
            .select('follower')
            .where({ id })
            .then(result => result)
            .catch(err => err);
        return follower;
    }
};