import { lazy } from 'react';

const lazyLoad = (resolver, name = 'default') => {
    return lazy(async () => {
        const resolved = await resolver()
        return { default: resolved[name] }
    })
}

export default lazyLoad;
