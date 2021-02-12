import { useState } from "react";
import storybook from "./storycache";
import { StoryFolderView } from "./StoryFolderView";

const NoStorySelected = () => {
    return (
        <div>
            No Story selected
        </div>
    )
}

export const Storybook = () => {
    const [selectedFolder, setSelectedFolder] = useState("");
    const [SelectedStory, setSelectedStory] = useState(() => NoStorySelected);

    const storyGallery = storybook.reduce((accumulator, currentValue) => {
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
            <StoryFolderView
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
                        setSelectedStory(() => currentFolder.find(story => story.name === folder));
                    }
                }}
                onBackClick={() => {
                    setSelectedFolder(prevFolder => {
                        const folderSplit = prevFolder.split("/")
                        return folderSplit.slice(0, folderSplit.length - 1).join("/");
                    })
                }}
            />
            <SelectedStory/>
        </div>
    )
}