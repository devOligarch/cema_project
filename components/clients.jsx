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
import { IconInfoCircle, IconPlus } from "@tabler/icons-react"
import { Formik } from "formik"
import React, { useCallback, useState } from "react"
import { AgGridReact } from "ag-grid-react"
import moment from "moment"
import Link from "next/link"

function Clients() {
  const [keyword, setKeyword] = useState("")
  const [newClient, setNewClient] = useState(false)

  const handleChangeKeyword = useCallback(
    (e) => {
      setKeyword(e.target.value)
    },
    [keyword]
  )

  const handleOpenNewClient = useCallback(() => {
    setNewClient(true)
  }, [newClient])

  const handleCloseNewClient = useCallback(() => {
    setNewClient(false)
  }, [newClient])

  const sampleOptions = [
    { value: "malaria", label: "Malaria" },
    { value: "cholera", label: "Cholera" },
    { value: "covid", label: "COVID-19" },
    { value: "typhoid", label: "Typhoid" },
  ]

  const [rowData, setRowData] = useState([
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
  ])

  const ViewProfile = ({ data }) => {
    const [profileOpen, setProfileOpen] = useState(false)

    const handleOpenProfile = useCallback(() => {
      setProfileOpen(true)
    }, [profileOpen])

    const handleCloseProfile = useCallback(() => {
      setProfileOpen(false)
    }, [profileOpen])

    return (
      <div className="flex items-center space-x-1 p-1">
        <Button size="xs" onClick={handleOpenProfile}>
          View profile
        </Button>

        <Modal
          title={
            <Text size="xl" fw={700}>
              {data?.name}
            </Text>
          }
          centered
          opened={profileOpen}
          onClose={handleCloseProfile}
        >
          <div className="p-4 space-y-2">
            <Text>
              Age: <strong>{data?.age}</strong>
            </Text>
            <Text>
              Weight: <strong>{data?.weight} kg</strong>
            </Text>
            <Text>
              Height: <strong>{data?.height} cm</strong>
            </Text>
            <Text>
              Date registered:{" "}
              <strong>{moment(new Date()).format("Do MMM YYYY")}</strong>
            </Text>
            <br />
            <Table striped>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Health program</Table.Th>
                  <Table.Th>Date enrolled</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                <Table.Tr>
                  <Table.Td>
                    <Badge>Malaria</Badge>
                  </Table.Td>
                  <Table.Td>
                    {moment(new Date()).format("Do MMM YYYY")}
                  </Table.Td>
                </Table.Tr>
              </Table.Tbody>
            </Table>

            <Alert
              variant="light"
              color="blue"
              title="API endpoint"
              icon={<IconInfoCircle />}
            >
              This client profile has an id of `{data?.id}`. It has been exposed
              thorough an endpoint of{" "}
              <Link
                target="_blank"
                className="underline hover:cursor-pointer"
                href={
                  process.env.NEXT_PUBLIC_SITE_URL + "/api/client/" + data?.id
                }
              >
                {process.env.NEXT_PUBLIC_SITE_URL + "/api/client/" + data?.id}
              </Link>
            </Alert>
          </div>
        </Modal>
      </div>
    )
  }

  // Column Definitions: Defines the columns to be displayed.
  const [colDefs, setColDefs] = useState([
    { field: "name", filter: true, floatingFilter: true },
    { field: "age", width: 120, filter: true, floatingFilter: true },
    { field: "weight", width: 120, filter: true, floatingFilter: true },
    { field: "height", width: 120, filter: true, floatingFilter: true },
    { field: "date registered", filter: true, floatingFilter: true },

    { field: "programs", flex: 1, filter: true, floatingFilter: true },
    {
      field: "",
      width: 140,
      pinned: "right",
      cellRenderer: ViewProfile,
    },
  ])

  return (
    <div className="p-4">
      <div className="flex space-x-4 items-center">
        <Input
          placeholder="Search client ex. Mary Gakuyo"
          value={keyword}
          className="w-4/5"
          onChange={handleChangeKeyword}
        />
        <Button onClick={handleOpenNewClient} leftSection={<IconPlus />}>
          Add client
        </Button>
      </div>

      <br />

      <div className="overflow-y-auto h-[calc(100vh-270px)] max-h-[calc(100vh-240px)]">
        <AgGridReact rowData={rowData} columnDefs={colDefs} />
      </div>

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
          onSubmit={(values, { resetForm }) => {}}
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
                data={sampleOptions}
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
