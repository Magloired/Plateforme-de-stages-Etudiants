import { ContentLayout } from '@/components/admin-panel/content-layout'
import React from 'react'

export default function page() {
  return (
    <ContentLayout title="Dashboard">
      <div className="mt-4">
        <h1 className="text-2xl font-bold">Users Management</h1>
        <p className="text-muted-foreground">
          Manage your users, roles, and permissions.
        </p>
      </div>
    </ContentLayout>
  )
}
