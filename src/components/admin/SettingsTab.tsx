import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Shield, 
  UserPlus, 
  Trash2, 
  Users,
  Settings,
  Plus,
  Check,
  X,
  Crown,
  User
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface UserRole {
  id: string;
  user_id: string;
  role: "admin" | "user" | "assistant";
  created_at: string;
}

interface Profile {
  id: string;
  user_id: string;
  email: string | null;
  full_name: string | null;
}

interface UserWithRole extends Profile {
  role?: UserRole;
}

const SettingsTab = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    
    const [profilesRes, rolesRes] = await Promise.all([
      supabase.from("profiles").select("*").order("created_at", { ascending: false }),
      supabase.from("user_roles").select("*")
    ]);

    if (profilesRes.data && rolesRes.data) {
      const usersWithRoles: UserWithRole[] = profilesRes.data.map(profile => ({
        ...profile,
        role: rolesRes.data.find(r => r.user_id === profile.user_id)
      }));
      setUsers(usersWithRoles);
    }
    
    setLoading(false);
  };

  const handleRoleChange = async (userId: string, newRole: "admin" | "user" | "assistant") => {
    setUpdating(userId);
    
    const existingRole = users.find(u => u.user_id === userId)?.role;
    
    try {
      if (existingRole) {
        // Update existing role
        const { error } = await supabase
          .from("user_roles")
          .update({ role: newRole })
          .eq("user_id", userId);
        
        if (error) throw error;
      } else {
        // Insert new role
        const { error } = await supabase
          .from("user_roles")
          .insert({ user_id: userId, role: newRole });
        
        if (error) throw error;
      }

      toast({ title: "Rôle mis à jour", description: `Le rôle a été changé en ${newRole}.` });
      await fetchUsers();
    } catch (error) {
      console.error("Error updating role:", error);
      toast({ title: "Erreur", description: "Impossible de mettre à jour le rôle.", variant: "destructive" });
    }
    
    setUpdating(null);
  };

  const handleRemoveRole = async (userId: string) => {
    if (!confirm("Voulez-vous vraiment supprimer ce rôle? L'utilisateur n'aura plus d'accès staff.")) return;
    
    setUpdating(userId);
    
    const { error } = await supabase
      .from("user_roles")
      .delete()
      .eq("user_id", userId);
    
    if (!error) {
      toast({ title: "Rôle supprimé" });
      await fetchUsers();
    } else {
      toast({ title: "Erreur", description: "Impossible de supprimer le rôle.", variant: "destructive" });
    }
    
    setUpdating(null);
  };

  const getRoleBadge = (role?: "admin" | "user" | "assistant") => {
    if (!role) return <Badge variant="secondary">Aucun</Badge>;
    
    switch (role) {
      case "admin":
        return <Badge className="bg-red-500 text-white"><Crown className="w-3 h-3 mr-1" /> Admin</Badge>;
      case "assistant":
        return <Badge className="bg-blue-500 text-white"><User className="w-3 h-3 mr-1" /> Assistant</Badge>;
      default:
        return <Badge variant="secondary">Utilisateur</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-muted-foreground">Chargement des paramètres...</p>
      </div>
    );
  }

  const staffUsers = users.filter(u => u.role && (u.role.role === "admin" || u.role.role === "assistant"));
  const regularUsers = users.filter(u => !u.role || u.role.role === "user");

  return (
    <div className="space-y-8">
      <h2 className="font-display text-2xl lg:text-3xl hidden lg:block">Paramètres</h2>

      {/* Staff Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-accent" />
            Gestion des Admins & Assistants
          </CardTitle>
          <CardDescription>
            Gérez les permissions des utilisateurs ayant accès au dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {staffUsers.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">Aucun utilisateur staff.</p>
            ) : (
              staffUsers.map((user) => (
                <div 
                  key={user.id} 
                  className="flex items-center justify-between p-4 border border-border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                      {user.role?.role === "admin" ? (
                        <Crown className="w-5 h-5 text-accent" />
                      ) : (
                        <User className="w-5 h-5 text-accent" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{user.full_name || "Utilisateur"}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Select
                      value={user.role?.role || "user"}
                      onValueChange={(value) => handleRoleChange(user.user_id, value as "admin" | "user" | "assistant")}
                      disabled={updating === user.user_id}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="assistant">Assistant</SelectItem>
                        <SelectItem value="user">Utilisateur</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveRole(user.user_id)}
                      disabled={updating === user.user_id}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* All Users */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-accent" />
            Tous les utilisateurs
          </CardTitle>
          <CardDescription>
            Promouvoir des utilisateurs en Admin ou Assistant.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {regularUsers.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">Aucun utilisateur régulier.</p>
            ) : (
              regularUsers.map((user) => (
                <div 
                  key={user.id} 
                  className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-secondary/20 transition-colors"
                >
                  <div>
                    <p className="font-medium">{user.full_name || "Utilisateur"}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {getRoleBadge(user.role?.role)}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRoleChange(user.user_id, "assistant")}
                      disabled={updating === user.user_id}
                    >
                      <UserPlus className="w-4 h-4 mr-1" />
                      Promouvoir
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* System Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-accent" />
            Informations Système
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-secondary/20 rounded-lg">
              <p className="text-sm text-muted-foreground">Total Utilisateurs</p>
              <p className="text-2xl font-bold">{users.length}</p>
            </div>
            <div className="p-4 bg-secondary/20 rounded-lg">
              <p className="text-sm text-muted-foreground">Admins</p>
              <p className="text-2xl font-bold">{users.filter(u => u.role?.role === "admin").length}</p>
            </div>
            <div className="p-4 bg-secondary/20 rounded-lg">
              <p className="text-sm text-muted-foreground">Assistants</p>
              <p className="text-2xl font-bold">{users.filter(u => u.role?.role === "assistant").length}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsTab;
