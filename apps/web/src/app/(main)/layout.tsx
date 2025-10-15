import NavigationBar from "@/components/navbar/navigation-bar"
import { Toaster } from 'react-hot-toast'

export default function MainLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
  <>
  <NavigationBar />
  {children}
 <Toaster 
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#000',
            color: '#fff',
            border: '2px solid #42b1cc',
            borderRadius: '10px',
          },
          success: {
            iconTheme: {
              primary: '#bede3d',
              secondary: '#000',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#000',
            },
          },
        }}
      />
    </>)
}