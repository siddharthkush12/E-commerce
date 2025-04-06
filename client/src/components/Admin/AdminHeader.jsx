import { AlignJustify, LogOut } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

function AdminHeader({setOpen}) {
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
      <Button onClick={()=>setOpen(true)} className="lg:hidden sm:block">
        <AlignJustify />
        <span className="sr-only">Menu</span>
      </Button>
      <div className="flex flex-1 justify-end">
        <Button variant="destructive">
          <LogOut/>
          <span>Logout</span>
        </Button>
      </div>
    </header>
  );
}

export default AdminHeader;
