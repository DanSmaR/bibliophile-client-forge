import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, MapPin, Calendar, Edit, Trash2, Star, CreditCard, User, Hash, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const mockCustomer = {
  id: 1,
  customerId: 'CLI-001',
  name: 'Ana Silva',
  gender: 'F',
  birthDate: '15/05/1990',
  cpf: '123.456.789-10',
  email: 'ana.silva@email.com',
  phoneType: 'Celular',
  phoneAreaCode: '11',
  phoneNumber: '99123-4567',
  address: 'Rua das Letras, 123, São Paulo, SP 01234-567',
  status: 'Ativo',
  ranking: 4,
  joinDate: '15/01/2023',
  notes: 'Cliente frequente, sempre pontual nos pagamentos.',
  addresses: [
    {
      id: 1,
      type: 'billing',
      name: 'Endereço Residencial',
      full: 'Rua das Letras, 123, Centro, São Paulo, SP, 01234-567'
    },
    {
      id: 2,
      type: 'delivery',
      name: 'Trabalho',
      full: 'Av. Paulista, 1000, Bela Vista, São Paulo, SP, 01310-100'
    }
  ],
  creditCards: [
    {
      id: 1,
      brand: 'Visa',
      lastFour: '1234',
      preferred: true
    },
    {
      id: 2,
      brand: 'Mastercard',
      lastFour: '5678',
      preferred: false
    }
  ],
  transactions: [
    { id: 'T001', date: '15/01/2024', type: 'Compra', description: 'Livros de Literatura', amount: 'R$ 89,50', status: 'Aprovado' },
    { id: 'T002', date: '02/01/2024', type: 'Compra', description: 'Coleção de Poesias', amount: 'R$ 124,75', status: 'Aprovado' },
    { id: 'T003', date: '18/12/2023', type: 'Compra', description: 'Romance Histórico', amount: 'R$ 67,30', status: 'Aprovado' },
    { id: 'T004', date: '05/12/2023', type: 'Estorno', description: 'Devolução - Livro Danificado', amount: '-R$ 32,00', status: 'Processado' },
    { id: 'T005', date: '28/11/2023', type: 'Compra', description: 'Biografias Clássicas', amount: 'R$ 156,20', status: 'Aprovado' }
  ]
};

const CustomerDetail = () => {
  const { id } = useParams();

  const getRankingStars = (ranking: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < ranking ? 'fill-primary text-primary' : 'text-muted-foreground'}`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/customers">
            <Button variant="ghost" size="sm" className="p-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{mockCustomer.name}</h1>
            <div className="flex items-center space-x-4 mt-1">
              <p className="text-muted-foreground">{mockCustomer.customerId}</p>
              <div className="flex items-center space-x-1">
                {getRankingStars(mockCustomer.ranking)}
                <span className="text-sm text-muted-foreground ml-2">
                  Ranking {mockCustomer.ranking}/5
                </span>
              </div>
            </div>
          </div>
          <Badge 
            variant={mockCustomer.status === 'Ativo' ? 'default' : 'secondary'}
            className={mockCustomer.status === 'Ativo' 
              ? 'bg-forest-green text-primary-foreground' 
              : 'bg-muted text-muted-foreground'
            }
          >
            {mockCustomer.status}
          </Badge>
        </div>
        <div className="flex space-x-2">
          <Link to={`/customers/${id}/edit`}>
            <Button variant="outline">
              <Edit className="h-4 w-4 mr-2" />
              Editar Cliente
            </Button>
          </Link>
          <Button variant="destructive" className="bg-destructive hover:bg-destructive/90">
            <Trash2 className="h-4 w-4 mr-2" />
            {mockCustomer.status === 'Ativo' ? 'Inativar' : 'Excluir'}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="addresses">Endereços</TabsTrigger>
          <TabsTrigger value="cards">Cartões</TabsTrigger>
          <TabsTrigger value="transactions">Transações</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="space-y-6">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-foreground">Informações Pessoais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <User className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Nome Completo</p>
                      <p className="font-medium text-foreground">{mockCustomer.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Hash className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">CPF</p>
                      <p className="font-medium text-foreground">{mockCustomer.cpf}</p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Data de Nascimento</p>
                      <p className="font-medium text-foreground">{mockCustomer.birthDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <User className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Gênero</p>
                      <p className="font-medium text-foreground">
                        {mockCustomer.gender === 'F' ? 'Feminino' : 'Masculino'}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-foreground">Informações de Contato</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">E-mail</p>
                      <p className="font-medium text-foreground">{mockCustomer.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Telefone ({mockCustomer.phoneType})</p>
                      <p className="font-medium text-foreground">
                        +55 ({mockCustomer.phoneAreaCode}) {mockCustomer.phoneNumber}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Endereço Principal</p>
                    <p className="font-medium text-foreground">{mockCustomer.address}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-foreground">Observações do Cliente</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground leading-relaxed">{mockCustomer.notes}</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Addresses Tab */}
        <TabsContent value="addresses" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockCustomer.addresses.map((address) => (
              <Card key={address.id} className="shadow-soft">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <CardTitle className="text-foreground">{address.name}</CardTitle>
                    </div>
                    <Badge variant={address.type === 'billing' ? 'default' : 'secondary'}>
                      {address.type === 'billing' ? 'Cobrança' : 'Entrega'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground">{address.full}</p>
                  <div className="flex space-x-2 mt-4">
                    <Link to={`/customers/${id}/addresses`}>
                      <Button variant="outline" size="sm" className="flex-1">
                        Editar
                      </Button>
                    </Link>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Credit Cards Tab */}
        <TabsContent value="cards" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockCustomer.creditCards.map((card) => (
              <Card key={card.id} className="shadow-soft">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CreditCard className="h-4 w-4 text-primary" />
                      <CardTitle className="text-foreground">{card.brand}</CardTitle>
                    </div>
                    {card.preferred && (
                      <Badge className="bg-primary text-primary-foreground">
                        Preferencial
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground font-mono">**** **** **** {card.lastFour}</p>
                  <div className="flex space-x-2 mt-4">
                    <Button variant="outline" size="sm" className="flex-1">
                      Editar
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Transactions Tab */}
        <TabsContent value="transactions" className="space-y-6">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-foreground">Histórico de Transações</CardTitle>
              <p className="text-sm text-muted-foreground">
                Todas as transações realizadas pelo cliente
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockCustomer.transactions.map((transaction, index) => (
                  <div key={transaction.id}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-4 w-4 text-primary" />
                        <div>
                          <p className="font-medium text-foreground">{transaction.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span>ID: {transaction.id}</span>
                            <span>{transaction.date}</span>
                            <Badge 
                              variant="outline" 
                              className={
                                transaction.type === 'Compra' 
                                  ? 'bg-green-50 text-green-700 border-green-200' 
                                  : 'bg-orange-50 text-orange-700 border-orange-200'
                              }
                            >
                              {transaction.type}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-medium ${
                          transaction.amount.startsWith('-') ? 'text-red-600' : 'text-green-600'
                        }`}>
                          {transaction.amount}
                        </p>
                        <Badge 
                          variant="outline" 
                          className={
                            transaction.status === 'Aprovado' 
                              ? 'text-xs bg-green-50 text-green-700 border-green-200'
                              : 'text-xs bg-blue-50 text-blue-700 border-blue-200'
                          }
                        >
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                    {index < mockCustomer.transactions.length - 1 && (
                      <Separator className="mt-4" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CustomerDetail;