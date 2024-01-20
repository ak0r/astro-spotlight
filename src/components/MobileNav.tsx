import React from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { headerNav } from '../configs/navConfig.json'

export default function App() {
  return (
    <Dropdown backdrop="blur">
      <DropdownTrigger>
        <Button variant="ghost" radius="full" color="default" className="backdrop-blur dark:bg-zinc-800 bg-white/90 text-zinc-800 dark:text-zinc-200 text-sm font-medium">
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