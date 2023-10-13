window.addEventListener("scroll", reveal);

function reveal() {
    var reveals = document.querySelectorAll(".reveal");

    for (var i = 0; i < reveals.length; i++) {
        var windowheight = window.innerHeight;
        var revealtop = reveals[i].getBoundingClientRect().top;
        var revealpoint = 150;

        if (revealtop < windowheight - revealpoint) {
            reveals[i].classList.add("active");
        }
    }
}

window.addEventListener("scroll", revealimg);

function revealimg() {
    var reveals = document.querySelectorAll(".reveal-img");

    for (var i = 0; i < reveals.length; i++) {
        var windowheight = window.innerHeight;
        var revealtop = reveals[i].getBoundingClientRect().top;
        var revealpoint = 150;

        if (revealtop < windowheight - revealpoint) {
            reveals[i].classList.add("active");
        }
    }
}

new TypeIt("#typewriter", {
    strings: "- Lifelong Student & Occasional Developer.",
    speed: 75,
    waitUntilVisible: true,
}).go();
