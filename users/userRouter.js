const express = 'express';

const router = express.Router();

router.post('/', (req, res) => {

});

router.post('/:id/posts', (req, res) => {

});

router.get('/', (req, res) => {

});

router.get('/:id', (req, res) => {

});

router.get('/:id/posts', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

//custom middleware

function validateUserId(req, res, next) {
    if(){

    } else {
        res.status().json()
    }
};

function validateUser(req, res, next) {
    if(){

    } else {
        res.status().json()
    }
};

function validatePost(req, res, next) {
    if(){

    } else {
        res.status().json()
    }
};

module.exports = router;
