const express = require("express");
const productController = require("../controllers/productController");
const router = express.Router();
const path=require("path")

router.post("/add-product/:firmId", productController.addProduct);
router.get("/getprod/:firmId", productController.getProductByFirm);
//route for fetching image
router.get("/uploads/:image",(req,res)=>{
        const image=req.params.image
        res.headersSent('Content-Type','image/jpeg')
        res.sendFile(path.join(__dirname,'..','uploads',imageName))
        
        
    
})
router.delete("/del-product/:prodId",productController.deleteProd)
module.exports = router;
