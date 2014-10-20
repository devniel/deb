/**
 * Configuración para el uso
 * del framework Express 4
 *
 * @author  devnieL
 * 
 */

var express         = require('express');
var logger          = require('morgan');
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');
var app             = express();
var flash 		    = require('connect-flash');
var helpers         = require('view-helpers');
var swig            = require('swig');
var session         = require('express-session')
var MongoStore      = require('connect-mongo')(session);
var credentials          = require("./credentials")[process.env.NODE_ENV || 'development'];
var multer          = require('multer');
var errorHandler    = require('errorhandler');
var favicon = require('serve-favicon');
var compress = require('compression');
var cookieParser = require('cookie-parser')

module.exports = function(app, i18n) {

	var env = process.env.NODE_ENV || 'development';

    app.use(compress());

    /*======================================
	Express Configuration
	=========================================*/

    app.set('showStackError', true);    
   
    //Prettify HTML
    // ES: Originalmente Express retorna los archivos html sin espacios
    // ni saltos de línea, con esta configuración se retorna un HTML con un formato
    // mejor, ojo que solo a nivel de código fuente, no tiene nada que ver con
    // lo que verá el usuario final.
    // 
    app.locals.pretty = true;

    // ES : Todas las variables guardadas como propiedades de app.locals, pueden ser después
    // accedidas en las vistas con etiquetas especiales (<%= errors[0] %>), usualmente se 
    // usa para enviar mensajes de error al usuario. 
    app.locals.errors = {};
    app.locals.message = {};

    // Set views path, template engine and default layout
    // ES : Establece la ruta donde se encuentran las vistas que serán
    // compiladas y mostradas a los usuarios, además del motor usado en las vistas
    // en este caso SWIG : http://paularmstrong.github.io/swig/
    app.set('views', './app/views');

    // Aquí establecemos la extensión .sw con la cual se reconocerán
    // los archivos a ser compilados con swig, podría haber sido .html, .php, etc
    // .html no es conveniente porque se puede confundir con los .html
    // públicos usados por AngularJS.
    app.engine('sw', swig.renderFile);
    app.set('view engine', 'sw');

    // app.use(favicon(rootDirectory + '/public/assets/img/favicon.ico'));

    // log every request to the console
    // ES : Utilitario de desarrollo para mostrar las solicitudes realizadas
    // por los usuarios en la consola o log.
	
    app.use(logger('dev'));

    // simulate DELETE and PUT                  
    // ES : Permite que los usuarios realicen
    // solicitudes PUT o DELETE 
    app.use(methodOverride());  

    app.use(session(
        { 
            secret: 'devniel',
            cookie: { maxAge: null },
            /*store: new MongoStore({
                url : credentials.mongodb.url,
            })*/
        }
    ));

    // Lets use cookie parser to access
    // the cookies on req object
    app.use(cookieParser());

    // default: using 'accept-language' header to guess language settings
    app.use(i18n.init);

    // use flash messages
    // ES : Necesario para el uso efectivo de app.locals.errors
    // o app.locals.message 
    app.use(flash());

	// pull information from html in POST	
    // ES : Importante para gestionar nativamente
    // solicitudes POST con datos en JSON o incluidos en URLs			
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
 
    app.use(multer());
    
    // set the static files location /public/img will be /img for users
    
    // ES : Establece una carpeta donde se accederan a los archivos públicos
    // tales como javascript, css, imagenes o fuentes de texto.

    app.use(express.static(rootDirectory + '/public'));
	
    app.use(function(req, res, next) {

        // *express helper for i18n module
        res.locals.__ = res.__ = function() {
            return i18n.__.apply(req, arguments);
        };

        // a little hack to handle language cookie
        if(req.cookies.language == undefined || req.cookies.language == null){
            res.cookie('language', 'en');
            res.locals.language = "en";
            res.setLocale('en');
        }else{
            res.locals.language = req.cookies.language;
        }

        // useful locals
        res.locals.date = new Date();
        res.locals.user = req.session.user;
        res.locals.version = global.version;

        next();
    });

    /***************************************
    ES : Rutas de la aplicación, aquí
    también puede incluirse endpoints de
    servicios web para acceso desde móviles.
    ****************************************/

    require("./routes")(app);


    

};
