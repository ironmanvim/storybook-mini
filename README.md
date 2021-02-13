# Storybook mini

A miniature version of storybook developed for react

## Usage
Before using storybook in your app you have to generate storycache which storybook will be using to display the stories.

Run the following command
`build-storycache`

---

In App.js
```jsx
import { Storybook } from "storybook-mini";

export default function App() {
    return (
        <Storybook storyCache={}>
            <div className="app">
                Hello World
            </div>
        </Storybook>
    )
}
```

## Note

If you create a new `.stories.js`. You should run `build-storycache`.
