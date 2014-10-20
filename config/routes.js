/** 
 * Archivo de rutas o endpoints
 * utilizados en la aplicación.
 *
 * Las rutas delegan la acción a los controladores,
 * mientras que los controladores interactuan con los modelos,
 * estos directamente con la BD, siguiendo el patrón MVC.
 *
 * @author  devnieL
 */

var Views = require("./../app/controllers/Views");

module.exports = function(app){

	/**
	 * WEB
	 */

	app.get('/',				Views.index);


	/**
	 * API
	 */

	/*
	
	app.post('/api/auth/signup', 	Auth.signup);
	app.post('/api/auth/login', 	Auth.login);
	app.post('/api/auth/resetpassword', 	Auth.resetPassword);
	app.post('/api/auth/facebookAuth',	Auth.facebookAuth);
	app.post('/api/auth/sendVerificationCode', Auth.sendVerificationCode); 

	*/

}