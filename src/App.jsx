import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";

import Uwu from "./components/Uwu";

export default function App() {
  return (
    <MantineProvider>
      <Uwu/>
    </MantineProvider>
  );
}
