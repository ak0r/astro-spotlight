import React from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { headerNav } from '../configs/navConfig.json'

export default function App() {
  return (
    <Dropdown backdrop="blur">
      <DropdownTrigger>
        <Button variant="ghost" radius="full" color="default">
          Menu
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        {
          headerNav.map((page) => {
            return (
              <DropdownItem key={page.title} href={page.url}>{page.title}</DropdownItem>
            );
          })
        }
      </DropdownMenu>
    </Dropdown>
  );
}