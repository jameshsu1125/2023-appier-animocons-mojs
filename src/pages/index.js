import Fetcher, { contentType, formatType } from 'lesca-fetcher';
import { lazy, memo, Suspense, useContext, useMemo, useReducer } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoadingProcess from '../components/loadingProcess';
import { Context, initialState, reducer } from '../settings/config';
import { ACTION, PAGE } from '../settings/constant';
import '../settings/global.less';
import Landing from './landing';

Fetcher.install({
	hostUrl: process.env.API_PATH,
	contentType: contentType.JSON,
	formatType: formatType.JSON,
});

if (process.env.MOCKING === 'true') {
	// eslint-disable-next-line global-require
	const { worker } = require('../mocks/browser');
	worker.start({ serviceWorker: { url: './mockServiceWorker.js' } });
}

const RoutePages = memo(() => (
	<Routes>
		<Route path='/' element={<Landing>router page</Landing>} />
	</Routes>
));

const Pages = memo(() => {
	const [context] = useContext(Context);
	const page = context[ACTION.page];

	const Page = useMemo(() => {
		// to code splitting from constant PAGE setting
		const [target] = Object.values(PAGE).filter((data) => data === page);
		const Element = lazy(() => import(`.${target}/`));
		if (target) {
			return (
				<Suspense fallback=''>
					<Element>static pages</Element>
				</Suspense>
			);
		}
		return '';
	}, [page]);

	return Page;
});

const App = () => {
	const [state, setState] = useReducer(reducer, initialState);
	const value = useMemo(() => [state, setState], [state]);
	return (
		<div className='App'>
			<Context.Provider {...{ value }}>
				<BrowserRouter>
					<RoutePages />
				</BrowserRouter>
				<Pages />
				{state[ACTION.LoadingProcess].enabled && <LoadingProcess />}
			</Context.Provider>
		</div>
	);
};

createRoot(document.getElementById('app')).render(<App />);
