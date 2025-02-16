import { Outlet } from "react-router-dom";
import { SidebarInset, SidebarProvider } from "./ui/sidebar";
import { Footer } from "./Footer";
import { Header } from "./Header";
import AppSidebar from "./AppSidebar";

export default function Layout() {
  return (
    <div>
      <SidebarProvider>
        <div className="flex flex-col min-h-screen w-screen">
          <Header />
          <div className="flex flex-1">
            <AppSidebar />
            <SidebarInset className="flex-1 flex flex-col overflow-x-hidden">
              <main className="flex-1">
                <Outlet />
              </main>
              <Footer />
            </SidebarInset>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
}
