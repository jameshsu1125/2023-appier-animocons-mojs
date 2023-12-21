import Fetcher from 'lesca-fetcher';
import { useContext, useState } from 'react';
import { Context, RestPath } from '../settings/config';
import { ACTION } from '../settings/constant';

const useTodos = () => {
	const [, setContext] = useContext(Context);
	const [state, setState] = useState();
	const fetch = async () => {
		setContext({ type: ACTION.LoadingProcess, state: { enabled: true } });

		const respond = await Fetcher.get(RestPath.test);
		setState(respond);

		setContext({ type: ACTION.LoadingProcess, state: { enabled: false } });
	};
	return [state, fetch];
};
export default useTodos;
