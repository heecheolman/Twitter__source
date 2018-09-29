// router
const express = require('express');
const router = express.Router();

const postService = require('./../service/post');
const joinService = require('./../service/join');
const loginService = require('./../service/login');
const searchService = require('./../service/search');
const followService = require('./../service/follow');
const editService = require('./../service/edit');
const profileService = require('./../service/profile');
const multer  = require('multer');
const secret = require('./../secret');
const key = 'kIm_HeE_cHeOl_';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../client/static/images');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage: storage
});

router.post('/tweet', async (req, res) => {
    const result = await postService.insertPost({
        nickname: req.body.nickname,
        user_id: req.body.user_id,
        contents: req.body.text,
        images: JSON.stringify(req.body.filenameList),
    })
        .then(results => results)
        .catch(err => err);
    result
        ? res.json(result)
        : res.sendStatus(403);
});

router.get('/timelines/:user_id', async (req, res) => {
    const timelines = await postService.getPosts({
        user_id: req.params.user_id,
    })
        .then(results => results)
        .catch(err => err);
    res.json(timelines);
});

router.post('/upload', upload.array('userfile'), (req, res) => {
    res.send('ok');
});

router.post('/join', async (req, res) => {
    const result = await joinService.insertUser(  {
        phone_number: secret.hashing(req.body.phone_number),
        user_password: secret.salting(req.body.user_password),
        real_name: secret.encrypt(req.body.real_name, key),
        nickname: req.body.nickname,
        following: req.body.following,
        follower: req.body.follower,
        descript: req.body.descript,
    })
        .then(results => results)
        .catch(err => err);
    result
        ? res.json(result)
        : res.sendStatus(403);
});

// 해당 phoneNumber 가 존재하는지 체크하는 api 존재한다면 result.data.length !== 0
router.get('/phone-numbers/:phone_number', async (req, res) => {
    const hashData = secret.hashing(req.params.phone_number);
    const validPhoneNumber = await joinService.getPhoneNumber(hashData)
        .then(result => result.length)
        .catch(err => err);
    res.json(validPhoneNumber);
});

// phoneNumber 에 해당되는 userData 가져오기
// userData  는  id, nickname, follow, follower 가져오기
router.get('/phone-numbers/:phone_number/user-data', async (req, res) => {
    const hashData = secret.hashing(req.params.phone_number);
    const userData = await loginService.getUserDataByPhoneNumber(hashData)
        .then((result) => {
            return {
                id: result[0].id,
                real_name: secret.decrypt(result[0].real_name, key),
                nickname: result[0].nickname,
                following: result[0].following,
                follower: result[0].follower,
                descript: result[0].descript,
            };
        })
        .catch(err => err);
    res.json(userData);
});

router.get('/nicknames/:nickname', async (req, res) => {
    const nickname = await joinService.getNickname(req.params.nickname)
        .then(result => result)
        .catch(err => err);
    res.json(nickname);
});

router.get('/:id/nickname-list/:input', async (req, res) => {
    const dataList = await searchService.getNicknameLists(req.params.id, req.params.input)
        .then(result => result)
        .catch(err => err);
    res.json(dataList);
});

router.get('/:id/following', async (req, res) => {
    const following = followService.getFollowing({
        id
    })
        .then(result => result)
        .catch(err => err);
    res.send(following);
});

router.get('/:id/follower', async (req, res) => {
    const follower = followService.getFollower({
        id
    })
        .then(result => result)
        .catch(err => err);
    res.send(follower);
});

router.get('/:id/:following/nickname-list', async (req, res) => {
    const nicknameList = await followService.getFollowingFilter({
        id: req.params.id,
        following: req.params.following,
    })
        .then(result => result)
        .catch(err => err);
    res.send(nicknameList);
});
router.get('/:id/:follower/nickname-list', async (req, res) => {
    const nicknameList = await followService.getFollowerFilter({
        id: req.params.id,
        following: req.params.follower,
    })
        .then(result => result)
        .catch(err => err);
    res.send(nicknameList);
});

router.get('/password/:phone_number/:user_password', async (req, res) => {
    const hashData = secret.hashing(req.params.phone_number);
    const correct = await loginService.getPasswordByPhoneNumber(hashData)
        .then(result => secret.checkHashword(result[0].user_password, req.params.user_password))
        .catch(err => err);
    res.json(correct);
});

router.put('/following/:user_id/to/:id', async (req, res) => {
    const updatedUser = followService.addFollowingUser({
        user_id: req.params.user_id,
        id: req.params.id
    })
        .then(result => result)
        .catch(err => err);
    res.send(updatedUser);
});

router.put('/follower/:id/to/:user_id', async (req, res) => {
    const updatedUser = followService.addFollowerUser({
        user_id: req.params.user_id,
        id: req.params.id,
    })
        .then(result => result)
        .catch(err => err);
    res.send(updatedUser);
});

router.put('/unfollowing/:user_id/to/:id', async (req, res) => {
    const updatedUser = followService.removeFollowingUser({
        user_id: req.params.user_id,
        id: req.params.id,
    })
        .then(result => result)
        .catch(err => err);
    res.send(updatedUser);
});

router.put('/unfollower/:id/to/:user_id', async (req, res) => {
    const updatedUser = followService.removeFollowerUser({
        user_id: req.params.user_id,
        id: req.params.id,
    })
        .then(result => result)
        .catch(err => err);
    res.send(updatedUser);
});

router.get('/id/:nickname', async (req, res) => {
    const userId = await followService.getIdByNicknames(req.params.nickname)
        .then(result => result)
        .catch(err => err);
    res.json(userId);
});

router.put('/posts/:id/contents', async (req, res) => {
    const id = req.params.id;
    const contents = req.body.data.contents;
    const result = await editService.updateTextContents({ id, contents })
        .then(result => result)
        .catch(err => err);
    res.send('ok');
});

router.put('/posts/:id/images', async (req, res) => {
    const id = req.params.id;
    const images = JSON.stringify(req.body.data.images);
    const result = await editService.updateImagesContents({ id, images })
        .then(result => result)
        .catch(err => err);
    res.send('ok');
});

router.put('/profile/:id/descript', async (req, res) => {
    const descript = req.body.data.descript;
    const id = req.params.id;
    const result = await profileService.updateDescript({ id, descript })
        .then(result => result)
        .catch(err => err);
    res.send('ok');
});

router.delete('/posts/:id', async (req, res) => {
    const id = req.params.id;
    const result = await editService.removeContents({ id })
        .then(result => result)
        .catch(err => err);
    res.send('ok');
});

module.exports = router;