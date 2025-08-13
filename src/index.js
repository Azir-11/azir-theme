const fs = require("fs").promises;
const getTheme = require("./theme");

const lightDefaultTheme = getTheme({
  theme: "light",
  name: "Azir Light Default",
});

const lightHighContrastTheme = getTheme({
  theme: "light_high_contrast",
  name: "Azir Light High Contrast"
})

// Colorblind variant removed

const darkDefaultTheme = getTheme({
  theme: "dark",
  name: "Azir Dark Default",
});

const darkHighContrastTheme = getTheme({
  theme: "dark_high_contrast",
  name: "Azir Dark High Contrast"
})

// Colorblind variant removed

const darkDimmedTheme = getTheme({
  theme: "dark_dimmed",
  name: "Azir Dark Dimmed"
})

// Write themes

fs.mkdir("./themes", { recursive: true })
  .then(() => Promise.all([
    fs.writeFile("./themes/light-default.json", JSON.stringify(lightDefaultTheme, null, 2)),
    fs.writeFile("./themes/light-high-contrast.json", JSON.stringify(lightHighContrastTheme, null, 2)),
    fs.writeFile("./themes/dark-default.json", JSON.stringify(darkDefaultTheme, null, 2)),
    fs.writeFile("./themes/dark-high-contrast.json", JSON.stringify(darkHighContrastTheme, null, 2)),
    fs.writeFile("./themes/dark-dimmed.json", JSON.stringify(darkDimmedTheme, null, 2)),
  ]))
  .catch(() => process.exit(1))
