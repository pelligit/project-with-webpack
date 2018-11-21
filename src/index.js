import {cube} from './components/math';
import md from './content/into.md';
import data from './data/data.xml';

import People from './components/people';

import prism from './libs/prism/prism';
import './libs/prism/prism.css';

import './index.css';

import city_data from './data/city.json';

function helloWorld(){
	var x = 10;

	var cube_result = cube(x);

	console.log(cube_result);
}

helloWorld();

function init(){
	var div = document.createElement('div');

	console.log(data);
	console.log(md);

	document.body.appendChild(div);
	div.innerHTML = md;
}

init();

const my = new People();

console.log(my.name, my.age, my.sayHi());

console.log(city_data);