module.exports = (err, req, res, next) => {
    if (err.name === 'ValidationError'){
        err.statusCode = 400
    }
    console.log("maaaaaa",err);
    res.status(err.statusCode || 500).json({ message: err.message });
};