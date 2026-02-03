import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Home, 
  Users, 
  MessageSquare, 
  Eye, 
  TrendingUp,
  Wine,
  Newspaper,
  MapPin,
  Calendar
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";

interface Stats {
  totalProperties: number;
  propertiesForSale: number;
  propertiesForRent: number;
  totalExperiences: number;
  totalInquiries: number;
  unreadInquiries: number;
  totalUsers: number;
  totalArticles: number;
  propertiesByCountry: { name: string; value: number }[];
  propertiesByType: { name: string; value: number }[];
  inquiriesByMonth: { month: string; count: number }[];
  recentActivity: number;
}

const COLORS = ['hsl(var(--accent))', 'hsl(var(--primary))', 'hsl(var(--secondary))', '#10b981', '#f59e0b', '#ef4444'];

const StatisticsTab = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);

    // Fetch all data in parallel
    const [
      propertiesRes,
      experiencesRes,
      inquiriesRes,
      usersRes,
      articlesRes,
      activityRes
    ] = await Promise.all([
      supabase.from("properties").select("id, status, country, property_type"),
      supabase.from("experiences").select("id").eq("published", true),
      supabase.from("inquiries").select("id, created_at, read_at"),
      supabase.from("profiles").select("id"),
      supabase.from("news_articles").select("id").eq("published", true),
      supabase.from("activity_logs").select("id").gte("created_at", new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
    ]);

    const properties = propertiesRes.data || [];
    const inquiries = inquiriesRes.data || [];

    // Calculate properties by country
    const countryCount: Record<string, number> = {};
    properties.forEach(p => {
      countryCount[p.country] = (countryCount[p.country] || 0) + 1;
    });
    const propertiesByCountry = Object.entries(countryCount).map(([name, value]) => ({ name, value }));

    // Calculate properties by type
    const typeCount: Record<string, number> = {};
    properties.forEach(p => {
      const type = p.property_type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      typeCount[type] = (typeCount[type] || 0) + 1;
    });
    const propertiesByType = Object.entries(typeCount).map(([name, value]) => ({ name, value }));

    // Calculate inquiries by month (last 6 months)
    const monthCount: Record<string, number> = {};
    const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];
    inquiries.forEach(i => {
      const date = new Date(i.created_at);
      const monthKey = `${months[date.getMonth()]} ${date.getFullYear()}`;
      monthCount[monthKey] = (monthCount[monthKey] || 0) + 1;
    });
    const inquiriesByMonth = Object.entries(monthCount)
      .slice(-6)
      .map(([month, count]) => ({ month, count }));

    setStats({
      totalProperties: properties.length,
      propertiesForSale: properties.filter(p => p.status === 'for_sale').length,
      propertiesForRent: properties.filter(p => p.status === 'for_rent').length,
      totalExperiences: experiencesRes.data?.length || 0,
      totalInquiries: inquiries.length,
      unreadInquiries: inquiries.filter(i => !i.read_at).length,
      totalUsers: usersRes.data?.length || 0,
      totalArticles: articlesRes.data?.length || 0,
      propertiesByCountry,
      propertiesByType,
      inquiriesByMonth,
      recentActivity: activityRes.data?.length || 0
    });

    setLoading(false);
  };

  if (loading || !stats) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-muted-foreground">Chargement des statistiques...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="font-display text-2xl lg:text-3xl hidden lg:block">Statistiques</h2>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Propriétés</CardTitle>
            <Home className="w-5 h-5 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalProperties}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {stats.propertiesForSale} vente • {stats.propertiesForRent} location
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Expériences</CardTitle>
            <Wine className="w-5 h-5 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalExperiences}</div>
            <p className="text-xs text-muted-foreground mt-1">publiées</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Messages</CardTitle>
            <MessageSquare className="w-5 h-5 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalInquiries}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {stats.unreadInquiries > 0 && (
                <span className="text-destructive font-medium">{stats.unreadInquiries} non lus</span>
              )}
              {stats.unreadInquiries === 0 && "tous lus"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Activité (7j)</CardTitle>
            <TrendingUp className="w-5 h-5 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.recentActivity}</div>
            <p className="text-xs text-muted-foreground mt-1">actions récentes</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Properties by Country */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <MapPin className="w-5 h-5 text-accent" />
              Propriétés par pays
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats.propertiesByCountry}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {stats.propertiesByCountry.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Properties by Type */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Home className="w-5 h-5 text-accent" />
              Propriétés par type
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.propertiesByType} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    width={120} 
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))'
                    }}
                  />
                  <Bar dataKey="value" fill="hsl(var(--accent))" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Inquiries Over Time */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Calendar className="w-5 h-5 text-accent" />
              Demandes de contact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={stats.inquiriesByMonth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="count" 
                    stroke="hsl(var(--accent))" 
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--accent))', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-secondary/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-accent" />
              <div>
                <p className="text-2xl font-bold">{stats.totalUsers}</p>
                <p className="text-xs text-muted-foreground">Utilisateurs</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-secondary/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Newspaper className="w-8 h-8 text-accent" />
              <div>
                <p className="text-2xl font-bold">{stats.totalArticles}</p>
                <p className="text-xs text-muted-foreground">Articles publiés</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-secondary/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Home className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold">{stats.propertiesForSale}</p>
                <p className="text-xs text-muted-foreground">À vendre</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-secondary/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Home className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{stats.propertiesForRent}</p>
                <p className="text-xs text-muted-foreground">À louer</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StatisticsTab;
