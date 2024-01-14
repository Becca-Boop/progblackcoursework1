const characterRoutes = require('./characters');

const appRouter = (app, fs) => {
    app.get('/', (req, res) => {
        res.send('welcome to the development api-server');
    });
    characterRoutes(app, fs);
};

// this line is unchanged
module.exports = appRouter;