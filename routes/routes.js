const characterRoutes = require('./characters');

const appRouter = (app, fs) => {
    if (typeof window !== "undefined") {
        app.get('/', (req, res) => {
            res.send('welcome to the lara development api-server');
        });
        characterRoutes(app, fs);
    }
    
};

module.exports = appRouter;