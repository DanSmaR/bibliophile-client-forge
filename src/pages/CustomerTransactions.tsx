import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, FileText, Download, Filter, Calendar, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

const mockCustomer = {
  id: 1,
  customerId: 'CLI-001',
  name: 'Ana Silva'
};

const mockTransactions = [
  { id: 'T001', date: '15/01/2024', type: 'Compra', description: 'Livros de Literatura Clássica - Dom Casmurro, O Cortiço', amount: 89.50, status: 'Aprovado', paymentMethod: 'Visa ****1234' },
  { id: 'T002', date: '02/01/2024', type: 'Compra', description: 'Coleção de Poesias Completas - Carlos Drummond de Andrade', amount: 124.75, status: 'Aprovado', paymentMethod: 'Mastercard ****5678' },
  { id: 'T003', date: '18/12/2023', type: 'Compra', description: 'Romance Histórico - O Nome da Rosa', amount: 67.30, status: 'Aprovado', paymentMethod: 'Visa ****1234' },
  { id: 'T004', date: '05/12/2023', type: 'Estorno', description: 'Devolução - Livro Danificado (O Alquimista)', amount: -32.00, status: 'Processado', paymentMethod: 'Visa ****1234' },
  { id: 'T005', date: '28/11/2023', type: 'Compra', description: 'Biografias Clássicas - Steve Jobs, Einstein', amount: 156.20, status: 'Aprovado', paymentMethod: 'Visa ****1234' },
  { id: 'T006', date: '15/11/2023', type: 'Compra', description: 'Ficção Científica - Fundação, Duna', amount: 98.40, status: 'Aprovado', paymentMethod: 'Mastercard ****5678' },
  { id: 'T007', date: '03/11/2023', type: 'Compra', description: 'Literatura Brasileira - Macunaíma, Iracema', amount: 45.60, status: 'Aprovado', paymentMethod: 'Visa ****1234' },
  { id: 'T008', date: '22/10/2023', type: 'Estorno', description: 'Cancelamento de Pedido - Atraso na Entrega', amount: -76.80, status: 'Processado', paymentMethod: 'Mastercard ****5678' },
  { id: 'T009', date: '10/10/2023', type: 'Compra', description: 'Filosofia - Meditações, A República', amount: 112.30, status: 'Aprovado', paymentMethod: 'Visa ****1234' },
  { id: 'T010', date: '28/09/2023', type: 'Compra', description: 'Autoajuda - Hábitos Atômicos, Mindset', amount: 89.90, status: 'Aprovado', paymentMethod: 'Visa ****1234' }
];

const CustomerTransactions = () => {
  const { id } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredTransactions = mockTransactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = typeFilter === 'all' || transaction.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const formatCurrency = (amount: number) => {
    return amount < 0 
      ? `-R$ ${Math.abs(amount).toFixed(2).replace('.', ',')}`
      : `R$ ${amount.toFixed(2).replace('.', ',')}`;
  };

  const totalAmount = filteredTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to={`/customers/${id}`}>
            <Button variant="ghost" size="sm" className="p-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Transações</h1>
            <p className="text-muted-foreground">{mockCustomer.name} - {mockCustomer.customerId}</p>
          </div>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Exportar Relatório
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-soft">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-4 w-4 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total de Transações</p>
                <p className="text-2xl font-bold text-foreground">{filteredTransactions.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-soft">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Valor Total</p>
                <p className={`text-2xl font-bold ${totalAmount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(totalAmount)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-4 w-4 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Compras</p>
                <p className="text-2xl font-bold text-blue-600">
                  {filteredTransactions.filter(t => t.type === 'Compra').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-4 w-4 text-orange-600" />
              <div>
                <p className="text-sm text-muted-foreground">Estornos</p>
                <p className="text-2xl font-bold text-orange-600">
                  {filteredTransactions.filter(t => t.type === 'Estorno').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="shadow-soft">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Pesquisar por descrição ou ID da transação..."
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
                  <Label>Tipo de Transação</Label>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="bg-background border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="Compra">Compra</SelectItem>
                      <SelectItem value="Estorno">Estorno</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="bg-background border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="Aprovado">Aprovado</SelectItem>
                      <SelectItem value="Processado">Processado</SelectItem>
                      <SelectItem value="Pendente">Pendente</SelectItem>
                      <SelectItem value="Cancelado">Cancelado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-end">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      setSearchTerm('');
                      setTypeFilter('all');
                      setStatusFilter('all');
                    }}
                  >
                    Limpar Filtros
                  </Button>
                </div>
              </div>
            )}
            
            <div className="text-sm text-muted-foreground">
              Mostrando {filteredTransactions.length} de {mockTransactions.length} transações
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transactions List */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="text-foreground">Histórico Detalhado de Transações</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredTransactions.map((transaction, index) => (
              <div key={transaction.id}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-full ${
                      transaction.type === 'Compra' 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-orange-100 text-orange-600'
                    }`}>
                      <FileText className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <p className="font-medium text-foreground">{transaction.description}</p>
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
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <FileText className="h-3 w-3" />
                          <span>ID: {transaction.id}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{transaction.date}</span>
                        </div>
                        <span>Pagamento: {transaction.paymentMethod}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-lg font-semibold ${
                      transaction.amount < 0 ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {formatCurrency(transaction.amount)}
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
                {index < filteredTransactions.length - 1 && (
                  <Separator className="mt-4" />
                )}
              </div>
            ))}
            
            {filteredTransactions.length === 0 && (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Nenhuma transação encontrada</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerTransactions;
