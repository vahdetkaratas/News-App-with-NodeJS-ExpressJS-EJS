const axios = require('axios');


exports.homeRoutes = (req, res) => {
    // Make a get request to /api/news
    axios.get('http://localhost:3000/api/news')
        .then(function(response){
            res.render('index', { news : response.data });
        })
        .catch(err =>{
            res.send(err);
        })

    
}

exports.add_news = (req, res) =>{
    res.render('add_news');
}

exports.update_news = (req, res) =>{
    axios.get('http://localhost:3000/api/news', { params : { id : req.query.id }})
        .then(function(newsdata){
            res.render("update_news", { news : newsdata.data})
        })
        .catch(err =>{
            res.send(err);
        })
}