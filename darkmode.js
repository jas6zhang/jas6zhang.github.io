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

// documentElement returns the Element that is the root element of the document
function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute("data-theme", "dark");
        currentTheme = "dark";
    } else {
        document.documentElement.setAttribute("data-theme", "light");
        currentTheme = "light";
    }
}

toggleSwitch.addEventListener("change", switchTheme, false);