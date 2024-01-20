const slider = require('../models/slider');
const fs = require('fs');
const path = require("path");

module.exports.insertSliderData = async(req,res)=>{
    console.log(req.file);
    console.log(req.body);
    let imgPath = '';
    if(req.file){
        imgPath = slider.sliderImgPath+"/"+req.file.filename;
    }
    req.body.sliderImage = imgPath;
    req.body.isActive = true;
    req.body.created_date = new Date().toLocaleString();
    req.body.updated_date = new Date().toLocaleString();
    let sliderData = await slider.create(req.body);
    res.redirect('back')
}

module.exports.view_slider = async(req,res)=>{
 
    let sliderdata = await slider.find({});
    //console.log(sliderdata);
    return res.render('view_slider',{
        adminData : sliderdata
    })
   
}

module.exports.setDeactive = async(req,res)=>{
    try{
        if(req.params.id)
        {
            let activeData = await slider.findByIdAndUpdate(req.params.id,{isActive : false});
        
            if(activeData)
            {
                console.log("Data is Deactive");
                return res.redirect("back");
            }
            else{
                console.log("Data is Active");
                return res.redirect("back");
            }
        }
        else
        {
             console.log("Params is Not Found!!!");
             return redirect("back");
        }
    }
    catch(err)
    {
        console.log(err);
        return res.redirect("back");
    }
}


// active data
module.exports.setActive = async(req,res)=>{
    try{
        if(req.params.id)
        {
            let activeData = await slider.findByIdAndUpdate(req.params.id,{isActive : true});

            if(activeData)
            {
                console.log("Data is Active");
                return res.redirect("back");
            }
            else{
                console.log("Data is Deactive");
                return res.redirect("back");
            }
        }
        else
        {
            console.log("Params is Not Found!!!");
            return redirect("back");
        }
    }
    catch(err)
    {
        console.log(err);
        return res.redirect("back");
    }
}

module.exports.deslider = async (req,res)=>{
    try{
       
        var sliderData = await slider.findById(req.params.id);
        
        if(sliderData)
        {
            var oldImage = sliderData.sliderImage;
            if(oldImage)
            {
                let FullPath = path.join(__dirname,"..",sliderData.sliderImage);
                await fs.unlinkSync(FullPath);
            }
        }
        else
        {
            console.log("Image Path is Worng");
            return res.redirect("back");
        }
        await slider.findByIdAndDelete(req.params.id);
        return res.redirect("back");
    }
    catch(err)
    {
        console.log(err);
        return res.redirect("back");
    }
}