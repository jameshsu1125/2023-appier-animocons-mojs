/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/control-has-associated-label */
import mojs from '@mojs/core';
import { memo, useEffect, useRef, useState } from 'react';
import { LandingContext, LandingState } from './config';
import productImage from './img/product_images_01.png';

const Landing = memo(() => {
	const ref = useRef(null);
	const imgRef = useRef(null);
	const effects = useRef(null);
	const value = useState(LandingState);

	useEffect(() => {
		effects.current = [
			new mojs.Burst({
				parent: ref.current,
				count: 15,
				radius: { 20: 80 },
				rotate: { 0: 140, easing: mojs.easing.bezier(0.1, 1, 0.3, 1) },
				children: {
					fill: '#988ADE',
					radius: 20,
					opacity: 0.6,
					duration: 1500,
					easing: mojs.easing.bezier(0.1, 1, 0.3, 1),
				},
			}),
			// icon scale animation
			new mojs.Tween({
				duration: 800,
				easing: mojs.easing.bezier(0.1, 1, 0.3, 1),
				onUpdate: function (progress) {
					imgRef.current.style.WebkitTransform = imgRef.current.style.transform =
						'scale3d(' + progress + ',' + progress + ',1)';
				},
			}),
		];
	}, []);

	return (
		<LandingContext.Provider value={value}>
			<a
				href='#'
				onClick={() => {
					effects.current?.forEach((effect) => effect.replay());
				}}
			>
				<div ref={ref} className='w-full h-full flex justify-center items-center'>
					<img ref={imgRef} src={productImage} alt='' />
				</div>
			</a>
		</LandingContext.Provider>
	);
});
export default Landing;
