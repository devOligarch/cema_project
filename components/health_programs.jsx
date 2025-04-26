import {
  Button,
  ColorInput,
  Input,
  Modal,
  Text,
  TextInput,
} from "@mantine/core"
import React, { useCallback, useState } from "react"
import HealthProgram from "./health_program"
import { IconPlus } from "@tabler/icons-react"
import { Formik } from "formik"

function HealthPrograms() {
  const [keyword, setKeyword] = useState("")
  const [newProgram, setNewProgram] = useState(false)

  const handleChangeKeyword = useCallback(
    (e) => {
      setKeyword(e.target.value)
    },
    [keyword]
  )

  const handleOpenNewProgram = useCallback(() => {
    setNewProgram(true)
  }, [newProgram])

  const handleCloseNewProgram = useCallback(() => {
    setNewProgram(false)
  }, [newProgram])

  const saveProgramToDB = async (program) => {
    // return fetch("/api/hello", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(program),
    // }).then((res) => res.json())
  }

  return (
    <div className="p-4">
      <div className="flex space-x-4 items-center">
        <Input
          placeholder="Search health program ex. Malaria"
          value={keyword}
          className="w-4/5"
          onChange={handleChangeKeyword}
        />
        <Button onClick={handleOpenNewProgram} leftSection={<IconPlus />}>
          Add program
        </Button>
      </div>

      <br />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 overflow-y-auto max-h-[calc(100vh-240px)]">
        {[
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        ].map((program) => (
          <HealthProgram program={program} key={program?.id} />
        ))}
      </div>
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
              .then((res) => {
                console.log(res)
                resetForm()
                handleCloseNewProgram()
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
