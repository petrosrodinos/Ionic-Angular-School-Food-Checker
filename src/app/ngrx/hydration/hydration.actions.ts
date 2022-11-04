import { createAction, props } from '@ngrx/store';
import { AppStateInterface } from '../app.state';

export const hydrate = createAction('[Hydration] Hydrate');

export const hydrateSuccess = createAction(
  '[Hydration] Hydrate Success',
  props<{ state: AppStateInterface }>()
);

export const hydrateFailure = createAction('[Hydration] Hydrate Failure');
