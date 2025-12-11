/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/pages/AdminHostsClient.tsx
"use client";

import React, { useState } from "react";
import { Card } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/table";
import { Badge } from "@/src/components/ui/badge";
import HostFormDialog from "@/src/components/modules/admin/HostDiologForm";
import { toast } from "sonner";
import DeleteConfirmationDialog from "@/src/components/shared/DeleteConfirmationDialog";
import { IHost } from "@/src/types/host.interface";
import { softDeleteHost, getHosts as clientGetHosts } from "@/src/services/admin/HostManagement";

interface Props {
  initialHosts: IHost[]; // server-provided initial data
}

export default function AdminHostsClient({ initialHosts }: Props) {
  const [hosts, setHosts] = useState<IHost[]>(initialHosts ?? []);
  const [deletingHost, setDeletingHost] = useState<any | null>(null);
  const [editingHost, setEditingHost] = useState<any | null>(null);
  const [isHostFormOpen, setIsHostFormOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Re-fetch hosts from client (used after create/update/delete)
  const refreshHosts = async () => {
    try {
      // use client-safe getHosts which returns normalized data
      const res = await clientGetHosts();
      const newList = Array.isArray(res?.data) ? res.data : [];
      setHosts(newList);
      // optional: router.refresh(); // if you rely on server rendering to update other UI
    } catch (err: any) {
      console.error("refreshHosts error:", err);
    }
  };

  const handleAddHost = () => {
    setEditingHost(null);
    setIsHostFormOpen(true);
  };

  const handleEdit = (row: any) => {
    const hostPayload: Partial<IHost> = {
      id: row.id ?? row.hostId ?? row.userId,
      name: row.displayName ?? row.userName ?? row.hostDisplayName,
      email: row.email ?? row.userEmail ?? row.hostEmail,
      profileImage: row.profileImage ?? row.userProfileImage ?? row.hostProfileImage,
      bio: row.bio,
      location: row.location,
      contactNumber: row.contactNumber,
    };
    setEditingHost(hostPayload as IHost);
    setIsHostFormOpen(true);
  };

  const handleDelete = (row: any) => {
    setDeletingHost(row);
  };

  const confirmDelete = async () => {
    if (!deletingHost) return;
    setIsDeleting(true);
    const targetId = deletingHost.id ?? deletingHost.hostId ?? deletingHost.userId;
    const result = await softDeleteHost(String(targetId));
    setIsDeleting(false);

    if (result?.success) {
      toast.success(result.message || "Host deleted successfully");
      setDeletingHost(null);
      await refreshHosts();
    } else {
      toast.error(result?.message || "Failed to delete host");
    }
  };

  return (
    <>
      <Card className="p-6 mb-6">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {hosts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    No hosts found
                  </TableCell>
                </TableRow>
              ) : (
                hosts.map((row: any) => (
                  <TableRow key={row.id ?? row.hostId ?? row.userId}>
                    <TableCell className="font-medium">{row.displayName ?? row.userName ?? row.hostDisplayName}</TableCell>
                    <TableCell>{row.email ?? row.userEmail ?? row.hostEmail ?? "—"}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{row.role ?? row.userRole ?? "HOST"}</Badge>
                    </TableCell>
                    <TableCell>
                      {(row.createdAt ?? row.userCreatedAt ?? row.hostCreatedAt)
                        ? new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(
                            new Date(row.createdAt ?? row.userCreatedAt ?? row.hostCreatedAt)
                          )
                        : "—"}
                    </TableCell>
                    <TableCell>
                      <Badge variant={(row.status ?? row.userStatus ?? (row.isDeleted ? "deleted" : "active"))?.toLowerCase?.() === "active" ? "default" : "destructive"}>
                        {row.status ?? row.userStatus ?? (row.isDeleted ? "deleted" : "active")}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(row)}>
                        Edit
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(row)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      <div className="flex gap-2 items-center mb-6">
        <Button onClick={handleAddHost}>Add Host</Button>
        <Button onClick={refreshHosts} variant="outline">Refresh</Button>
      </div>

      <HostFormDialog
        open={isHostFormOpen}
        onClose={() => {
          setIsHostFormOpen(false);
          setEditingHost(null);
        }}
        host={editingHost ?? undefined}
        onSuccess={async () => {
          setIsHostFormOpen(false);
          setEditingHost(null);
          await refreshHosts();
        }}
      />

      <DeleteConfirmationDialog
        open={!!deletingHost}
        title="Delete Host"
        description={deletingHost ? `Are you sure you want to delete host "${deletingHost.displayName ?? deletingHost.userName ?? deletingHost.hostDisplayName}"? This action cannot be undone.` : "Are you sure?"}
        isDeleting={isDeleting}
        onConfirm={confirmDelete}
        onOpenChange={(open) => {
          if (!open) setDeletingHost(null);
        }}
      />
    </>
  );
}
