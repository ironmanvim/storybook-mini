import story_0Default, * as story_0 from './stories/magic.stories.js'
import story_1Default, * as story_1 from './hello.stories.js'
const all = [
    {
        meta: story_0Default, 
        stories: Object.keys(story_0).flatMap(key => {
            if (key === 'default') {
                return [];
            }
            return story_0[key];
        }),
    },
    {
        meta: story_1Default, 
        stories: Object.keys(story_1).flatMap(key => {
            if (key === 'default') {
                return [];
            }
            return story_1[key];
        }),
    },
];

export default all;
