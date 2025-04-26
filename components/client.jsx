import { Alert, Badge, Button, Card, Modal, Text } from "@mantine/core"
import { IconInfoCircle } from "@tabler/icons-react"
import moment from "moment"
import Link from "next/link"
import React, { useCallback, useState } from "react"

function Client({ client }) {
  const [profileOpen, setProfileOpen] = useState(false)

  // Opens profile modal
  const handleOpenProfile = useCallback(() => {
    setProfileOpen(true)
  }, [profileOpen])

  // Closes profile modal
  const handleCloseProfile = useCallback(() => {
    setProfileOpen(false)
  }, [profileOpen])

  return (
    <>
      <Card p="md" radius="lg" shadow="sm" withBorder className="space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center text-gray-700 space-x-2 text-sm">
            <span className="font-semibold">{client?.name}</span>
            <span>&bull;</span>
            <span>{client?.age} yrs</span>
            <span>&bull;</span>
            <span>{client?.weight} kg</span>
            <span>&bull;</span>
            <span>{client?.height} cm</span>
          </div>

          <Button
            size="xs"
            variant="light"
            onClick={handleOpenProfile}
            className="mt-2 lg:mt-0"
          >
            View Profile
          </Button>
        </div>
      </Card>

      <Modal
        size={"100%"}
        title={
          <Text size="xl" fw={700}>
            {client?.name}
          </Text>
        }
        centered
        opened={profileOpen}
        onClose={handleCloseProfile}
      >
        <div className="p-4 space-y-2">
          <Text>
            Age: <strong>{client?.age}</strong>
          </Text>
          <Text>
            Weight: <strong>{client?.weight} kg</strong>
          </Text>
          <Text>
            Height: <strong>{client?.height} cm</strong>
          </Text>
          <Text>
            Date registered:{" "}
            <strong>
              {moment(client?.registered_at).format("Do MMM YYYY")}
            </strong>
          </Text>
          <br />

          <strong>Registered programs</strong>

          <div className="flex space-x-2 my-3">
            {client?.programs?.map((program) => (
              <Badge radius={"xs"} color={program?.color}>
                {program?.name}
              </Badge>
            ))}
          </div>

          <Alert
            variant="light"
            color="blue"
            title="API endpoint"
            icon={<IconInfoCircle />}
          >
            <p className="text-wrap">
              This client profile has an id of `{client?._id}`. It has been
              exposed thorough an endpoint of{" "}
              <Link
                target="_blank"
                className="underline hover:cursor-pointer"
                href={
                  process.env.NEXT_PUBLIC_SITE_URL +
                  "/api/client/" +
                  client?._id
                }
              >
                {process.env.NEXT_PUBLIC_SITE_URL +
                  "/api/client/" +
                  client?._id}
              </Link>
            </p>
          </Alert>
        </div>
      </Modal>
    </>
  )
}

export default Client
