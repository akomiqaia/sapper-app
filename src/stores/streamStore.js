import { writable } from "svelte/store";

export const currentThinkIn = writable(null)


export const sessionInstance = writable({});
export const publisherInstance = writable({});
export const screensharePublisherInstance = writable({});

export const spotlight = writable([]);
export const hostsAndGuests = writable([]);
export const othersStreams = writable([]);

export const currentUser = writable("");
export const messages = writable([]);
