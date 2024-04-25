const shortid=require("shortid");
const URL=require("../models/url");
const express=require("express")

async function handleGenerateNewShortURL(req,res){
    const body=req.body;
    if(!body.url) {return res.status(400).json({error:"Body is required"});}
    const shortId=shortid(8);
    await URL.create({
        shortId:shortId,
        redirectUrl:body.url,
        visitHistory:[],
        createdBy:req.user._id,
    });
    return res.redirect("/");
}

async function handleGetAnalytics(req,res){
    const shortId = req.params.id;
    const Url=await URL.findOne({shortId});
    return res.json({TotalClicks:Url.visitHistory.length,Analytics:Url.visitHistory})
}

module.exports={
    handleGenerateNewShortURL,
    handleGetAnalytics,
}