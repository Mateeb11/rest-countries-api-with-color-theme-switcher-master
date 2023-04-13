# Frontend Mentor - REST Countries API with color theme switcher solution

This is a solution to the [REST Countries API with color theme switcher challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- See all countries from the API on the homepage &check;
- Search for a country using an `input` field &check;
- Filter countries by region &check;
- Click on a country to see more detailed information on a separate page &check;
- Click through to the border countries on the detail page &check;
- Toggle the color scheme between light and dark mode _(optional)_ &check;

### Screenshot

Dark Mode

![Main page big screen dark](./screenshoots/dark/main%20page%20big%20screen%20dark.jpg)

![Main page big screen dark](./screenshoots/dark/details%20page%20big%20screen%20dark.jpg)

![Main page big screen dark](./screenshoots/dark/main%20page%20small%20screen%20dark.jpg)

![Main page big screen dark](./screenshoots/dark/details%20page%20small%20screen%20dark.jpg)

Light Mode

![Main page big screen dark](./screenshoots/light/main%20page%20big%20screen%20light.jpg)

![Main page big screen dark](./screenshoots/light/details%20page%20big%20screen%20light.jpg)

![Main page big screen dark](./screenshoots/light/main%20page%20small%20screen%20light.jpg)

![Main page big screen dark](./screenshoots/light/details%20page%20small%20screen%20light.jpg)

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Where in the world?](https://humdrum-smell.surge.sh/)

## My process

### Built with

- Semantic HTML5 markup
- Flexbox
- CSS Grid
- CSS modules
- Web-first workflow
- [React](https://reactjs.org/) - JS library
- [React Router DOM](https://www.npmjs.com/package/react-router-dom) - React library
- [Redux](https://redux.js.org/) - JS library
- [react-loading-indicators](https://www.npmjs.com/package/react-loading-indicators) - React library
- [Material Symbols](https://fonts.google.com/) - Google icons and fonts
- [Surge](https://surge.sh/) - Static web publishing for Front-End Developers

### What I learned

How to use react routes and mange to navigate throw diffrent pages.

```js
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,

    children: [
      { index: true, element: <Content /> },
      { path: ":countryId", element: <CountriesDetailsPage /> },
    ],
  },
]);
```

How to use redux to manage global states (Dark and Light mode).

```js
const modeSlice = createSlice({
  name: "mode",
  initialState: { colorMode: false },
  reducers: {
    toggle(state) {
      state.colorMode = !state.colorMode;
    },
  },
});
```

```js
const mode = useSelector((state) => state.mode.colorMode);
```

How sometimes you need to separate the fetch in a functions and returning the response, and assign the response data in another function to avoid stuckign in pending state.

```js
const fetchCountries = async (url) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error();
    }
    return await response.json();
  } catch (error) {
    if (error.message === "Failed to fetch")
      setErorrMessage("Failed to fetch data, try refreshing the page.");
    else setErorrMessage("Page not found");
    setErorr(true);
  }
};
```

```js
const setData = async (url) => {
    setLoading(true);
    const data = await fetchCountries(url);

    const loadedCountries = [];
    for (const key in data) {
      loadedCountries.push({
        id: key,
        flag: data[key].flags.png,
        altText: data[key].flags.alt,
        officalName:
        ...
```

### Useful resources

- [Udemy course by Maximilian Schwarzmüller](https://www.udemy.com/course/react-the-complete-guide-incl-redux/) - This helped me literally in evrey aspect in this challenge. All my react knowledge is from this course.
- [Stackoverflow](https://stackoverflow.com/) - Any question you have in your mind the answer will probably be here.

## Author

- LinkedIn - [Mateeb Alharbi](https://www.linkedin.com/in/mateeb-alharbi/)
- Frontend Mentor - [@Mateeb11](https://www.frontendmentor.io/profile/Mateeb11)
