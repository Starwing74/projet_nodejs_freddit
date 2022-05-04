const express = require('express');
const communityController = require('../Controllers/community.controller');

const communityRouter = express.Router();

communityRouter.post('/post', communityController.postCommunities);

module.exports = communityRouter;