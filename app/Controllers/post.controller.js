const Post = require('../Models/post.model');

function postPost(req, res) {
    if (
        !req.body.slug
        && !req.body.title
        && !req.body.community
        && !req.body.user
    ) {
        return res.status(400).send('Parameters missing');
    }
    const post = new Post({
        slug: req.body.slug,
        title: req.body.title,
        community: req.body.community,
        user: req.body.user
    });
    post.save()
        .then((result) => {
            res.send(result);
        }).catch((err) => {
        res.status(500).send(err);
    })
}

function test(req, res){
    //res.send('Welcome to my web server');
    let p1 = req.param("p1");
    console.log(p1);
    res.sendFile('C:\\LP_SMIN\\M12_node_js\\Projet_Node_js\\freddit\\app\\Pages\\page1.html');
}

function test2(request, response) {
    let p1 = request.body.p1
    console.log(request.body);
    console.log("p1=" + p1);
    response.sendFile('C:\\LP_SMIN\\M12_node_js\\Projet_Node_js\\freddit\\app\\Pages\\post.html');
}

module.exports = {
    postPost, test, test2
}