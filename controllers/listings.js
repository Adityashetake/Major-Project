const Listing = require("../models/listing.js")


module.exports.index = async (req,res)=> {
const  allListings = await Listing.find({});

res.render("listings/index.ejs",{ allListings});
 
};

module.exports.renderNewForm = (req,res) => {
    res.render("listings/new.ejs");
}
module.exports.ShowListing = async(req,res) => {

    let {id} = req.params;
    const listing = await Listing.findById(id).populate({path:"reviews",populate:{
        path:"author",
    },
}).populate("owner");
    if(!listing){

    req.flash("error","listing you requested does  not exist! ");
    res.redirect("/listings");
    }
    res.render("listings/show.ejs",{listing});
    

}


module.exports.createListing = async(req,res,next) => {

 
   let url=  req.file.path;
   let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image ={url,filename};
   await newListing.save();
    req.flash("Success","new listing created");
    
   res.redirect("/listings");
  
    
 

}
module.exports.renderEditForm = async (req,res) =>{
 let {id} = req.params;
    const listing = await Listing.findById(id);
if(!listing){

    req.flash("error","listing you requested does  not exist! ");
     return res.redirect("/listings");
    }
res.render("listings/edit.ejs",{listing});
}
module.exports.updateListing = async(req,res) => {
let {id} = req.params;


await Listing.findByIdAndUpdate(id,{...req.body.listing});
 req.flash("success","listing Updated");
res.redirect(`/listings/${id}`);

}
module.exports.deleteListing =  async(req,res) => {
   let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success","listing Deleted");
    res.redirect("/listings");
}
module.exports.searchListing = async (req, res) => {

    const { q } = req.query;
    console.log(q);
    
    const allListings = await Listing.find({
        $or: [
            { title: { $regex: q, $options: "i" } },
            { location: { $regex: q, $options: "i" } },
            { country: { $regex: q, $options: "i" } }
        ]
    });

    res.render("listings/index", { allListings });
};
module.exports.filterCategory = async (req, res) => {

    const { category } = req.params;

    const allListings = await Listing.find({
        category: category
    });

    res.render("listings/index", { allListings });
};