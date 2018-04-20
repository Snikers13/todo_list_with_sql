'use strict'
let tasks = document.getElementsByClassName('tasks')[0];
let btn = document.getElementsByTagName('button')[0];
let inp = document.getElementsByClassName('_form')[0];
let form = document.getElementsByClassName('input_form')[0];

btn.style.color = 'red';

btn.addEventListener('click', () => {
	form.action = '/';
	let newLi = document.createElement('li');
  	newLi.textContent = inp.value;
  	tasks.appendChild (newLi);
})

