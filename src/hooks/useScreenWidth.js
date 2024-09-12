import { useState, useEffect } from "react";

const debounce = (fn, duration) => {
	let timer = null;
	return function(...args) {
		if (timer) {
			clearInterval(timer);
			timer = null;
		}
		timer = setTimeout(() => {
			fn.apply(this, args);
			timer = null;
		}, duration)
	}
}

export const useScreenWidth = () => {
	const [width, setWidth] = useState(window.innerWidth);
	const [height, setHeight] = useState(window.innerHeight);
	useEffect(() => {
		const handleResize = () => {
		  setWidth(window.innerWidth);
		  setHeight(window.innerHeight);
		};
  
		window.addEventListener('resize', debounce(handleResize, 100));
  
		return () => {
		  window.removeEventListener('resize', handleResize);
		};
	 }, []);
	 
	 return { width, height};
}