var box = document.getElementById('condom-box');

function toggle() {
        box.style.background-color = 'lightblue'
}



box.addEventListener('click', function(e) {
    e.preventDefault();
    toggle();
})
