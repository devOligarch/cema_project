import {
  Button,
  ColorInput,
  Input,
  Modal,
  Text,
  TextInput,
} from "@mantine/core"
import React, { useCallback, useEffect, useState } from "react"
import HealthProgram from "./health_program"
import { IconCheck, IconPlus } from "@tabler/icons-react"
import { Formik } from "formik"
import { notifications } from "@mantine/notifications"

function HealthPrograms() {
  const [keyword, setKeyword] = useState("")
  const [newProgram, setNewProgram] = useState(false)
  const [loading, setLoading] = useState(false)
  const [programs, setPrograms] = useState([])

  // Handle keyword change for search filter
  const handleChangeKeyword = useCallback(
    (e) => {
      setKeyword(e.target.value)
    },
    [keyword]
  )

  // Opens a new program modal
  const handleOpenNewProgram = useCallback(() => {
    setNewProgram(true)
  }, [newProgram])

  // Closes new program modal
  const handleCloseNewProgram = useCallback(() => {
    setNewProgram(false)
  }, [newProgram])

  // This function saves the program to the database using the /api/new_program endpoint
  const saveProgramToDB = async (program) => {
    return fetch("/api/new_program", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(program),
    }).then(async (res) => {
      return res.status
    })
  }

  // This function is a callback that compares each program to the search query
  const handleFilter = (program) =>
    keyword.length === 0 ||
    program?.name?.toLowerCase()?.includes(keyword.toLowerCase())

  // This function fetches all programs using our /api/get_programs endpoint
  const fetchPrograms = async () => {
    setLoading(true)

    try {
      const res = await fetch("/api/get_programs")
      const data = await res.json()

      console.log(data.programs)
      setPrograms(data.programs)
    } catch (error) {
      console.error("Failed to fetch programs", error)
    } finally {
      setLoading(false)
    }
  }

  // Fetch programs on initial page load
  useEffect(() => {
    fetchPrograms()
  }, [])

  return (
    <div className="p-4">
      {/* Program search */}
      <div className="lg:flex space-y-2 space-x-4 items-center">
        <div className="lg:w-4/5">
          <Input
            placeholder="Search health program ex. Malaria"
            value={keyword}
            className="w-full"
            onChange={handleChangeKeyword}
          />
        </div>
        <div className="flex justify-center ">
          <Button onClick={handleOpenNewProgram} leftSection={<IconPlus />}>
            Add program
          </Button>
        </div>
      </div>

      <br />

      {/* Health programs list */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 overflow-y-auto max-h-[calc(100vh-240px)]">
        {programs?.filter(handleFilter)?.map((program) => (
          <HealthProgram program={program} key={program?._id} />
        ))}
      </div>

      {/* New program modal */}
      <Modal
        title={
          <Text size="xl" fw={700}>
            Create new program
          </Text>
        }
        centered
        opened={newProgram}
        onClose={handleCloseNewProgram}
      >
        <Formik
          initialValues={{ name: "", color: "" }}
          onSubmit={(values, { resetForm }) => {
            saveProgramToDB(values)
              .then((status_code) => {
                if (status_code == 200) {
                  notifications.show({
                    message: "Health program created successfully",
                    title: "Success",
                    color: "green",
                    icon: <IconCheck />,
                  })
                  fetchPrograms()
                  resetForm()
                  handleCloseNewProgram()
                }
              })
              .catch(console.log)
          }}
        >
          {({ values, handleChange, handleSubmit, setFieldValue }) => (
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <TextInput
                name="name"
                label="Program name"
                placeholder="ex. Malaria"
                value={values.name}
                onChange={handleChange}
              />

              <ColorInput
                name="color"
                label="Color code"
                placeholder="Pick a color"
                value={values.color}
                onChange={(color) => setFieldValue("color", color)}
              />

              <div className="flex flex-row-reverse">
                <Button type="submit">Save program</Button>
              </div>
            </form>
          )}
        </Formik>
      </Modal>
    </div>
  )
}

export default HealthPrograms
