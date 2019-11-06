const errorHandler =  (err, req, res, next) => {
    console.log('errorHandler');
    if(!err.status) {
        res.status(500).send('Internal Server Error');
    }
    res.status(err.status).send({message: err.message});
    
}

module.exports = errorHandler;