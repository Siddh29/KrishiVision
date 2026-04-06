import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppLayout showSidebar={true}>
      <div className="p-6 h-full w-full">
        {children}
      </div>
    </AppLayout>
  );
}
