import React, { ReactNode } from "react";
import styled from "@emotion/styled";

import { DecoratedWithStatus, getStatus, UnwrappedActionCreator } from "src/simpleState";

import { simpleAsyncAction, simpleSyncAction } from "./index";

type ExampleData = { id: string; data: string; timestamp: number };

type TestComponentProps = {
  asyncData?: ExampleData & DecoratedWithStatus;
  syncData?: ExampleData;
  getAsyncData: UnwrappedActionCreator<typeof simpleAsyncAction>;
  getSyncData: UnwrappedActionCreator<typeof simpleSyncAction>;
  description: ReactNode;
}

const Data = styled.pre`
  background-color: #eee;
  padding: 10px;
  white-space: pre-wrap;
  margin: 0 0 20px;
  font-family: 'courier new', monospace;
`;

const Option = styled.button`
  border: 1px solid #eee;
  border-radius: 3px;
  padding: 5px 8px;
  font-size: 1em;
  margin: 10px 0;
  
  + button {
    margin-left: 10px
  }
`;

const Description = styled.header`
  margin: 0 0 20px 0;
`;

const TestComponent = ({
  asyncData, syncData, getAsyncData, getSyncData, description,
}: TestComponentProps) => {
  const handleGetAsyncData = () => getAsyncData("1234");

  const handleGetAsyncDataWithError = () => getAsyncData("error");

  const handleGetSyncData = () => getSyncData("5678");

  const statusAsyncData = getStatus(asyncData);

  return (
    <main>
      {description && <Description>{description}</Description>}
      <article>
        <header>
          <h3>
            ASYNC
          </h3>
          <Option disabled={statusAsyncData.processing} onClick={handleGetAsyncData}>Get data</Option>
          <Option disabled={statusAsyncData.processing} onClick={handleGetAsyncDataWithError}>Get data with error</Option>
        </header>

        {statusAsyncData && (
          <Data>
            STATUS:
            {" "}
            {JSON.stringify(statusAsyncData)}
          </Data>
        )}

        {asyncData && (
          <Data>
            PAYLOAD:
            {" "}
            {JSON.stringify(asyncData)}
          </Data>
        )}
      </article>
      <article>
        <header>
          <h3>SYNC</h3>
          <Option onClick={handleGetSyncData}>Get data</Option>
        </header>

        {syncData && (
          <Data>
            PAYLOAD:
            {" "}
            {JSON.stringify(syncData)}
          </Data>
        )}
      </article>
    </main>
  );
};

export default TestComponent;
