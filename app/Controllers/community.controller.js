const Communities = require("../Models/community.model");
const User = require("../Models/user.model");
const Tags = require("../Models/tag.model");

function createCommunities(req, res) {
    if (!req.body.name && !req.body.slug) {
        return res.status(400).send('Community\'s name and slug are mandatory');
    }

    console.log("req.user.userId: " + req.user.userId);

    const community = new Communities({
        slug: req.body.slug,
        name: req.body.name,
        users: req.user.userId,
        creator: req.user.userId,
    });

    community.save()
        .then((result) => {
            res.send(result);
        }).catch((err) => {
        res.status(500).send(err);
    })
};

function deleteCommunity(req, res) {
    console.log("deleteCommunity: ");
    console.log("req.user.userId: " + req.user.userId);
    console.log("red.body.slug: " + req.body.slug);

    Communities.findOne({"creator" : req.user.userId, "slug" : req.body.slug })
        .then((result) => {
            if(result){
                Communities.findOneAndDelete({"creator" : req.user.userId, "slug" : req.body.slug})
                    .then((result) => {
                        res.send("delete community complet");
                    }).catch((err) => {
                    res.status(500).send(err);
                });
            } else {
                res.send("you do not have the rights to delete this community");
            }
        }).catch((err) => {
        res.status(500).send(err);
    });
}

function listCommunitybyCreator(req, res) {
    console.log(req.user.userId);

    Communities.find({"creator" : req.user.userId})
        .then((result) => {
            const test = [];

            for(item of result) {
                console.log(item.name);
                test.push(item.name);
            }
            res.send(test);
        }).catch((err) => {
        res.status(500).send(err);
    });
}

function addTagToCommunity(req, res) {
    console.log(req.params.slug);
    console.log(req.body.title);
    console.log(req.user.userId);

    Tags.findOne({"title" : req.body.title})
        .then((result) => {
            if(result) {
                res.send("this title is already taken");
            } else {
                Communities.findOne({"slug" : req.params.slug, "creator" : req.user.userId})
                    .then((result) => {
                        if(result){
                            if (!req.body.title) {
                                return res.status(400).send('Parameters missing');
                            }
                            const tag = new Tags({
                                title: req.body.title,
                                community: result._id
                            });
                            tag.save()
                                .then((result) => {
                                    res.send(result);
                                }).catch((err) => {
                                res.status(500).send(err);
                            })
                        } else {
                            res.send("your user doesn't have the rights to create tags in this community");
                        }
                    }).catch((err) => {
                    res.status(500).send(err);
                });
            }
        }).catch((err) => {
        res.status(500).send(err);
    })
}

function deleteTagToCommunity(req, res) {
    console.log(req.params.slug);
    console.log(req.body.tags);
    console.log(req.user.userId);

    Communities.findOne({"slug" : req.params.slug, "creator" : req.user.userId})
        .then((result) => {
            if(result) {
                Tags.findOneAndDelete({"title": req.body.tags, "community": result._id},)
                    .then((result) => {
                        if(!result) {
                            res.send("this tags doesn't exist");
                        }
                        else {
                            res.send(result);
                        }
                    }).catch((err) => {
                    res.status(500).send(err);
                });
            } else {
                res.send("your user doesn't have the rights to create tags in this community");
            }
        }).catch((err) => {
        res.status(500).send(err);
    });
}

function listTagsofCommunity(req, res) {
    console.log(req.params.community);

    Communities.findOne({"name" : req.params.community })
        .then((result) => {
            console.log(result._id);
            Tags.find({"community" : result._id })
                .then((result) => {
                    const test = [];

                    for(item of result) {
                        console.log(item.title);
                        test.push(item.title);
                    }
                    res.send(test);
                }).catch((err) => {
                res.status(500).send(err);
            });
        }).catch((err) => {
        res.status(500).send(err);
    });
}

module.exports = {
    createCommunities, addTagToCommunity, deleteTagToCommunity, deleteCommunity, listCommunitybyCreator, listTagsofCommunity
}


