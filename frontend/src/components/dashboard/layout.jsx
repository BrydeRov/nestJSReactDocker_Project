import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset, SidebarProvider, SidebarTrigger,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"

export default function Layout({ children, user, handleLogout, onNavigate, activePage }) {
  return (
    <SidebarProvider>
      <AppSidebar
        user={user}
        handleLogout={handleLogout}
        onNavigate={onNavigate}
        activePage={activePage}
      />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <span className="text-sm font-semibold capitalize">{activePage}</span>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}