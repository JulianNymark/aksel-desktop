import {
  BodyShort,
  Detail,
  Dropdown,
  InternalHeader,
  Spacer,
} from "@navikt/ds-react";
import { AkselLogotype } from "../icons/Icons";

export const Header = () => {
  return (
    <InternalHeader>
      <InternalHeader.Title
        as="button"
        onClick={() => console.log("aksel-logo-click")}
      >
        <AkselLogotype />
      </InternalHeader.Title>
      <Spacer />
      <Dropdown>
        {" "}
        <InternalHeader.UserButton
          as={Dropdown.Toggle}
          name="Ola Normann"
          description="Enhet: Skien"
        />{" "}
        <Dropdown.Menu>
          {" "}
          <dl>
            {" "}
            <BodyShort as="dt" size="small">
              {" "}
              Ola Normann{" "}
            </BodyShort>{" "}
            <Detail as="dd">D123456</Detail>{" "}
          </dl>{" "}
          <Dropdown.Menu.Divider />{" "}
          <Dropdown.Menu.List>
            {" "}
            <Dropdown.Menu.List.Item>Settings</Dropdown.Menu.List.Item>{" "}
            <Dropdown.Menu.List.Item>Logg ut</Dropdown.Menu.List.Item>{" "}
          </Dropdown.Menu.List>{" "}
        </Dropdown.Menu>{" "}
      </Dropdown>
    </InternalHeader>
  );
};
