const {communities} = require("../Models/community.model.model");

function getCommunities (req, res) {
    res.send(communities);
};

function postCommunities(req, res) {
    if (!req.body.name.required && !req.body.slug.required) {
        return res.status(400).send('Community\'s name and slug are mandatory');
    }
    const newCommunity = {
        name: req.body.name,
        slug: req.body.slug,
    }
    communities.push(newCommunity);
    res.send(newCommunity);
};

module.exports = {

}


