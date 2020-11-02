const express= require('express');
const app=express();
const morgan=require('morgan');
const bodyParser=require('body-parser');


const productRoutes=require('./api/routes/products');
const orderRoutes=require('./api/routes/orders');

app.use(morgan('dev'));

//types of body parser to user
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//add headers to response
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization');

    //Options request is send only first time by browser to see all available options
    if(req.method=== 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
});

app.use('/products',productRoutes);
app.use('/orders',orderRoutes);

//If no route has reached both of above files then error is generated
//It will get only route error
app.use((req,res,next)=>{
    const err=new Error('Not found');
    err.status=404;
    next(err);
});

//It will get all kinds of error database and also the above forwarded error
app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message:error.message
        }
    });
});

module.exports=app;