const express   = require('express')
const mongoose  = require('mongoose')
const morgan    = require('morgan')
const bodyParser = require('body-parser')
const config = require("./config.json");
//Swagger implementation
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const userRoute = require ('./routes/users')
const AuthRoute = require  ('./routes/auth')
const Medics = require  ('./routes/medica')
const Catc = require  ('./routes/cate')

mongoose.connect(config.database,{useNewUrlParser : true , useUnifiedTopology:true})
const db  = mongoose.connection

db.on('error',(err) =>{
    console.log(err)
} )

db.once('open', ()=> {
    console.log('DB Connection Estabblished !')
})



const app=express()

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json())
app.use('/uploads', express.static('uploads'))

const PORT = process.env.PORT || 3000

app.listen(PORT,  ()=> {
    console.log(`server is running on port ${PORT}`)
})


app.use('/api/users',userRoute)
app.use('/api',AuthRoute)
app.use('/medic',Medics)
app.use('/catc',Catc)

//swagger
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "E-PHARM",
            description: "E-Pharm: mobile application to assist people in ordering their meds whenever they want and get delivered to them to their location",
            version: "2.0.0",
            contact: {
                name: "us via email",
                email: "E-Pharm.ios@gmail.com"
            },
            server: ["http://localhost:3000"],
        }
    },
    apis: ["./routes/auth.js"]
};



const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

