import data from "./tools.json";

/** @typedef {{ id: string, name: string, description: string, category: string, tags: string[], url: string, accent: string, icon: string, featured?: boolean, isNew?: boolean, addedAt?: string }} Tool */

export const categories = data.categories;

/** @type {Tool[]} */
export const tools = data.tools;
