const getApi = (req, res, next) => {
    //res.render('index.html');
    console.log('getApi');
    res.send('Hello World! desde el backend');
    next();
};

module.exports = {
    getApi
}
