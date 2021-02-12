export const StoryFolderView = ({ folders = [], canGoBack, onBackClick, onFolderClick }) => {
    return (
        <div>
            <div>
                {
                    canGoBack && (
                        <button onClick={() => {
                            onBackClick();
                        }}>
                            🠔
                        </button>
                    )
                }
            </div>
            <div>
                {folders.map(folder => {
                    return (
                        <button key={folder} style={{
                            border: "1px solid red",
                        }} onClick={() => {
                            onFolderClick(folder);
                        }}>
                            {folder}
                        </button>
                    )
                })}
            </div>
        </div>
    )
};
