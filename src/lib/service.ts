export const fullTitle = (title = "") => {
	const baseTitle = "Ruby on Rails Tutorial Sample App";
	return title ? `${title} | ${baseTitle}` : baseTitle;
};
