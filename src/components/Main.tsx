import "@navikt/ds-css";
import { Box, Heading, Page } from "@navikt/ds-react";
import { ReactNode } from "react";
import { Header } from "./Header";

export const Main = (): ReactNode => {
  return (
    <>
      <Page
        footer={
          <Box background="surface-neutral-moderate" padding="8" as="footer">
            {" "}
            <Page.Block gutters width="lg">
              {" "}
              Footer{" "}
            </Page.Block>{" "}
          </Box>
        }
      >
        <Header />
        <Page.Block width="md">
          <Box paddingBlock="8">
            <Heading size="large">Aksel-desktop</Heading>
          </Box>
        </Page.Block>
      </Page>
    </>
  );
};
