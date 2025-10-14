import NavigationBar from "@/components/navbar/navigation-bar"
export default function MainLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
  <>
  <NavigationBar />
  {children}
    </>)
}