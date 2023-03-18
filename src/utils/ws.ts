import type { Middleware } from 'redux';
import { IWsActions } from '../services/reducers/ws.types';
import { IRootReducer } from '../services/reducers';

export const socketMiddleware = (wsActions: IWsActions): Middleware<{}, IRootReducer> => {
  return store => next => action => {
    let socket: WebSocket | null = null;
    const { dispatch } = store;
    const { type, payload } = action;
    const { onInit, onOpen, onClose, onError, onData, onStop } = wsActions;

    if (type === onInit) {
      socket = new WebSocket(payload);

      if (socket) {
        socket.onopen = event => {
          dispatch({ type: onOpen, event: event });
        };

        socket.onclose = event => {
          dispatch({ type: onClose, payload: event });
        };

        socket.onerror = event => {
          dispatch({ type: onError, payload: event });
        };

        if (type === onStop) {
          socket.close();
          dispatch({ type: onClose });
        }

        socket.onmessage = ({ data }) => {
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;
          if (success) {
            dispatch({ type: onData, payload: restParsedData });
          } else {
            dispatch({ type: onError, payload: restParsedData.message });
          }
        };
      }
    }
    next(action);
  };
};