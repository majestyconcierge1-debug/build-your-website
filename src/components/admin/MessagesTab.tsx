import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  Search, 
  Mail, 
  MailOpen, 
  Reply, 
  Trash2, 
  Phone, 
  Calendar,
  X,
  Send,
  CheckCircle,
  Clock,
  Filter
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  status: string | null;
  created_at: string;
  property_id: string | null;
  read_at: string | null;
  replied_at: string | null;
  reply_message: string | null;
}

interface MessagesTabProps {
  onUnreadCountChange?: (count: number) => void;
}

const MessagesTab = ({ onUnreadCountChange }: MessagesTabProps) => {
  const { toast } = useToast();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [replying, setReplying] = useState(false);

  useEffect(() => {
    fetchInquiries();
  }, []);

  useEffect(() => {
    const unreadCount = inquiries.filter(i => !i.read_at).length;
    onUnreadCountChange?.(unreadCount);
  }, [inquiries, onUnreadCountChange]);

  const fetchInquiries = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("inquiries")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setInquiries(data as Inquiry[]);
    }
    setLoading(false);
  };

  const markAsRead = async (inquiry: Inquiry) => {
    if (inquiry.read_at) return;
    
    await supabase
      .from("inquiries")
      .update({ read_at: new Date().toISOString(), status: "read" })
      .eq("id", inquiry.id);
    
    setInquiries(prev => 
      prev.map(i => i.id === inquiry.id ? { ...i, read_at: new Date().toISOString(), status: "read" } : i)
    );
  };

  const handleSelectInquiry = async (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry);
    setReplyMessage(inquiry.reply_message || "");
    await markAsRead(inquiry);
  };

  const handleReply = async () => {
    if (!selectedInquiry || !replyMessage.trim()) return;
    
    setReplying(true);
    
    const { error } = await supabase
      .from("inquiries")
      .update({ 
        reply_message: replyMessage,
        replied_at: new Date().toISOString(),
        status: "replied"
      })
      .eq("id", selectedInquiry.id);

    if (!error) {
      toast({ title: "Réponse enregistrée", description: "Le message a été marqué comme répondu." });
      setInquiries(prev =>
        prev.map(i => i.id === selectedInquiry.id 
          ? { ...i, reply_message: replyMessage, replied_at: new Date().toISOString(), status: "replied" }
          : i
        )
      );
      setSelectedInquiry(prev => prev ? { ...prev, reply_message: replyMessage, replied_at: new Date().toISOString(), status: "replied" } : null);
    } else {
      toast({ title: "Erreur", description: "Impossible d'enregistrer la réponse.", variant: "destructive" });
    }
    
    setReplying(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Voulez-vous vraiment supprimer ce message ?")) return;
    
    const { error } = await supabase.from("inquiries").delete().eq("id", id);
    if (!error) {
      toast({ title: "Message supprimé" });
      setInquiries(prev => prev.filter(i => i.id !== id));
      if (selectedInquiry?.id === id) setSelectedInquiry(null);
    }
  };

  const filteredInquiries = inquiries.filter(inquiry => {
    const matchesSearch = searchQuery === "" ||
      inquiry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inquiry.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inquiry.message.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filterStatus === "all" ||
      (filterStatus === "unread" && !inquiry.read_at) ||
      (filterStatus === "read" && inquiry.read_at && !inquiry.replied_at) ||
      (filterStatus === "replied" && inquiry.replied_at);

    return matchesSearch && matchesFilter;
  });

  const unreadCount = inquiries.filter(i => !i.read_at).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-muted-foreground">Chargement des messages...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="font-display text-2xl lg:text-3xl hidden lg:block">Messages</h2>
          {unreadCount > 0 && (
            <Badge variant="destructive" className="animate-pulse">
              {unreadCount} non lu{unreadCount > 1 ? 's' : ''}
            </Badge>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher par nom, email ou message..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filtrer" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les messages</SelectItem>
            <SelectItem value="unread">Non lus</SelectItem>
            <SelectItem value="read">Lus</SelectItem>
            <SelectItem value="replied">Répondus</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Messages List */}
        <div className="space-y-3 max-h-[600px] overflow-y-auto">
          {filteredInquiries.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground border border-dashed border-border rounded-lg">
              Aucun message trouvé.
            </div>
          ) : (
            filteredInquiries.map((inquiry) => (
              <div
                key={inquiry.id}
                onClick={() => handleSelectInquiry(inquiry)}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  selectedInquiry?.id === inquiry.id 
                    ? "border-accent bg-accent/5" 
                    : "border-border hover:border-accent/50"
                } ${!inquiry.read_at ? "bg-accent/10" : "bg-card"}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    {inquiry.read_at ? (
                      <MailOpen className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    ) : (
                      <Mail className="w-5 h-5 text-accent flex-shrink-0" />
                    )}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium truncate">{inquiry.name}</h4>
                        {inquiry.replied_at && (
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{inquiry.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-xs text-muted-foreground">
                      {new Date(inquiry.created_at).toLocaleDateString('fr-FR')}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={(e) => { e.stopPropagation(); handleDelete(inquiry.id); }}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </div>
                <p className="mt-2 text-sm line-clamp-2">{inquiry.message}</p>
              </div>
            ))
          )}
        </div>

        {/* Message Detail */}
        <div className="border border-border rounded-lg bg-card">
          {selectedInquiry ? (
            <div className="p-6 space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-display text-xl">{selectedInquiry.name}</h3>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <a href={`mailto:${selectedInquiry.email}`} className="flex items-center gap-1 hover:text-accent">
                      <Mail className="w-4 h-4" />
                      {selectedInquiry.email}
                    </a>
                    {selectedInquiry.phone && (
                      <a href={`tel:${selectedInquiry.phone}`} className="flex items-center gap-1 hover:text-accent">
                        <Phone className="w-4 h-4" />
                        {selectedInquiry.phone}
                      </a>
                    )}
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setSelectedInquiry(null)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Reçu le {new Date(selectedInquiry.created_at).toLocaleString('fr-FR')}
                </span>
                {selectedInquiry.replied_at && (
                  <span className="flex items-center gap-1 text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    Répondu le {new Date(selectedInquiry.replied_at).toLocaleString('fr-FR')}
                  </span>
                )}
              </div>

              <div className="p-4 bg-secondary/30 rounded-lg">
                <p className="text-sm whitespace-pre-wrap">{selectedInquiry.message}</p>
              </div>

              {/* Reply Section */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Reply className="w-5 h-5 text-accent" />
                  <h4 className="font-medium">Répondre</h4>
                </div>
                <Textarea
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  placeholder="Écrivez votre réponse ici..."
                  className="min-h-[120px]"
                />
                <div className="flex gap-3">
                  <Button 
                    variant="luxury" 
                    onClick={handleReply} 
                    disabled={replying || !replyMessage.trim()}
                    className="gap-2"
                  >
                    <Send className="w-4 h-4" />
                    {replying ? "Envoi..." : "Enregistrer la réponse"}
                  </Button>
                  <Button
                    variant="outline"
                    asChild
                  >
                    <a href={`mailto:${selectedInquiry.email}?subject=Re: Votre demande - Majesty Concierge&body=${encodeURIComponent(replyMessage)}`}>
                      Ouvrir dans email
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full min-h-[400px] text-muted-foreground">
              <div className="text-center">
                <Mail className="w-12 h-12 mx-auto mb-4 opacity-30" />
                <p>Sélectionnez un message pour le lire</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        {filteredInquiries.length} message{filteredInquiries.length > 1 ? 's' : ''} sur {inquiries.length}
      </p>
    </div>
  );
};

export default MessagesTab;
