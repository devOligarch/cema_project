import {
  Alert,
  Badge,
  Button,
  Input,
  Modal,
  MultiSelect,
  NumberInput,
  Table,
  Text,
  TextInput,
  useCombobox,
} from "@mantine/core"
import { IconCheck, IconInfoCircle, IconPlus } from "@tabler/icons-react"
import { Formik } from "formik"
import React, { useCallback, useEffect, useState } from "react"
import { AgGridReact } from "ag-grid-react"
import moment from "moment"
import Link from "next/link"
import { notifications } from "@mantine/notifications"
import Client from "./client"

function Clients() {
  const [newClient, setNewClient] = useState(false)
  const [clients, setClients] = useState([])
  const [programs, setPrograms] = useState([])
  const [loading, setLoading] = useState(false)
  const [keyword, setKeyword] = useState("")

  // Handle keyword change for search filter
  const handleChangeKeyword = useCallback(
    (e) => {
      setKeyword(e.target.value)
    },
    [keyword]
  )

  // Opens new client modal
  const handleOpenNewClient = useCallback(() => {
    setNewClient(true)
  }, [newClient])

  // Closes new client modal
  const handleCloseNewClient = useCallback(() => {
    setNewClient(false)
  }, [newClient])

  // Fetches clients and saves the clients in a state container
  const fetchClients = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/get_clients")
      const data = await res.json()

      setClients(data.clients)
    } catch (error) {
      console.log("Failed to fetch clients", error)
    } finally {
      setLoading(false)
    }
  }

  // Fetches programs and saves them in a state to render them (programs) in a Select component
  const fetchPrograms = async () => {
    try {
      const res = await fetch("/api/get_programs")
      const data = await res.json()

      let formatted_options = data?.programs?.map((program) => ({
        value: program?._id,
        label: program?.name,
      }))

      setPrograms(formatted_options)
    } catch (error) {
      console.log(error)
    }
  }

  // This function is a callback that compares each program to the search query
  const handleFilter = (client) =>
    keyword.length === 0 ||
    client?.name?.toLowerCase()?.includes(keyword.toLowerCase())

  const handleAddNewClient = async (client) => {
    return fetch("/api/new_client", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(client),
    }).then(async (res) => {
      return res.status
    })
  }

  // Fetch clients and programs on initial load
  useEffect(() => {
    fetchClients()
    fetchPrograms()
  }, [])

  return (
    <div className="p-4">
      {/* Client search */}
      <div className="lg:flex space-y-2 space-x-4 items-center">
        <div className="lg:w-4/5">
          <Input
            className="w-full"
            placeholder="Search client ex. Maria"
            value={keyword}
            onChange={handleChangeKeyword}
          />
        </div>

        <div className="flex justify-center ">
          <Button onClick={handleOpenNewClient} leftSection={<IconPlus />}>
            Add client
          </Button>
        </div>
      </div>

      <br />

      {/* Client list */}
      <div className="overflow-y-auto space-y-2  max-h-[calc(100vh-240px)]">
        {clients?.filter(handleFilter)?.map((client) => (
          <Client client={client} />
        ))}
      </div>

      {/* Add client modal */}
      <Modal
        title={
          <Text size="xl" fw={700}>
            Add a new client
          </Text>
        }
        centered
        opened={newClient}
        onClose={handleCloseNewClient}
      >
        <Formik
          initialValues={{
            name: "",
            age: null,
            gender: "",
            weight: null,
            height: null,
            programs: [],
          }}
          onSubmit={(values, { resetForm }) => {
            handleAddNewClient(values).then((status_code) => {
              if (status_code == 200) {
                notifications.show({
                  title: "Success",
                  message: "Client created successfully",
                  color: "green",
                  icon: <IconCheck />,
                })
                fetchClients()
                resetForm()
                handleCloseNewClient()
              }
            })
          }}
        >
          {({ values, handleChange, handleSubmit, setFieldValue }) => (
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <TextInput
                name="name"
                label="Name"
                placeholder="ex. Stephen"
                value={values.name}
                onChange={handleChange}
              />
              <NumberInput
                label="Age"
                value={values.age}
                onChange={(age) => setFieldValue("age", age)}
                placeholder="ex. 24"
                hideControls
              />
              <NumberInput
                label="Height"
                value={values.height}
                onChange={(height) => setFieldValue("height", height)}
                placeholder="ex. 178"
                hideControls
                rightSection={<p className="mr-8">cm</p>}
              />
              <NumberInput
                label="Weight"
                value={values.weight}
                onChange={(weight) => setFieldValue("weight", weight)}
                placeholder="ex. 72"
                hideControls
                rightSection={<p className="mr-8">kg</p>}
              />
              <MultiSelect
                data={programs}
                label="Health programs"
                placeholder="Pick one or more"
                searchable
                clearable
                value={values.programs}
                onChange={(val) => setFieldValue("programs", val)}
                nothingFound="Nothing found"
                withinPortal
              />
              <br />

              <div className="flex flex-row-reverse">
                <Button type="submit">Add client</Button>
              </div>
            </form>
          )}
        </Formik>
      </Modal>
      <br />
    </div>
  )
}

export default Clients
