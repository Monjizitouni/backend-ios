const Pharm   = require('../models/pharm')
const bcrypt  =require('bcryptjs')
const jwt    =require('jsonwebtoken')
const { response } = require('express')

const registerpharm =(req, res, next)=> {
    console.log(
        req.body.username
)
console.log(
    req.body.email
)
console.log(
    req.body.phone
)
console.log(
    req.body.password
)
console.log(
    req.body.idu
)
console.log(
    req.body.region
)
console.log(
    req.body.longitude
    )
console.log(
    req.body.latitude 
)

Pharm.findOne({email: req.body.email}, function(err, pharm){
    if(err) {
      console.log(err);
    }
    var message;
    if(pharm) {
      console.log(pharm)
      return res.json({
        message : 'user exists'
      })
        console.log(message)

    } else {
        bcrypt.hash(req.body.password,10, function(err,hashedPass){
            if(err){
                console.log('user erreur1')
                console.log(err)
               return res.json({
                    
                    error: err
    
                })
            }
            let pharm =new Pharm({
                username: req.body.username,
                email:req.body.email,
                phone:req.body.phone,
                password: hashedPass,
                idu:req.body.idu,
                region:req.body.region,
                longitude:req.body.longitude,
                latitude:req.body.latitude,
        
        
            })
        
            pharm.save()
            .then(pharm =>{
                console.log('user added')
                 return res.json({
                    username :pharm.username,
                    email :pharm.email,
                    phone :pharm.phone,
                    password :hashedPass,
                    idu :pharm.idu,
                    region :pharm.region,
                    longitude :pharm.longitude,
                    latitude :pharm.latitude,
                })
            })
            .catch(error =>{
                console.log('user erreur2')
                 return res.json({
                    message:'error with user adding'
                })
            })
    
        })
    }
    
});


  

}


const loginpharm = (req, res ) => {
    var logname = req.body.logname 
    var password =req.body.password
    Pharm.findOne({email: logname}, function(err, pharm){
        if(err) {
          console.log(err);
        }
       
        if(pharm) {
            bcrypt.compare(password, pharm.password, function(err,result){
                if(err){
                    res.json({
                        error: err
                    })
                }
                if(result){
                    let token = jwt.sign({username: pharm.username},'verysecretValue',{expiresIn: '1h'})
              console.log(result)
                    return res.json({
                
                         username :pharm.username,
                        email :pharm.email,
                        phone :pharm.phone,
                       password : pharm.password,
                       idu :pharm.idu,
                       region :pharm.region,
                       longitude :pharm.longitude,
                       latitude :pharm.latitude,
                       token
                       

                    })
                
                }else{
                    res.json({
                        message:'password does not matched !'
                    })
                }
            })

    
             } else {
            return res.json({
                message : 'usere leee'
            })
     
            
        
        }
    })

}
const recupererpharm = async (req, res) => {
    var pharm;
      if (req.body._id) {
          pharm = await Pharm.findById(req.body._id)
        

          
      } else {
          pharm = await Pharm.find()
      
        
      }
      
  
      res.send({ pharm })
  }




module.exports ={
    registerpharm, loginpharm,recupererpharm

    }