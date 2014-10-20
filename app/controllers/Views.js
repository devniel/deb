/**
 * Controlador para presentación
 * de vistas.
 *
 * @author devnieL
 */

var credentials = require("../../config/credentials")[process.env.NODE_ENV || 'development'];

var async = require('async');

function handleError(res, err){
	console.error(err);

	res.status(500).render('errors/500', {
        error: err.stack
    });
};

/**
 * Página inicial del 
 * proyecto
 * 
 */

exports.index = function(req, res){

	res.render('index', {
		user : req.session.user
	});
	
};
