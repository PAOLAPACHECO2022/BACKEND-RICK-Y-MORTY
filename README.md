


Para iniciar la API BACKEND ejecutamos los siguientes pasos:

1. `npm  init` para crear el paquete.json
2.npm i express mongoose passport passport-jwt jsonwebtoken body-parser bcryptjs validator
Se descarga los siguientes modulos
3. `npm i -D nodemon` 
4. Se ejecuta el node server.
5. En el paquete  package.json generado  cambiamos "start": "node server.js" por "server": "nodemon server.js"
Conexión a MongoDB con Mongoose
:
1. Se crea  un archivo `keys.js` dentro del directorio `config` y se pega en el URI de MongoDB de **mLab** a keys.js. Ejemplo:

```javascript
module.exports = {  mongoURI:  "mongodb://username:password@ds117545.mlab.com:17545/react-social-network"};

2.  Se agrega dentro del directorio de config: `const mongoose = require("mongoose" );` y  `server.js`
//DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB thru Mongoose
mongoose
  .connect(db)
  //.then = if it connects successfully
  .then(() => console.log("MongoDB Connected"))
  //catches if login had error (wrong pw in keys.js or something)
  .catch(err => console.log(err)); 

Enrutamiento de archivos con Express Router
Se crean rutas separadas  para cada uno de nuestros objetos.
1. Creamos una carpeta llamada router que contendrá cada una de las API.
Ejemplo:

•	users.js se encarga de la autenticación (nombre de usuario, correo electrónico, auténtico)
•	profile.js(CRUD Perfil,  CRUD Personajes, CRUD Temporadas)
•	posts.js para publicaciones de personajes más destacados y/ o favoritos y comentarios de usuarios.
2. Se agrega en server.js
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");
3. Se ustilizan las rutas app.use
// Use Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

Creación del modelo de usuario: autenticación, tokens web JSON, registro, inicio de sesión
1. Se crea el directorio models para User.js, profile.js y post.js, Los cuales definirán el tipo de variable y/o atributo del objeto 
2.  npm i gravatar para sacar el avatar del correo electrónico.
3. Se instala cryptjspara hash de contraseña
      
const bcrypt = require("bcryptjs");      
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }



4. Utilizamos el correo electrónico y la contraseña para el inicio de sesión (Tokens)

// @route   GET api/users/login
// @desc    Login User / Returning JWT (token)
// @access  Public
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  //Find the user by email
  //by using User model
  User.findOne({ email }).then(user => {
    //Check for user
    if (!user) {
      return res.status(404).json({ email: "User not found" });
    }
    //If user is good, check password
    //use bcrypt to compare pw and hashed
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //if User passed, generate the token
        res.json({ msg: "Successful Login" });
      } else {
        return res.status(400).json({ password: "Incorrect Password" });
      }
    });
  });
});
5. Se crea un JSON Webtoken (JWT) para iniciar sesión. Para esto creamos JWT importando dependencias y definiendo jwt.sing para aplicar el token:
const jwt = require("jsonwebtoken");, se declara una clave dentro del directorio config, en la carpeta Key.js : secretOrKey: "secret"
 y esta a su vez se importa en user.js


Implementación del Passport para autenticación JWT
 Se verifica el token del paso anterior.
1. se incluye el Passport en el server.js
//request and response object
//app.get("/", (req, res) => res.send("Hello Me"));

//Passport middleware
app.use(passport.initialize());

//Passport Config
require('./config/passport')(passport);

// Use Routes
//app.use("/api/users", users);
//app.use("/api/profile", profile);
//app.use("/api/posts", posts);
2. Se actualiza el User.js y el Passport.js con el token JWT
3. Se usa el validator.js en el register.js, para validar los posibles errores  y el is-empaty.js para comprobar si hay algo vacio.
const Validator = require("validator");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  if(!Validator.isLength(data.name, { min: 2, max: 30 })){
      errors.name = 'Name must be between 2 and 30 characters';
  }

  return {
      errors,
      isValid: errors
  }
};
4. Se configura el login.js 
const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  // gets tested as an empty string
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!Validator.isEmail(data.email)) {
    errors.email = "Invalid Email";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

   //the order of checking matters
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
Definición de API	s Rutas

1. Se instala mongoose y se define dentro de cada uno de los archivos .js de models : Post.js, profile.js y user.js, Es decir se enrutan los modelos de perfil, usuario y post 

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const Profileschema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  fullname: {
    type: String,
    required: true,
    max: 40
  },

  city: {
    type: String,
    required: false
  },
  telepone: {
    type: Number,
    required: false
  },
  email: {
    type: String
  },


  character: [
    {
     namecharacter: {
        type: String,
        required: true
      },
     status: {
        type: String,
        required: true
      },
      creaciondate: {
        type: Date,
        required: true
      },
      species: {
        type: String
      }
   
    
    }
  ],

  season: [
    {
      nameseason: {
        type: String,
        required: true
      },
      version: {
        type: String,
        required: true
      },
      episodes: {
        type: Number,
        required: true
      },
      numbercharacters: {
        type: Number,
        required: true
      },

    }
  ],
 
  create: {
    type: Date,
    default: Date.now
  }
});

//export this as a se prueba como una cadena vacíamongoose.model('profile', Profileschema);


2. A través del Validator hacemos validaciones para profile.js, charcter.js, season.js, login.js, post.js y register.js, se prueba como una cadena vacía cada una de las variables.

const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateSeasonInput(data) {
  let errors = {};

  // gets tested as undef or null and gets turned into an expty string
  data.namecharacter = !isEmpty(data.namecharacter) ? data.namecharacter: '';
  data.status = !isEmpty(data.status) ? data.status : '';
  data.creaciondate = !isEmpty(data.creaciondate) ? data.creaciondate : '';
  data.species = !isEmpty(data.species) ? data.species : '';
  


  if (Validator.isEmpty(data.namecharacter)) {
    errors.namecharacter = 'Characternumber field is required';
  }
  if (Validator.isEmpty(data.status)) {
    errors.status = 'Characternumber field is required';
  }

  if (Validator.isEmpty(data.creaciondate)) {
    errors.creaciondate = 'Field of Character field is required';
  }
  if (Validator.isEmpty(data.species)) {
    errors.species = 'Character field is required';
  }


  return {
    errors,
    isValid: isEmpty(errors)
  };
};
3. Se obtiene el perfil por identificador y adicional todos lo perfiles

POST
 A través del POST de generan nuevas solicitudes y verificar validaciones 
1. api/profile.js
const express = require('express');
const router = express.Router();
//Bringing these in to route the Profile models
const mongoose = require('mongoose');
const passport = require('passport');
//Load profile Models
const Profile = require('../../models/Profile');
//Load User Models
const User = require('../../models/User');

// Mongoose useFindAndModify is deprecated
mongoose.set('useFindAndModify', false);

//Load Validation
const validateProfileInput = require('../../validation/profile');
//Validate Season Input
const validateSeasonInput = require('../../validation/season');
//Validate Character Input
const validateCharacterInput = require('../../validation/character');

// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Profile Works Fine' }));

// @route   GET api/profile/all
// @desc    Get all profiles in array
// @access  Public
router.get('/all', (req, res) => {
  Profile.find()
    .populate('user', ['name', 'avatar'])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = 'There are no profiles';
        return res.status(404).json(errors);
      }
      res.json(profiles);
    })
    .catch(err => res.status(404).json({ profile: 'There are no profiles' }));
});

// @route   GET api/profile/profiles/:profiles
// @desc    Get profile by profiles
// @access  Public
router.get('/fullname/:fullname', (req, res) => {
  const errors = {};

  //grabs profiles from the URL
  Profile.findOne({ fullname: req.params.fullname })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      //check to see if there is no profile
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        res.status(404).json(errors);
      }
      //if there is profile found
      res.json(profile);
    })
    .catch(err => res.status(404).json(errors));
});

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user id
// @access  Public
router.get('/user/:user_id', (req, res) => {
  const errors = {};

  //grabs profiles from the URL
  Profile.findOne({ user: req.params.user_id })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      //check to see if there is no profile
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        res.status(404).json(errors);
      }
      //if there is profile found
      res.json(profile);
    })
    .catch(err => res.status(404).json(errors));
});

// @route   GET api/profile
// @desc    Get current user profile
// @access  Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    //We want errors to be stored into objects, before we pass the into .json
    const errors = {};

    Profile.findOne({ user: req.user.id })
      //Used to bring avatar to profile
      .populate('user', ['name', 'avatar'])
      .then(profile => {
        if (!profile) {
          //Create the error
          errors.noprofile = 'There is no profile for this user';
          //Pass it into Json
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   POST api/profile
// @desc    Create / Edit user profile
// @access  Private
router.post('/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    //Check Validation
    if (!isValid) {
      //Return any error with 400 city
      return res.status(400).json(errors);
    }

    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;

    //check to see if the field we are looking for has been sent it, and then set it as profileFields
    if (req.body.fullname) profileFields.fullname = req.body.fullname;
    if (req.body.city) profileFields.city = req.body.city;
    if (req.body.email) profileFields.email = req.body.email;
    if (req.body.telepone) profileFields.telepone = req.body.telepone;
  
   
    
    //Look for the user before updating stuff
    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        //Update the profile, since one exists
        Profile.findOneAndUpdate(
          //who to update
          { user: req.user.id },
          //the other fields we have req.body'ed for before
          { $set: profileFields },
          { new: true }
        )
          //respond WITH that profile
          .then(profile => res.json(profile));
      } else {
        //Create a user since one does not exist

        //Check to see if profiles exists
        Profile.findOne({ fullname: profileFields.fullname }).then(profile => {
          if (profile) {
            errors.fullname = 'That fullname already exists';
            //error
            res.status(400).json(errors);
          }
          //other wise
          //Save Profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);

// @route   GET api/profile/season
// @desc    Add season to profile
// @access  Private
router.post(
  '/season',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    //create the valid check variable
    const { errors, isValid } = validateSeasonInput(req.body);

    //Check Validation
    if (!isValid) {
      //Return any error with 400 city
      return res.status(400).json(errors);
    }
    //let's find a user by id
    Profile.findOne({ user: req.user.id }).then(profile => {
      //new Season object
      const newLoc = {
        nameseason: req.body.nameseason,
        version: req.body.version,
        episodes: req.body.episodes,
        numbercharacters: req.body.numbercharacters,
      };

      //Add to season array
      profile.season.unshift(newLoc);
      //now save existing profile, which returns a promise
      profile.save().then(profile => res.json(profile));
    });
  }
);

// @route   GET api/profile/character
// @desc    Add character to profile
// @access  Private
router.post(
  '/character',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    //create the valid check variable
    const { errors, isValid } = validateCharacterInput(req.body);

    //Check Validation
    if (!isValid) {
      //Return any error with 400 city
      return res.status(400).json(errors);
    }
    //let's find a user by id
    Profile.findOne({ user: req.user.id }).then(profile => {
      //new Character object
      const newEdu = {
       namecharacter: req.body.namecharacter,
       status: req.body.status,
        creaciondate: req.body.creaciondate,
        species: req.body.species,
      };

      //Add to Character array
      profile.character.unshift(newEdu);
      //now save existing profile, which returns a promise
      profile.save().then(profile => res.json(profile));
    });
  }
);

// @route   DELETE api/profile/season//:exp_id
// @desc    Delete season from profile
// @access  Private
router.delete(
  '/season/:exp_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    //let's find a user by id
    Profile.findOne({ user: req.user.id }).then(profile => {
      //Find the season that we want to delete
      //Get remove index
      //Use indexofmap
      const removeIndex = profile.season
        //turn array of seasons into id's
        .map(item => item.id)
        //gets us the season to delete
        .indexOf(req.params.exp_id);

      //Splice out of the array
      profile.season.splice(removeIndex, 1);

      //Save
      profile
        .save()
        .then(profile => res.json(profile))

        //Catch
        .catch(err => res.status(404).json(err));
    });
  }
);

// @route   DELETE api/profile/character//:edu_id
// @desc    Delete character from profile
// @access  Private
router.delete(
  '/character/:edu_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    //let's find a user by id
    Profile.findOne({ user: req.user.id }).then(profile => {
      //Find the character that we want to delete
      //Get remove index
      //Use indexofmap
      const removeIndex = profile.character
        //turn array ofnamecharacter into id's
        .map(item => item.id)
        //gets us the character to delete
        .indexOf(req.params.edu_id);

      //Splice out of the array
      profile.character.splice(removeIndex, 1);

      //Save
      profile
        .save()
        .then(profile => res.json(profile))

        //Catch
        .catch(err => res.status(404).json(err));
    });
  }
);

// @route   DELETE api/profile
// @desc    Delete user and profile
// @access  Private
router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    //Delete the profile
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      //Delete the user (needs user Model)
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);

module.exports = router;

FRONTED-CARPETA CLIENT

Implementando React - 
1. Se ejecuta create-react-app client para crear la carpeta.
2. npm i concurrently
3. npm install --prefix client
4. npm run dev
5. En la carpeta cliente ejecutamos npm i react-router-dom
6. npm i react-bootstrap bootstrap
7. npm  i axios classnames jwt-decode react-redux react-router-dom redux redu
x-thunk
8. se crean los respectivos directorios y archivos tales como:
Components, components/auth, entre otros y un de los archivos más principales como el App.js, que hace el llamado de cada uno de los componentes y el router
9. Configuración de Redux y autenticación
Se utiliza para compartir datos entre los diversos componentes, 
Para esto instalamos los siguientes paquetes a la carpeta de Client
•	npm i redux react-redux redux-thunk

10. Se configura el usuario extrayendo información del token, para esto instalamos jwtcode
•	npm i jwt-decode
•	import jwt_decode from 'jwt-decode'; en authActions

10. Prepare& Deploy
•	Finalmente verificamos que las claves del config sean correctas, para que el sistema no genere problemas en la conexión con el backend 
keys_devs.js
//we do not want to push this file
module.exports = {
module.exports = {
  mongoURI:
    "mongodb://username:password@ds117545.mlab.com:17545/react-social-network"
};

11. Finalmente ejecutamos en la terminal de client, npm start para ver la ejecución del proyecto en el localhost y a su vez también ejecutamos el backend con nodemon server.js desde la raíz del proyecto.






