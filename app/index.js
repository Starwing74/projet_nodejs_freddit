const express = require('express');
const PORT = 4002;
const app = express();

const postRouter = require('./Routers/post.router')

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome freddit');
});

app.use('/post', postRouter);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})