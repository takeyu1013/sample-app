import type { FormId } from "@conform-to/react";
import { useEffect } from "react";

export const usePreventDefault = (id: FormId) =>
	useEffect(() => {
		const preventDefault = (event: Event) => {
			if (event.target === document.forms.namedItem(id)) {
				event.preventDefault();
			}
		};
		document.addEventListener("reset", preventDefault, true);
		return () => {
			document.removeEventListener("reset", preventDefault, true);
		};
	}, [id]);
