import { Avatar } from "@mantine/core"
import React from "react"

function Header() {
  return (
    <div className="flex p-4 justify-between w-full ">
      <div className="h-[40px] w-[10px]" />
      <Avatar color="red">SK</Avatar>
    </div>
  )
}

export default Header
