import { RecipeModel } from "../models/Recipes.js";
import express from "express"
import mongoose from "mongoose";
import { UserModel } from "../models/User.js";
const router = express.Router();

router.get('/',async(req,res)=>{
    try{
        const response = await RecipeModel.find({});
        res.json(response);
    }catch(err){
        res.json(err);
    }
    
})
router.post('/',async(req,res)=>{
    const recipe = new RecipeModel(req.body);

    try{
        const response = await recipe.save();
        res.json(response);
       
    }catch(err){
        res.json(err);
    }
    
});

// saved recipes route -- 
 // we need user id and recipe id -- konse user ne konsi recipe save kri h
router.put('/',async(req,res)=>{
    try{
        const user = await UserModel.findById(req.body.userID);
        const recipe = await RecipeModel.findById(req.body.recipeID);
        user.savedRecipes.push(recipe); 
        await user.save();
        res.json({savedRecipes:user.savedRecipes});
    }catch(err){
        res.json(err);
    }
    
});

router.get('/savedRecipes/ids/:userID',async(req,res)=>{
    try{
        const user = await UserModel.findById(req.params.userID);
        res.json({savedRecipes:user?.savedRecipes});

    }catch(err){
        res.json(err);
    }
});

router.get('/savedRecipes/:userID',async(req,res)=>{
    try{
        const user = await UserModel.findById(req.params.userID);
        const savedRecipes = await RecipeModel.find({
            _id:{$in:user.savedRecipes},
        });
        res.json({savedRecipes});
    }catch(err){
        res.json(err);
    }
})

export {router as recipesRouter};