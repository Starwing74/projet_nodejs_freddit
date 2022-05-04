const Communities = require("../Models/community.model");
const User = require("../Models/user.model");

function postCommunities(req, res) {
    if (!req.body.name && !req.body.slug) {
        return res.status(400).send('Community\'s name and slug are mandatory');
    }

    const community = new Communities({
        slug: req.body.slug,
        name: req.body.name
    });

    community.save()
        .then((result) => {
            res.send(result);
        }).catch((err) => {
        res.status(500).send(err);
    })
};



module.exports = {
    postCommunities
}


