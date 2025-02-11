import {
  Calendar,
  Heart,
  Home,
  Inbox,
  Info,
  MapPin,
  Phone,
  Search,
  Settings,
  HandHeart,
  Users,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Menu items.
const items = [
  { icon: Home, label: "Home", href: "/" },
  { icon: Calendar, label: "Services", href: "#services" },
  { icon: Calendar, label: "Events", href: "#events" },
  { icon: Users, label: "Members", href: "#members" },
  { icon: Heart, label: "Donations", href: "#donations" },
  { icon: MapPin, label: "Location", href: "#location" },
  { icon: Info, label: "About", href: "#about" },
  { icon: HandHeart, label: "Prayer Requests", href: "#prayer-requests" },
  { icon: Phone, label: "Contact", href: "#contact" },
];

export default function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>ZHMBC</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.label} className="py-5">
                  <SidebarMenuButton asChild>
                    <a href={item.href}>
                      <item.icon />
                      <span className="text-lg pl-2">{item.label}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
