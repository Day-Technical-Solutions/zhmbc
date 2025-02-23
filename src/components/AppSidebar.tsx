import {
  Calendar,
  Heart,
  Home,
  Info,
  MapPin,
  Phone,
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
import { Link } from "react-router-dom";

// Menu items.
const items = [
  { icon: Home, label: "Home", href: "/" },
  { icon: Calendar, label: "Services", href: "/#services" },
  { icon: MapPin, label: "Location", href: "/#location" },
  { icon: Calendar, label: "Events", href: "/events" },
  { icon: Info, label: "About", href: "/about" },
  { icon: Users, label: "Members", href: "/members" },
  { icon: Heart, label: "Donations", href: "/donate" },
  { icon: HandHeart, label: "Prayer Requests", href: "/prayer" },
  { icon: Phone, label: "Contact Us", href: "/contact" },
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
                    <Link to={item.href}>
                      <item.icon />
                      <span className="text-lg pl-2">{item.label}</span>
                    </Link>
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
