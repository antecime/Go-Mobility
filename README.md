Go-Mobitily
===========

Project - Back Office + Front end

#INSTALLATION GO MOBILITY

### Dans le fichier app/bootstrap/start.php 

 	>Changer la variable d'environnement

 	$env = $app->detectEnvironment(array(

	'local' => array('Your local host name')
	'production' => array('Your production host name')
	
	));

 >(Pour trouver le nom d'hôte, tapez "hostname" dans l'invite de commande)


### Créer une base de donnée Go Mobility

  >Fichier app/config/database.php

 	-	'mysql' => array(
			'driver'    => 'mysql',
			'host'      => 'your_hostname',
			'database'  => 'your_database',
			'username'  => 'your_username',
			'password'  => 'your_password',
			'charset'   => 'utf8',
			'collation' => 'utf8_unicode_ci',
			'prefix'    => '',
		)

### Terminal de commande

	- cd GoMobility/library/laravel
	- php artisan migrate:reset
	- php artisan migrate:refresh
	- php artisan db:seed

