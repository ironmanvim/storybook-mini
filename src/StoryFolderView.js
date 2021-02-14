import React from 'react';

export const StoryFolderView = ({ path, folders = [], canGoBack, onBackClick, onFolderClick }) => {
    return (
        <div>
            <div style={{
                padding: "5px 10px",
            }}>
                {path}
            </div>
            <div>
                {
                    canGoBack && (
                        <button style={{
                            border: "1px solid gray",
                            padding: "5px 10px",
                            background: "gray",
                            color: "white",
                        }} onClick={() => {
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
                            border: "1px solid gray",
                            padding: "5px 10px",
                            background: "gray",
                            color: "white",
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
