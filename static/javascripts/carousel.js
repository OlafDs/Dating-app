//http://jsfiddle.net/F5Hg7/2/
// to not leak variables to global scope
(function(){
    // Cache elements
    var list = document.getElementById('slider');
    var btn = document.getElementById('next');
    
    var current = 0;
    
    // Hide all images
    function hide() {
        for (var i=0; i<list.children.length; i++) {
            list.children[i].style.display = 'none';
        }
    }
    
    // Go to next image
    function next() {
        hide();
        list.children[current++].style.display = 'block';
        // Did we reach the end?
        if (current >= list.children.length) {
            current = 0;
        }
    }
    
    // Assign same function,
    // avoiding closure memory leaks
    window.onload = btn.onclick = next;
}());


