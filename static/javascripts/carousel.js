//http://jsfiddle.net/F5Hg7/2/
var slider = document.getElementById('slider'); //Get the ID of the element you want to use
var btn = document.getElementById('controls'); //Get the ID of the element you want to use
var current = 0; //Current person you are seeing on the screen

// Hide the images and info of the other persons
function hide() {
    for (var i = 0; i < slider.children.length; i++) { //Show only the current person and hide the rest
        slider.children[i].style.display = 'none';
    }
}

// Go to the next person
function next() {
    hide();
    slider.children[current++].style.display = 'block' ;
    // Checks if the end is reached or not
    if (current >= slider.children.length) {
        current = 0;
    }
}

// Assign the 'next function' with the button.

window.onload = btn.onclick = next;

