/*****
@author: Luciano Frizzera <lucaju@gmail.com>
*/

//modules
import $ from 'jquery';

import 'uikit/dist/js/uikit.min';
import 'uikit/dist/css/uikit.min.css';

import 'materialize-css/dist/css/materialize.min.css';
import './style.css';

import home from './components/home';
import main from './components/main';

$('body').on('start', () => {
	$('body').off('start');
	main.render();
});	

home.render();