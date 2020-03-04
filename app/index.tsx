import React from "react";
import ReactDOM from "react-dom";
import styled from "@emotion/styled";

import "bootstrap/dist/css/bootstrap.min.css";

import {
  createAction, createReducer, getType, getStore, StandardAction, UnwrappedActionCreator, simplePromiseDecorator, connect, StoreProvider, logger,
} from "src/simpleState";

import TestComponent from "./TestComponent";

// - Example types --------------------------------------------------------------------------------------------------------------------

type ExampleItem = {id: string; data: string; timestamp: number};

type ExampleState = {
    asyncData?: ExampleItem;
    syncData?: ExampleItem;
}

type RootState = {
    someData?: ExampleState;
}

// - Example action creators --------------------------------------------------------------------------------------------------------------------

export const simpleAsyncAction = createAction(
  "SIMPLE_ASYNC_ACTION",
  (id: string) => new Promise<ExampleItem>((resolve, reject) => {
    setTimeout(() => {
      if (id === "error") {
        reject(new Error("Oops"));
      } else {
        resolve({
          id,
          data: `Async data for ${id}`,
          timestamp: Date.now(),
        });
      }
    }, 1000);
  }),
);

export const simpleSyncAction = createAction(
  "SIMPLE_SYNC_ACTION",
  (id: string) => ({
    id,
    data: `Sync data for ${id}`,
    timestamp: Date.now(),
  }),
);

// - Example reducers --------------------------------------------------------------------------------------------------------------------

const simpleAsyncReducer = (state: ExampleState, { payload }: StandardAction<ExampleItem>): ExampleState => ({
  ...state,
  asyncData: {
    ...state?.asyncData,
    ...payload,
  } as ExampleItem,
});

const simpleSyncReducer = (state: ExampleState, { payload }: StandardAction<ExampleItem>): ExampleState => ({
  ...state,
  syncData: payload,
});

const exampleReducer = createReducer({
  [getType(simpleAsyncAction)]: simpleAsyncReducer,
  [getType(simpleSyncAction)]: simpleSyncReducer,
});

// - Example create, map and connect --------------------------------------------------------------------------------------------------------------------

const rootReducer = {
  someData: exampleReducer,
};

const initialState: RootState = {};

const myStore = getStore(initialState, rootReducer, [
  simplePromiseDecorator,
  logger,
]);

const ConnectedTestComponent = connect(
  (state: RootState) => ({
    asyncData: state.someData?.asyncData,
    syncData: state.someData?.syncData,
  }),
  {
    getAsyncData: simpleAsyncAction as unknown as UnwrappedActionCreator<typeof simpleAsyncAction>,
    getSyncData: simpleSyncAction as unknown as UnwrappedActionCreator<typeof simpleSyncAction>,
  },
)(TestComponent);

const Main = styled.section`
  margin: 20px;
`;

const app = (
  <StoreProvider store={myStore}>
    <Main>
      <ConnectedTestComponent
        description="Simple flux-style implementation of state management with async payload decoration."
      />
    </Main>
  </StoreProvider>
);

ReactDOM.render(
  app,
  document.getElementById("app"),
);
