const express = require('express');
const communityController = require('../Controllers/community.controller');
const sessiontesting = require("express-session");
const getSession = require("../Middleware/session");
const verifyToken = require("../Middleware/auth");

const communityRouter = express.Router();

communityRouter.post('/create', verifyToken,communityController.createCommunities);
communityRouter.delete('/delete', verifyToken,communityController.deleteCommunity);
communityRouter.get('/listCommunity', verifyToken,communityController.listCommunitybyCreator);
communityRouter.put('/addTag/:slug', verifyToken,communityController.addTagToCommunity);
communityRouter.delete('/removeTag/:slug', verifyToken,communityController.deleteTagToCommunity);
communityRouter.get('/listTags/:community', verifyToken,communityController.listTagsofCommunity);

module.exports = communityRouter;