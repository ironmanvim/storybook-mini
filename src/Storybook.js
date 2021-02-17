import React, { useState } from "react";
import { StoryFolderView } from "./StoryFolderView";

const NoStorySelected = () => {
    return (
        <div>
            No Story selected
        </div>
    )
}

export const Storybook = ({ children, storyCache }) => {
    const [showMenu, setShowMenu] = useState(true);
    const [showStory, setShowStory] = useState(true);
    const [showChildren, setShowChildren] = useState(false);
    const [showFolderView, setShowFolderView] = useState(true);
    const [selectedFolder, setSelectedFolder] = useState("");
    const [SelectedStory, setSelectedStory] = useState(() => NoStorySelected);

    const storyGallery = storyCache.reduce((accumulator, currentValue) => {
        const storyPath = currentValue.meta.title.split("/");
        console.log(storyPath);

        let currentFolder = accumulator;

        storyPath.forEach((storyAddress, index) => {
            if (!Object.keys(currentFolder).includes(storyAddress)) {
                currentFolder[storyAddress] = {};
                if (index === storyPath.length - 1) {
                    currentFolder[storyAddress] = currentValue.stories;
                }
            }
            currentFolder = currentFolder[storyAddress];
        });

        return accumulator;
    }, {});

    console.log(storyGallery);

    const currentFolder = (() => {
        if (selectedFolder === "") {
            return storyGallery;
        }
        const folderSplit = selectedFolder.split("/");
        return folderSplit.reduce((gallery, folder) => {
            return gallery[folder];
        }, storyGallery);
    })();

    console.log(currentFolder);

    return (
        <div>
            {showChildren && children}
            <div style={{
                position: "fixed",
                bottom: "0px",
                right: "0px",
            }}>
                {
                    showMenu &&
                    <>
                        <button style={{
                            border: "1px solid gray",
                            padding: "5px 10px",
                            background: "gray",
                            color: "white",
                        }} onClick={() => {
                            setShowFolderView(!showFolderView);
                        }}>
                            {showFolderView ? "Hide Folders" : "Show Folders"}
                        </button>
                        <button style={{
                            border: "1px solid gray",
                            padding: "5px 10px",
                            background: "gray",
                            color: "white",
                        }} onClick={() => {
                            setShowChildren(!showChildren);
                        }}>
                            {showChildren ? "Hide App" : "Show App"}
                        </button>
                        <button style={{
                            border: "1px solid gray",
                            padding: "5px 10px",
                            background: "gray",
                            color: "white",
                        }} onClick={() => {
                            setShowStory(!showStory);
                        }}>
                            {showStory ? "Hide Story" : "Show Story"}
                        </button>
                    </>
                }
                <button style={{
                    border: "1px solid gray",
                    padding: "5px 10px",
                    background: "gray",
                    color: "white",
                }} onClick={() => {
                    setShowMenu(!showMenu);
                }}>
                    {showStory ? "🠖" : "🠔"}
                </button>
                {
                    showFolderView &&
                    <StoryFolderView
                        path={selectedFolder}
                        folders={Array.isArray(currentFolder) ? currentFolder.map(item => item.name) : Object.keys(currentFolder)}
                        canGoBack={selectedFolder !== ""}
                        onFolderClick={(folder) => {
                            if (!Array.isArray(currentFolder)) {
                                setSelectedFolder(prevFolder => {
                                    if (prevFolder === "") {
                                        return folder;
                                    }
                                    return `${prevFolder}/${folder}`;
                                });
                            } else {
                                setSelectedStory(() => {
                                    const storySearch = currentFolder.find(story => story.name === folder).Story;
                                    return storySearch;
                                });
                            }
                        }}
                        onBackClick={() => {
                            setSelectedFolder(prevFolder => {
                                const folderSplit = prevFolder.split("/")
                                return folderSplit.slice(0, folderSplit.length - 1).join("/");
                            })
                        }}
                    />
                }
            </div>
            {
                showStory &&
                <SelectedStory/>
            }
        </div >
    )
}