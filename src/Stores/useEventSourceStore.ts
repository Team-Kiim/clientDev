import { create } from 'zustand';
import { EventSourcePolyfill } from 'event-source-polyfill';

interface EventSourceStore {
    eventSource: EventSourcePolyfill;
}

const useEventSourceStore = create<EventSourceStore>(() => ({
    eventSource: new EventSourcePolyfill('/api/notifications/subscribe', {
        heartbeatTimeout: 86400000,
    }),
}));

export default useEventSourceStore;
