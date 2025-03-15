"use client";

import * as React from "react";
import {
    AudioWaveform,
    BookOpen,
    Bot,
    Command,
    Frame,
    GalleryVerticalEnd,
    Map,
    MoreHorizontal,
    PieChart,
    Settings2,
    SquareTerminal,
} from "lucide-react";

import { NavMain } from "./nav-main";
import { NavProjects } from "./nav-projects";
import { NavUser } from "./nav-user";

import {
    Sidebar,
    SidebarContent, SidebarFooter,
    SidebarHeader,
    SidebarMenuButton, SidebarMenuItem,
    // SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/userState";

// This is sample data.
const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    teams: [
        {
            name: "Acme Inc",
            logo: GalleryVerticalEnd,
            plan: "Enterprise",
        },
        {
            name: "Acme Corp.",
            logo: AudioWaveform,
            plan: "Startup",
        },
        {
            name: "Evil Corp.",
            logo: Command,
            plan: "Free",
        },
    ],
    navMain: [
        {
            title: "Playground",
            url: "#",
            icon: SquareTerminal,
            isActive: true,
            items: [
                {
                    title: "History",
                    url: "#",
                },
                {
                    title: "Starred",
                    url: "#",
                },
                {
                    title: "Settings",
                    url: "#",
                },
            ],
        },
        {
            title: "Models",
            url: "#",
            icon: Bot,
            items: [
                {
                    title: "Genesis",
                    url: "#",
                },
                {
                    title: "Explorer",
                    url: "#",
                },
                {
                    title: "Quantum",
                    url: "#",
                },
            ],
        },
        {
            title: "Documentation",
            url: "#",
            icon: BookOpen,
            items: [
                {
                    title: "Introduction",
                    url: "#",
                },
                {
                    title: "Get Started",
                    url: "#",
                },
                {
                    title: "Tutorials",
                    url: "#",
                },
                {
                    title: "Changelog",
                    url: "#",
                },
            ],
        },
        {
            title: "Settings",
            url: "#",
            icon: Settings2,
            items: [
                {
                    title: "General",
                    url: "#",
                },
                {
                    title: "Team",
                    url: "#",
                },
                {
                    title: "Billing",
                    url: "#",
                },
                {
                    title: "Limits",
                    url: "#",
                },
            ],
        },
    ],
    projects: [
        {
            name: "Setting",
            url: "#",
            icon: Settings2,
        }
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

    const { user  } = useUser();
    if (!user) {
        return (
            <div>

            </div>
            // <Sidebar collapsible="icon" {...props}>
            //     <SidebarMenuButton
            //         onClick={() => router.push("/login")}
            //         className="text-sidebar-foreground/70"
            //     >
            //         <MoreHorizontal className="text-sidebar-foreground/70" />
            //         <span>Login</span>
            //     </SidebarMenuButton>
            // </Sidebar>



        );
    }
console.log("User", user);
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <NavUser user={{ name: 'Nawamin Onkhwan', email: user, avatar: "/avatars/shadcn.jpg" }} />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                {/*<NavProjects projects={data.projects} />*/}
            </SidebarContent>
            <SidebarFooter>
                <NavProjects projects={data.projects} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
