import { createHash } from "node:crypto";

export const fullTitle = (title = "") => {
	const baseTitle = "Ruby on Rails Tutorial Sample App";
	return title ? `${title} | ${baseTitle}` : baseTitle;
};

export const getGravaterId = (email: string) =>
	createHash("md5").update(email.toLowerCase()).digest("hex");
