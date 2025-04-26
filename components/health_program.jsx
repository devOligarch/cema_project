import { Notification, Text } from "@mantine/core"
import moment from "moment"
import React from "react"

function HealthProgram() {
  return (
    <div className="col-span-1 hover:cursor-pointer transition-all transition-100 ">
      <Notification color="green" withCloseButton={false}>
        <div className="space-y-4">
          <div>
            <Text size="xl">Malaria</Text>
          </div>

          <div>
            <Text c="dimmed" size="sm">
              34 clients
            </Text>

            <Text size="xs">
              Created {moment(new Date()).format("Do MMM YYYY")}
            </Text>
          </div>
        </div>
      </Notification>
    </div>
  )
}

export default HealthProgram
