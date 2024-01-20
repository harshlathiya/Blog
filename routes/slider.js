const express = require('express');
const routs = express.Router(); 
const slider = require('../models/slider');
const sliderController = require('../controllers/sliderController');

routs.get('/add_slider', async(req,res)=>{
    return res.render('add_slider')
})

routs.post('/insertSliderData', slider.sliderUploadImage,sliderController.insertSliderData);
routs.get("/deslider/:id",sliderController.deslider);
routs.get('/view_slider',sliderController.view_slider);
routs.get('/setDeactive/:id',sliderController.setDeactive);
routs.get('/setActive/:id',sliderController.setActive);
module.exports = routs;