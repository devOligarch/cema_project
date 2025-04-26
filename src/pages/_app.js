import "@/styles/globals.css"
import "@mantine/core/styles.css"
import "@mantine/notifications/styles.css"

import { createTheme, MantineProvider } from "@mantine/core"
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community"
import { geistSans } from "."
import { Notifications } from "@mantine/notifications"

ModuleRegistry.registerModules([AllCommunityModule])

const theme = createTheme({
  fontFamily: geistSans.style.fontFamily,
})

// Using the MantineProvider to access Mantine's components

export default function App({ Component, pageProps }) {
  return (
    <MantineProvider theme={theme}>
      <Notifications position="top-right" />
      <Component {...pageProps} />
    </MantineProvider>
  )
}
