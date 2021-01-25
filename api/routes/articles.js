const express = require('express');
const bodyParser = require('body-parser')
const router = express.Router();

const articles = {}
let idCounter = 0;

router.use(bodyParser.json());

router.get('/', (req, res) => {
    res.json(Object.values(articles));
});

router.get('/:id', (req, res) => {
    const { id } = req.params;

    const article = articles[id];
    if (!articles[id]) {
        res.status(404).send({ error: 'article not found' });
        return;
    }

    res.json(article);
});

router.post('/', (req, res) => {
    const id = ++idCounter;

    const article = {
        id: id,
        title: req.body.title,
        text: req.body.text,
        important: req.body.important
    }

    if (!(article.title.length > 0)) {
        res.status(400).send({ error: 'title must be not empty' });
        return;
    }

    articles[id] = article;

    res.json(article);
});

router.put('/:id', (req, res) => {
    const { id } = req.params;

    const article = articles[id];
    if (!article) {
        res.status(404).send({ error: 'article not found' });
        return;
    }

    if (typeof req.body.title !== 'undefined') {
        article.title = req.body.title;
    }
    if (typeof req.body.text !== 'undefined') {
        article.text = req.body.text;
    }
    if (typeof req.body.important !== 'undefined') {
        article.text = req.body.important;
    }

    res.json(article);
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    if (!articles[id]) {
        res.status(404).send({ error: 'article not found' });
        return;
    }

    delete articles[id];

    res.sendStatus(200);
});

module.exports = router;
