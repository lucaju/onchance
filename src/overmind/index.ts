import { IContext } from 'overmind';
import { createActionsHook, createEffectsHook, createStateHook } from 'overmind-react';
import { namespaced } from 'overmind/config';
import * as conversation from './conversation';
import * as general from './general';
import * as videos from './videos';

export const config = namespaced({
  conversation,
  general,
  videos,
});

export type Context = IContext<typeof config>;

export const useAppState = createStateHook<Context>();
export const useActions = createActionsHook<Context>();
export const useEffects = createEffectsHook<Context>();
