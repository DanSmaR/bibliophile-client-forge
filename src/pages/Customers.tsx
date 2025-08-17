import { Link } from 'react-router-dom';
import { Plus, Search, MoreHorizontal, Mail, Phone, MapPin, Filter, Star, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

const mockCustomers = [
  {
    id: 1,
    customerId: 'CLI-001',
    name: 'Ana Silva',
    gender: 'F',
    cpf: '123.456.789-10',
    birthDate: '15/05/1990',
    email: 'ana.silva@email.com',
    phoneType: 'Celular',
    phoneAreaCode: '11',
    phoneNumber: '99123-4567',
    address: 'Rua das Letras, 123, São Paulo, SP',
    status: 'Ativo',
    ranking: 4,
    joinDate: '15/01/2023',
    lastOrder: '15/01/2024'
  },
  {
    id: 2,
    customerId: 'CLI-002',
    name: 'João Santos',
    gender: 'M',
    cpf: '987.654.321-00',
    birthDate: '22/03/1985',
    email: 'joao.santos@email.com',
    phoneType: 'Celular',
    phoneAreaCode: '11',
    phoneNumber: '99987-6543',
    address: 'Av. dos Romances, 456, Rio de Janeiro, RJ',
    status: 'Ativo',
    ranking: 3,
    joinDate: '22/03/2023',
    lastOrder: '10/01/2024'
  },
  {
    id: 3,
    customerId: 'CLI-003',
    name: 'Maria Oliveira',
    gender: 'F',
    cpf: '456.789.123-45',
    birthDate: '10/06/1992',
    email: 'maria.oliveira@email.com',
    phoneType: 'Celular',
    phoneAreaCode: '11',
    phoneNumber: '99456-7890',
    address: 'Rua da Poesia, 789, Belo Horizonte, MG',
    status: 'Inativo',
    ranking: 2,
    joinDate: '10/06/2023',
    lastOrder: '20/11/2023'
  },
  {
    id: 4,
    customerId: 'CLI-004',
    name: 'Pedro Costa',
    gender: 'M',
    cpf: '321.654.987-12',
    birthDate: '08/11/1988',
    email: 'pedro.costa@email.com',
    phoneType: 'Comercial',
    phoneAreaCode: '11',
    phoneNumber: '99321-0987',
    address: 'Blvd. da Ficção, 321, Brasília, DF',
    status: 'Ativo',
    ranking: 5,
    joinDate: '08/11/2022',
    lastOrder: '14/01/2024'
  },
  {
    id: 5,
    customerId: 'CLI-005',
    name: 'Carmen Rodriguez',
    gender: 'F',
    cpf: '654.321.987-33',
    birthDate: '12/09/1995',
    email: 'carmen.rodriguez@email.com',
    phoneType: 'Celular',
    phoneAreaCode: '21',
    phoneNumber: '98765-4321',
    address: 'Rua dos Clássicos, 555, Salvador, BA',
    status: 'Ativo',
    ranking: 3,
    joinDate: '12/09/2023',
    lastOrder: '05/01/2024'
  }
];

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [rankingFilter, setRankingFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredCustomers = mockCustomers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.customerId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.cpf.includes(searchTerm) ||
                         `${customer.phoneAreaCode}${customer.phoneNumber}`.includes(searchTerm.replace(/\D/g, ''));
    
    const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;
    const matchesRanking = rankingFilter === 'all' || customer.ranking.toString() === rankingFilter;
    
    return matchesSearch && matchesStatus && matchesRanking;
  });

  const getRankingStars = (ranking: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${i < ranking ? 'fill-primary text-primary' : 'text-muted-foreground'}`}
      />
    ));
  };
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Clientes</h1>
          <p className="text-muted-foreground mt-1">Gerencie os clientes da sua livraria</p>
        </div>
        <Link to="/customers/new">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-elegant">
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Cliente
          </Button>
        </Link>
      </div>

      {/* Search and Filters */}
      <Card className="shadow-soft">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Pesquisar por nome, email, CPF, código do cliente ou telefone..."
                  className="pl-10 bg-background border-border focus:ring-primary"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button 
                variant="outline" 
                className="w-full sm:w-auto"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
            </div>
            
            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-border">
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="bg-background border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="Ativo">Ativo</SelectItem>
                      <SelectItem value="Inativo">Inativo</SelectItem>
                      <SelectItem value="Suspenso">Suspenso</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Ranking</Label>
                  <Select value={rankingFilter} onValueChange={setRankingFilter}>
                    <SelectTrigger className="bg-background border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="5">5 Estrelas</SelectItem>
                      <SelectItem value="4">4 Estrelas</SelectItem>
                      <SelectItem value="3">3 Estrelas</SelectItem>
                      <SelectItem value="2">2 Estrelas</SelectItem>
                      <SelectItem value="1">1 Estrela</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-end">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      setSearchTerm('');
                      setStatusFilter('all');
                      setRankingFilter('all');
                    }}
                  >
                    Limpar Filtros
                  </Button>
                </div>
              </div>
            )}
            
            <div className="text-sm text-muted-foreground">
              Mostrando {filteredCustomers.length} de {mockCustomers.length} clientes
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Customer Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCustomers.map((customer) => (
          <Card key={customer.id} className="hover:shadow-elegant transition-shadow duration-200 bg-card border-border">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-foreground text-lg">{customer.name}</h3>
                  <p className="text-sm text-muted-foreground">{customer.customerId}</p>
                  <div className="flex items-center space-x-1 mt-1">
                    {getRankingStars(customer.ranking)}
                    <span className="text-xs text-muted-foreground ml-2">
                      Ranking {customer.ranking}/5
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge 
                    variant={customer.status === 'Ativo' ? 'default' : 'secondary'}
                    className={customer.status === 'Ativo' 
                      ? 'bg-forest-green text-primary-foreground' 
                      : 'bg-muted text-muted-foreground'
                    }
                  >
                    {customer.status}
                  </Badge>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Mail className="h-4 w-4 mr-2" />
                  {customer.email}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Phone className="h-4 w-4 mr-2" />
                  +55 ({customer.phoneAreaCode}) {customer.phoneNumber}
                </div>
                <div className="flex items-start text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="line-clamp-2">{customer.address}</span>
                </div>
              </div>
              
              <div className="flex justify-center pt-2 border-t border-border">
                <div className="text-center">
                  <div className="flex items-center justify-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    <p className="text-sm font-medium text-foreground">{customer.lastOrder}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">Último Pedido</p>
                </div>
              </div>

              <div className="flex space-x-2 pt-2">
                <Link to={`/customers/${customer.id}`} className="flex-1">
                  <Button variant="outline" size="sm" className="w-full">
                    Ver Detalhes
                  </Button>
                </Link>
                <Link to={`/customers/${customer.id}/edit`} className="flex-1">
                  <Button variant="default" size="sm" className="w-full bg-primary hover:bg-primary/90">
                    Editar
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Customers;