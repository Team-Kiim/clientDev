import { create } from 'zustand';
import { EventSourcePolyfill } from 'event-source-polyfill';

const useEventSourceStore = create(() => ({
    eventSource: new EventSourcePolyfill('/api/notifications/subscribe', {
        heartbeatTimeout: 86400000,
    }),
}));

export default useEventSourceStore;
