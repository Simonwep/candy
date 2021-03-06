function sortVideos(state) {
    const sortMap = ['finish', 'convert', 'pending', 'loading', 'paused', 'errored', 'cancelled'];
    state.sort((a, b) => sortMap.indexOf(b.status) - sortMap.indexOf(a.status));
}

export const downloads = {

    namespaced: true,

    state: [],

    mutations: {

        remove(state, id) {
            const index = state.findIndex(v => v.id === id);

            if (~index) {
                state.splice(index, 1);
            }
        },

        add(state, video) {
            const existing = state.find(v => v.id === video.id);

            // Override if already loaded
            if (existing) {
                Object.assign(existing, video);
            } else {
                state.push(video);
                sortVideos(state);
            }

            sortVideos(state);
        },

        update(state, {id, props}) {
            const video = state.find(v => v.id === id);

            if (video) {
                const statusChanged = props.status && props.status !== video.status;
                Object.assign(video, props);

                // Check if status has changed
                if (statusChanged) {
                    sortVideos(state);
                }
            }

            video && Object.assign(video, props);
        }
    }
};
