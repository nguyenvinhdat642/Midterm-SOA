const indexController = {
    getIndex: async (req, res) => {
        try {
            res.render('index');
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    },
};

module.exports = indexController;
