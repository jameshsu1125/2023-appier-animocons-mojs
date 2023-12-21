import { memo, useState } from 'react';
import useTodos from '../../hooks/useTodos';
import { LandingContext, LandingState } from './config';

const Landing = memo(({ children }) => {
	const value = useState(LandingState);

	const [dataFromPlaceHolder, fetcher] = useTodos();

	return (
		<LandingContext.Provider value={value}>
			<div className='Landing'>
				{children}
				<br />
				{dataFromPlaceHolder && JSON.stringify(dataFromPlaceHolder)}
			</div>
			<button
				className='rounded bg-blue-500 p-2 font-bold text-white hover:bg-blue-700'
				type='button'
				onClick={() => fetcher()}
			>
				UPLOAD
			</button>
		</LandingContext.Provider>
	);
});
export default Landing;
