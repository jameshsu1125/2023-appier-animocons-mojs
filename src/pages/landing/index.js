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
				count: 6,
				radius: { 40: 90 },
				children: {
					fill: ['#988ADE', '#DE8AA0', '#8AAEDE', '#8ADEAD', '#DEC58A', '#8AD1DE'],
					opacity: 0.6,
					scale: 1,
					radius: { 7: 0 },
					duration: 1500,
					delay: 300,
					easing: mojs.easing.bezier(0.1, 1, 0.3, 1),
				},
			}),
			new mojs.Shape({
				parent: ref.current,
				type: 'circle',
				scale: { 0: 1 },
				radius: 50,
				fill: 'transparent',
				stroke: '#988ADE',
				strokeWidth: { 35: 0 },
				opacity: 0.6,
				duration: 750,
				easing: mojs.easing.bezier(0, 1, 0.5, 1),
			}),
			new mojs.Tween({
				duration: 1100,
				onUpdate: (progress) => {
					const target = imgRef.current;
					if (progress > 0.3) {
						const elasticOutProgress = mojs.easing.elastic.out(1.43 * progress - 0.43);
						if (target) {
							target.style.WebkitTransform = `scale3d(${elasticOutProgress},${elasticOutProgress},1)`;
							target.style.transform = `scale3d(${elasticOutProgress},${elasticOutProgress},1)`;
						}
					} else {
						target.style.WebkitTransform = 'scale3d(0,0,1)';
						target.style.transform = 'scale3d(0,0,1)';
					}
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
