import { HeroUIProvider } from '@heroui/react'
import { ToastProvider } from '@heroui/toast'

export default function UiProvider({ children }) {
  return (
    <HeroUIProvider>
      <ToastProvider />
      {children}
    </HeroUIProvider>
  );
}
