const offermodel = require('../models/offermodel');
const path = require('path');

module.exports.insertofferData = async (req, res) => {
    // console.log(req.body);
 
            req.body.isActive = true;
            req.body.currentDate = new Date().toLocaleString();
            req.body.updateDate = new Date().toLocaleString();
            const offerdata = await offermodel.create(req.body)
    

return res.redirect('back');
}

module.exports.view_offer = async(req,res)=>{
    let offerdetails = await offermodel.find({});
    return res.render('view_offer',{
        adminData : offerdetails
    })
}


module.exports.setDeactive = async(req,res)=>{
    try{
        if(req.params.id)
        {
            let activeData = await offermodel.findByIdAndUpdate(req.params.id,{isActive : false});
        
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
            let activeData = await offermodel.findByIdAndUpdate(req.params.id,{isActive : true});

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