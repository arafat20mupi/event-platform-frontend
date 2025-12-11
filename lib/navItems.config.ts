
import { NavSection } from "@/src/types/dashboard.interface";
import { getDefaultDashboardRoute, UserRole } from "./auth-utils";

export const getCommonNavItems = (role: UserRole): NavSection[] => {
    const defaultDashboard = getDefaultDashboardRoute(role);

    return [
        {
            items: [
                {
                    title: "Dashboard",
                    href: defaultDashboard,
                    icon: "LayoutDashboard",
                    roles: ["USER", "HOST", "ADMIN"],
                },
                {
                    title: "My Profile",
                    href: `/my-profile`,
                    icon: "User",
                    roles: ["USER", "HOST", "ADMIN"],
                },

            ]
        },
        {
            title: "Settings",
            items: [
                {
                    title: "Change Password",
                    href: "/change-password",
                    icon: "Settings", 
                    roles: ["USER"],
                },
            ],
        },
    ]
}

export const hostNavItems: NavSection[] = [
    {
        title: "Events Management",
        items: [
            {
                title: "Create Events",
                href: "/host/dashboard/create-events",
                icon: "Calendar", 
                roles: ["HOST"],
            },
            {
                title: "My Hosted Events",
                href: "/host/dashboard/my-hosted-events",
                icon: "Event", 
                roles: ["HOST"],
            }
        ],
    }
]

export const userNavItems: NavSection[] = [
    {
        title: "Events",
        items: [
            {
                title: "My Events",
                href: "/dashboard/my-events",
                icon: "Calendar", 
                roles: ["USER"],
            },
        ],
    },
]

export const adminNavItems: NavSection[] = [
    {
        title: "User Management",
        items: [
            {
                title: "Admins",
                href: "/admin/dashboard/admins-management",
                icon: "Shield", 
                roles: ["ADMIN"],
            },
            {
                title: "Hosts",
                href: "/admin/dashboard/hosts-management",
                icon: "Stethoscope", 
                roles: ["ADMIN"],
            },
            {
                title: "Users",
                href: "/admin/dashboard/users-management",
                icon: "Users", 
                roles: ["ADMIN"],
            },
        ],
    },
    {
        title: "Events Management",
        items: [
            {
                title: "All Events",
                href: "/admin/dashboard/events",
                icon: "Calendar", 
                roles: ["ADMIN"],
            },
            {
                title: "Event Categories",
                href: "/admin/dashboard/event-categories",
                icon: "Hospital", 
                roles: ["ADMIN"],
            },
        ],
    }
]

export const getNavItemsByRole = (role: UserRole): NavSection[] => {
    const commonNavItems = getCommonNavItems(role);

    switch (role) {
        case "ADMIN":
            return [...commonNavItems, ...adminNavItems];
        case "HOST":
            return [...commonNavItems, ...hostNavItems];
        case "USER":
            return [...commonNavItems, ...userNavItems];
        default:
            return [];
    }
}