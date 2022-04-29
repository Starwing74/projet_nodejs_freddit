const {posts} = require("./app/Models/post.model.model");

function getPosts (req, res) {
    res.send('<p>posts.title</p>');
};

function getPostbyCommunity (req, res) {

};

function postPost (req, res) {

};

function putPost (req, res) {

};

function deletePost (req, res) {

};

module.exports = {
    getPosts, getPostbyCommunity, postPost, putPost ,deletePost
}