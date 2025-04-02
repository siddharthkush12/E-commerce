import { LayoutDashboard, ListOrdered, ShoppingBasket } from "lucide-react";
import React, { Fragment } from "react";
import { RiAdminFill } from "react-icons/ri";
import { useNavigate } from "react-router";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "../ui/sheet";

const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <ShoppingBasket />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <ListOrdered />,
  },
];

function MenuItems({ setOpen }) {
  const navigate = useNavigate();
  return (
    <nav className="mt-10 flex-col flex gap-2">
      {adminSidebarMenuItems.map((menuItem) => {
        return (
          <div
            key={menuItem.id}
            onClick={() => {
              navigate(menuItem.path);
              setOpen ? setOpen(false) : null;
            }}
            className="flex cursor-pointer items-center py-2 gap-2 text-muted-foreground hover:bg-muted hover:text-foreground rounded"
          >
            {menuItem.icon}
            <span>{menuItem.label}</span>
          </div>
        );
      })}
    </nav>
  );
}

//Main

function AdminSidebar({ open, setOpen }) {
  return (

    // Mobile view
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-72" aria-describedby={undefined}>
          <div className="flex flex-col h-full py-6 px-4">
            <SheetHeader className="border-b pb-4">
              <SheetTitle className="flex items-center gap-2">
                <RiAdminFill className="text-2xl" />
                <span className="text-xl font-extrabold">Admin Panel</span>
              </SheetTitle>
            </SheetHeader>
            <div className="px-4">
              <MenuItems setOpen={setOpen} />
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* desktop view */}
      <aside className="hidden w-72 flex-col border-r bg-background p-6 lg:flex">
        <div className="flex items-center gap-2">
          <RiAdminFill className="text-2xl" />
          <h1 className="text-xl font-extrabold">Admin Panel</h1>
        </div>
        <MenuItems />
      </aside>
    </Fragment>
  );
}

export default AdminSidebar;
