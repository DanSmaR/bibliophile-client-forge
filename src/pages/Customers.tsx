import { Link } from 'react-router-dom';
import { Plus, Search, MoreHorizontal, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const mockCustomers = [
  {
    id: 1,
    name: 'Ana Silva',
    email: 'ana.silva@email.com',
    phone: '+55 (11) 99123-4567',
    address: 'Rua das Letras, 123, São Paulo, SP',
    status: 'Ativo',
    orders: 12,
    totalSpent: 'R$ 1.247,50',
    joinDate: '15/01/2023'
  },
  {
    id: 2,
    name: 'João Santos',
    email: 'joao.santos@email.com',
    phone: '+55 (11) 99987-6543',
    address: 'Av. dos Romances, 456, Rio de Janeiro, RJ',
    status: 'Ativo',
    orders: 8,
    totalSpent: 'R$ 892,30',
    joinDate: '22/03/2023'
  },
  {
    id: 3,
    name: 'Maria Oliveira',
    email: 'maria.oliveira@email.com',
    phone: '+55 (11) 99456-7890',
    address: 'Rua da Poesia, 789, Belo Horizonte, MG',
    status: 'Inativo',
    orders: 3,
    totalSpent: 'R$ 234,90',
    joinDate: '10/06/2023'
  },
  {
    id: 4,
    name: 'Pedro Costa',
    email: 'pedro.costa@email.com',
    phone: '+55 (11) 99321-0987',
    address: 'Blvd. da Ficção, 321, Brasília, DF',
    status: 'Ativo',
    orders: 15,
    totalSpent: 'R$ 1.856,75',
    joinDate: '08/11/2022'
  }
];

const Customers = () => {
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
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Pesquisar clientes por nome, email ou telefone..."
                className="pl-10 bg-background border-border focus:ring-primary"
              />
            </div>
            <Button variant="outline" className="w-full sm:w-auto">
              Filtrar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Customer Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockCustomers.map((customer) => (
          <Card key={customer.id} className="hover:shadow-elegant transition-shadow duration-200 bg-card border-border">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-foreground text-lg">{customer.name}</h3>
                  <p className="text-sm text-muted-foreground">Cliente #{customer.id}</p>
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
                  {customer.phone}
                </div>
                <div className="flex items-start text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="line-clamp-2">{customer.address}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border">
                <div className="text-center">
                  <p className="text-sm font-medium text-foreground">{customer.orders}</p>
                  <p className="text-xs text-muted-foreground">Pedidos</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-accent">{customer.totalSpent}</p>
                  <p className="text-xs text-muted-foreground">Total Gasto</p>
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