import { createHook } from 'overmind-react';
import { namespaced } from 'overmind/config';

import * as general from './general';
import * as conversation from './conversation';
import * as videos from './videos';

export const useApp = createHook();

export const config = namespaced({
	conversation,
	general,
	videos,
});
