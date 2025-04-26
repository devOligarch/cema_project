import { Tabs } from "@mantine/core"
import React from "react"
import HealthPrograms from "./health_programs"
import Clients from "./clients"

function Application() {
  return (
    <div className="p-4">
      <Tabs defaultValue="health_programs">
        <Tabs.List>
          <Tabs.Tab value="health_programs">Health programs</Tabs.Tab>
          <Tabs.Tab value="clients">Clients</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="health_programs">
          <HealthPrograms />
        </Tabs.Panel>
        <Tabs.Panel value="clients">
          <Clients />
        </Tabs.Panel>
      </Tabs>
    </div>
  )
}

export default Application
