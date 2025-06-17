import Link from "next/link";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { BreadcrumbNav } from "@/components/admin-panel/breadcrumb-nav";
import UsersPage from "@/components/users/UsersPage";


export default function UsersPages() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Users", isCurrentPage: true }
  ];

  return (
    <ContentLayout title="Users">
      <BreadcrumbNav items={breadcrumbItems} />
      <div className="mt-4">
        <UsersPage />
      </div>
    </ContentLayout>
  );
}
