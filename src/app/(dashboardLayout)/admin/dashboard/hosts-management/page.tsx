import { PageHeader } from "@/src/components/modules/common/page-header";
import { Card } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Search } from "lucide-react";
import { Input } from "@/src/components/ui/input";
import { getHosts } from "@/src/services/admin/HostManagement";
import AdminHostsClient from "@/src/components/modules/admin/Hostmanagement";

export default async function AdminHostsPage() {
  const result = await getHosts();
  const hosts = Array.isArray(result?.data) ? result.data : [];

  return (
    <main className="min-h-screen bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <PageHeader
          title="Users Management"
          subtitle="View and manage platform users"
        />

        <Card className="p-4 mb-6">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search users..." className="pl-10" />
            </div>
            <Button>Search</Button>
          </div>
        </Card>

        {/* Client wrapper receives initial server-fetched hosts */}
        <AdminHostsClient initialHosts={hosts} />
      </div>
    </main>
  );
}
