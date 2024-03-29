const toggleSwitch = document.querySelector(
    '.theme-switch input[type="checkbox"]'
);
let currentTheme = "light";

if (currentTheme) {
    document.documentElement.setAttribute("data-theme", currentTheme);

    if (currentTheme === "dark") {
        toggleSwitch.checked = true; // toggle switch only switchs if the theme is first switched
    }
}

// Using value of checkbox and its attribute checked
function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute("data-theme", "dark");
        currentTheme = "dark";
        document.getElementById('slider-img').src  = 'Images/moon.png';

    } else {
        document.documentElement.setAttribute("data-theme", "light");
        document.getElementById('slider-img').src  = 'Images/sun.png';
        currentTheme = "light";
    }
}

toggleSwitch.addEventListener("change", switchTheme, false);
