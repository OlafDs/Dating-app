/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
var notification = document.querySelector('.notification'); 
var like = document.getElementById("likeButton");

var reveal = function () {
	notification.classList.toggle('notificationactive');
};

like.addEventListener('click', reveal);