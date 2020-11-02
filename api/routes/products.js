const express=require('express');

const router=express.Router();

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message: 'Get request of all products'
    });
});

router.post('/',(req,res,next)=>{

    const product={
        name:req.body.name,
        price:req.body.price
    }

    res.status(200).json({
        message: 'Post request of all products',
        createdProduct:product
    });
});

router.get('/:productId',(req,res,next)=>{
    const id=req.params.productId;
    if(id==='special'){
        res.status(200).json({
            message:'You discovered a special ID',
            id:id
        })
    }
    else{
        res.status(200).json({
            message:'You passed an ID'       
        })
    }
});

router.patch('/:productId',(req,res,next)=>{
    res.status(200).json({
        message:'You updated an product'         
    })
});

router.delete('/:productId',(req,res,next)=>{
    res.status(200).json({
        message:'You deleted an product',      
    })
});


module.exports=router;