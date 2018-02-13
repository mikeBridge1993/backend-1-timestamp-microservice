const express = require('express');
const moment = require('moment');
const port = process.env.PORT || 3000;

var app = express();
app.use(express.static('public'));

app.get('/:id', (req, res) =>{
    var dates = req.params.id;
    var result;
    
    if(moment(dates, "LL", true).isValid()){ 
        //Correct format: Month Day, Year
        result = {unix : moment(dates).format('x'), natural : dates}
    } else if(moment(dates, "x", true).isValid()){
        //Correct format: Unix Time Stamp
        result = {unix :dates, natural : moment.unix(dates).format('LL')}
    } else {
        result = {unix : null, natural : null}
    }
    
    res.send(result);
});

app.listen(port,() => {
    console.log("Server is up on port " + port)
});