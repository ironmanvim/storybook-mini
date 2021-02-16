# Storybook mini

A miniature version of storybook developed for react

## Usage
Before using storybook in your app you have to generate storycache which storybook will be using to display the stories.

Add the following to the package.json
```json
{
    "scripts": {
        "build-storycache": "build-storycache",
        "watch-storycache": "build-storycache -w"
    }
}
```

Run the following command

`npm run build-storycache` - for building storycache

`npm run watch-storycache` - for watching storycache

---

In App.js
```jsx
import { Storybook } from "storybook-mini";
import storyCache from "./storycache";

export default function App() {
    return (
        <Storybook storyCache={storyCache}>
            <div className="app">
                Hello World
            </div>
        </Storybook>
    )
}
```
