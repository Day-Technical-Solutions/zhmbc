import { SidebarTrigger } from "@/components/ui/sidebar";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4 pl-[calc(var(--sidebar-width)_+_1rem)]">
          <div className="flex items-center">
            <SidebarTrigger className="mr-4 lg:hidden" />
            <Link
              to="/"
              className="text-2xl sm:text-3xl font-bold text-gray-800"
            >
              ZHMBC
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
