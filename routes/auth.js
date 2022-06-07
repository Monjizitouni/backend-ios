const express = require('express')
const  router = express.Router()


const AuthController  = require('../controllers/AuthController')
const Authpharm  = require('../controllers/Authpharm')

const upload    = require('../middleware/upload')

 //REGISTER
/**
 * @swagger
 * /api/register:
 *  post:
 *      tags: [Registration]
 *      description: if you're a new user you'll have to register
 *      parameters:
 *          - in: body
 *            name: username
 *            description: the user's name
 *            required: true
 *            example: user1
 *          - in: body
 *            name: email
 *            description: the user's email
 *            required: true
 *            example: user1@esprit.com
 *          - in: body
 *            name: phone
 *            description: the user's password
 *            required: true    
 *      responses:
 *          200: 
 *              description: Register successfuly
 *          403: 
 *              description: User already exist
 */
router.post('/register',upload.single('avatar'), AuthController.register)
//LOGIN
/**
 * @swagger
 * /api/login:
 *  post:
 *      tags: [Login]
 *      description: login using an email and a password
 *      parameters:
 *          - in: body
 *            name: email
 *            description: the user's email
 *            required: true
 *            example: user@esprit.com
 *          - in: body
 *            name: password
 *            description: the user's password
 *            required: true
 *      responses:
 *          200: 
 *              description: login successfuly
 *          403: 
 *              description: wrong password or email
 */
router.post('/login',AuthController.login)
//REGISTER
/**
 * @swagger
 * /api/registerpharm:
 *  post:
 *      tags: [Registration]
 *      description: if you're a new user you'll have to register
 *      parameters:
 *          - in: body
 *            name: username
 *            description: the user's name
 *            required: true
 *            example: user1
 *          - in: body
 *            name: email
 *            description: the user's email
 *            required: true
 *            example: user1@esprit.com
 *          - in: body
 *            name: phone
 *            description: the user's phone
 *            required: true
 *          - in: body
 *            name: password
 *            description: the user's password
 *            required: false
 *            schema:
 *              type: string
 *              default: 0
 *          - in: body
 *            name: idu
 *            description: the user's address
 *            required: false
 *            schema:
 *              type: string 
 *          - in: body
 *            name: longitude
 *            description: 
 *            required: true 
 *            schema:
 *              type: string
 *              default: false  
 *      - in: body
 *            name: latitude
 *            description: 
 *            required: true 
 *            schema:
 *              type: string
 *              default: false  
 * 
 *      responses:
 *          200: 
 *              description: Register successfuly
 *          403: 
 *              description: User already exist
 */

router.post('/registerpharm',Authpharm.registerpharm)
//GET ALL PHARM
/**
 * @swagger
 * /api/show:
 *  get:
 *      tags: [Get all users]
 *      description: get the users list
 */
router.get('/show', Authpharm.recupererpharm)
router.post('/loginpharm',Authpharm.loginpharm)
// RESEND CONFIRMATION EMAIL
/**
 * @swagger
 * /api/reEnvoyerConfirmationEmail:
 *  post:
 *      tags: [Resend Confirmation Email]
 *      description: resending a confirmation email to the user for resetting his/her password
 *      parameters:
 *          - in: body
 *            name: email
 *            description: the email that will receive the confirmation email
 *            required: true
 *      responses:
 *          200: 
 *              description: Confirmation email is sent to your email
 *          403: 
 *              description: User not found
 */
router.post("/reEnvoyerConfirmationEmail", AuthController.reEnvoyerConfirmationEmail);
// GET CONFIRMATION EMAIL 
/**
 * @swagger
 * /users/confirmation/:token:
 *  post:
 *      tags: [Confirmation]
 *      description: Get the confirmation token
 *      parameters:
 *          - in: params
 *            name: tokenValue
 *            description: the confirmation token
 *            required: true
 *      responses:
 *          200: 
 *              description: Confirmation done
 *          403: 
 *              description: Confirmation not successuful
 */
router.get("/confirmation/:token", AuthController.confirmation);
// FORGET PASSWORD
/**
 * @swagger
 * /api/motDePasseOublie:
 *  post:
 *      tags: [Forget Password]
 *      description: forget password function
 *      parameters:
 *          - in: body
 *            name: email
 *            description: the code you'll recieve in an email to reset the pssword
 *            required: true
 *      responses:
 *          200: 
 *              description: reinitialisation code is sent to your email
 *          403: 
 *              description: User not found
 */
router.post("/motDePasseOublie", AuthController.motDePasseOublie);
// RESET PASSWORD
/**
 * @swagger
 * /api/changerMotDePasse:
 *  put:
 *      tags: [Reset Password]
 *      description: Resetting the user's password
 *      parameters:
 *          - in: body
 *            name: email
 *            description: the user's email that will reset his/her password
 *            required: true
 *          - in: body
 *            name: nouveauMotDePasse
 *            description: the user's new password
 *            required: true
 *      responses:
 *          200: 
 *              description: Password reset successfuly
 *          403: 
 *              description: Could not reset password
 */

router.put("/changerMotDePasse", AuthController.changerMotDePasse);

module.exports= router