const fs = require('fs');
const chokidar = require("chokidar");

const exclude = ["node_modules", ".git"];

const findFilesOfType = async (directory = "./", types = []) => {
    const files = [];
    const dir = await fs.promises.opendir(directory);

    for await (const dirent of dir) {
        if (!exclude.includes(dirent.name)) {
            if (dirent.isDirectory()) {
                files.push(...await findFilesOfType(directory + dirent.name + "/", types));
            } else {
                types.forEach(type => {
                    if (dirent.name.match(new RegExp(`${type}$`))) {
                        files.push(directory + dirent.name);
                    }
                })
            }
        }
    }
    return files;
}

const findStories = async () => {
    let stories = await findFilesOfType("./src/", [".stories.js", ".stories.ts", ".stories.jsx", ".stories.tsx"]);
    stories = stories.map(story => {
        return "./" + story.slice(6);
    });
    return stories;
}

const addFilesToStoryCache = async () => {
    const storyFiles = await findStories();
    let storyCacheTemplate = '';
    const ids = [];
    for (let i = 0; i < storyFiles.length; i++) {
        let id = `story_${i}`;
        ids.push(id);
        storyCacheTemplate += `import ${id}Default, * as ${id} from '${storyFiles[i]}'\n`;
    }
    storyCacheTemplate += `\nconst all = [\n`;
    for (let i = 0; i < ids.length; i++) {
        storyCacheTemplate += `\
    {
        meta: ${ids[i]}Default, 
        stories: Object.keys(${ids[i]}).flatMap(key => {
            if (key === 'default') {
                return [];
            }
            const Story = ${ids[i]}[key];

            return {
                name: key,
                Story
            };
        }),
    },\n`;
    }
    storyCacheTemplate += `];\n\nexport default all;\n`;

    fs.writeFile("./src/storycache.js", storyCacheTemplate, (err) => {
        if (err) throw err;
        console.log('story cache created!');
    })
}

if (process.argv[2] === "-w" || process.argv[2] === "--watch") {
    console.log("Watching files");

    const watcher = chokidar.watch("./", {
        ignored: new RegExp(`(${exclude.join('|')})`),
    });

    watcher.on("add", () => {
        addFilesToStoryCache();
    }).on("unlink", () => {
        addFilesToStoryCache();
    });
} else {
    addFilesToStoryCache();
}