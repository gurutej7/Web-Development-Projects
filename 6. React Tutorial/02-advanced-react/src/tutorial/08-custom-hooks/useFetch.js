import React from "react";
import { useEffect, useState } from "react";

const useFetch = (url) => {
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);
	const [data, setData] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const resp = await fetch(url);
				// console.log(resp);
				if (!resp.ok) {
					setIsError(true);
					setIsLoading(false);
					return;
				}

				const data = await resp.json();
				setData(data);
			} catch (error) {
				setIsError(true);
				// console.log(error);
			}
			// hide loading
			setIsLoading(false);
		};
		fetchData();
	}, []);

	return { isError, isLoading, data };
};

export default useFetch;
