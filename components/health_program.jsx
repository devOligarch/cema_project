import { Notification, Text } from "@mantine/core"
import moment from "moment"
import React from "react"

function HealthProgram({ program }) {
  return (
    <div className="col-span-1 hover:cursor-pointer transition-all transition-100 ">
      <Notification color={program?.color} withCloseButton={false}>
        <div className="space-y-4">
          <div>
            <Text size="xl">{program?.name}</Text>
          </div>

          <div>
            <Text c="dimmed" size="sm">
              {program?.clientCount} clients
            </Text>

            <Text size="xs">
              Created {moment(program?.createdAt).format("Do MMM YYYY")}
            </Text>
          </div>
        </div>
      </Notification>
    </div>
  )
}

export default HealthProgram
