import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  User, 
  Mail, 
  Phone, 
  Calendar,
  MessageSquare,
  History,
  MapPin
} from "lucide-react";

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  inquiries: {
    id: string;
    message: string;
    status: string | null;
    created_at: string;
    property_id: string | null;
  }[];
  firstContact: string;
  lastContact: string;
  totalInquiries: number;
}

const ClientsTab = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    setLoading(true);
    
    const { data: inquiries, error } = await supabase
      .from("inquiries")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && inquiries) {
      // Group inquiries by email to create client profiles
      const clientMap: Record<string, Client> = {};
      
      inquiries.forEach(inquiry => {
        const email = inquiry.email.toLowerCase();
        
        if (!clientMap[email]) {
          clientMap[email] = {
            id: email,
            name: inquiry.name,
            email: inquiry.email,
            phone: inquiry.phone,
            inquiries: [],
            firstContact: inquiry.created_at,
            lastContact: inquiry.created_at,
            totalInquiries: 0
          };
        }
        
        clientMap[email].inquiries.push({
          id: inquiry.id,
          message: inquiry.message,
          status: inquiry.status,
          created_at: inquiry.created_at,
          property_id: inquiry.property_id
        });
        
        clientMap[email].totalInquiries++;
        
        // Update first/last contact
        if (new Date(inquiry.created_at) < new Date(clientMap[email].firstContact)) {
          clientMap[email].firstContact = inquiry.created_at;
        }
        if (new Date(inquiry.created_at) > new Date(clientMap[email].lastContact)) {
          clientMap[email].lastContact = inquiry.created_at;
          clientMap[email].name = inquiry.name; // Use most recent name
          if (inquiry.phone) clientMap[email].phone = inquiry.phone;
        }
      });

      setClients(Object.values(clientMap));
    }
    
    setLoading(false);
  };

  const filteredClients = clients.filter(client =>
    searchQuery === "" ||
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.phone?.includes(searchQuery)
  );

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-muted-foreground">Chargement des clients...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl lg:text-3xl hidden lg:block">Clients</h2>
        <Badge variant="secondary">{clients.length} client{clients.length > 1 ? 's' : ''}</Badge>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Rechercher par nom, email ou téléphone..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Clients List */}
        <div className="space-y-3 max-h-[600px] overflow-y-auto">
          {filteredClients.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground border border-dashed border-border rounded-lg">
              Aucun client trouvé.
            </div>
          ) : (
            filteredClients.map((client) => (
              <Card 
                key={client.id}
                className={`cursor-pointer transition-all hover:border-accent ${
                  selectedClient?.id === client.id ? "border-accent bg-accent/5" : ""
                }`}
                onClick={() => setSelectedClient(client)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                        <User className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <h4 className="font-medium">{client.name}</h4>
                        <p className="text-sm text-muted-foreground">{client.email}</p>
                        {client.phone && (
                          <p className="text-sm text-muted-foreground">{client.phone}</p>
                        )}
                      </div>
                    </div>
                    <Badge variant="secondary">
                      {client.totalInquiries} demande{client.totalInquiries > 1 ? 's' : ''}
                    </Badge>
                  </div>
                  <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Premier contact: {formatDate(client.firstContact)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Client Detail */}
        <div className="border border-border rounded-lg bg-card">
          {selectedClient ? (
            <div className="p-6 space-y-6">
              {/* Client Header */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center">
                  <User className="w-8 h-8 text-accent" />
                </div>
                <div>
                  <h3 className="font-display text-xl">{selectedClient.name}</h3>
                  <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                    <a href={`mailto:${selectedClient.email}`} className="flex items-center gap-1 hover:text-accent">
                      <Mail className="w-4 h-4" />
                      {selectedClient.email}
                    </a>
                  </div>
                  {selectedClient.phone && (
                    <a href={`tel:${selectedClient.phone}`} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-accent mt-1">
                      <Phone className="w-4 h-4" />
                      {selectedClient.phone}
                    </a>
                  )}
                </div>
              </div>

              {/* Client Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-secondary/30 rounded-lg">
                  <p className="text-sm text-muted-foreground">Premier contact</p>
                  <p className="font-medium">{formatDate(selectedClient.firstContact)}</p>
                </div>
                <div className="p-4 bg-secondary/30 rounded-lg">
                  <p className="text-sm text-muted-foreground">Dernier contact</p>
                  <p className="font-medium">{formatDate(selectedClient.lastContact)}</p>
                </div>
              </div>

              {/* Inquiry History */}
              <div>
                <h4 className="font-medium flex items-center gap-2 mb-4">
                  <History className="w-5 h-5 text-accent" />
                  Historique des demandes ({selectedClient.totalInquiries})
                </h4>
                <div className="space-y-3 max-h-[300px] overflow-y-auto">
                  {selectedClient.inquiries.map((inquiry) => (
                    <div key={inquiry.id} className="p-3 border border-border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-muted-foreground">
                          {new Date(inquiry.created_at).toLocaleString('fr-FR')}
                        </span>
                        <Badge 
                          variant={inquiry.status === 'replied' ? 'default' : 'secondary'}
                          className={inquiry.status === 'replied' ? 'bg-green-500' : ''}
                        >
                          {inquiry.status === 'replied' ? 'Répondu' : 
                           inquiry.status === 'read' ? 'Lu' : 'Nouveau'}
                        </Badge>
                      </div>
                      <p className="text-sm line-clamp-3">{inquiry.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full min-h-[400px] text-muted-foreground">
              <div className="text-center">
                <User className="w-12 h-12 mx-auto mb-4 opacity-30" />
                <p>Sélectionnez un client pour voir les détails</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        {filteredClients.length} client{filteredClients.length > 1 ? 's' : ''} sur {clients.length}
      </p>
    </div>
  );
};

export default ClientsTab;
