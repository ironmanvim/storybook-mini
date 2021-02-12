import { Storybook } from "./storybook";
import storyCache from "./storycache";

function App() {
    return (
        <Storybook storyCache={storyCache}>
            <div className="App">
                Hello 
            </div>
        </Storybook>
    );
}

export default App;
