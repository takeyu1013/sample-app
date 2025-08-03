import { expect, test } from "bun:test";

import { screen } from "@testing-library/react";

import { render } from "@/component/render";

import Page from "./page";

test("Page", () => {
	render(<Page />);
	expect(screen.getByText("Rails Tutorial Help page")).toBeDefined();
});
