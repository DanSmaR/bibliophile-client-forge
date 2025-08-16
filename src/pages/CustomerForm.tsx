import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

const CustomerForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);

  // Mock data for edit mode
  const mockData = isEdit ? {
    name: 'Ana Silva',
    email: 'ana.silva@email.com',
    phone: '+55 (11) 99123-4567',
    address: 'Rua das Letras, 123',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '01234-567',
    status: 'Ativo',
    notes: 'Prefere literatura clássica e coleções de poesia. Cliente frequente com pedidos de alto valor.',
    preferences: ['Literatura Clássica', 'Poesia']
  } : {};

  const genres = [
    'Literatura Clássica',
    'Ficção Contemporânea',
    'Mistério e Suspense',
    'Ficção Científica',
    'Fantasia',
    'Romance',
    'Poesia',
    'Não-Ficção',
    'Biografia',
    'História',
    'Filosofia',
    'Autoajuda'
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to={isEdit ? `/customers/${id}` : "/customers"}>
            <Button variant="ghost" size="sm" className="p-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {isEdit ? 'Editar Cliente' : 'Adicionar Novo Cliente'}
            </h1>
            <p className="text-muted-foreground">
              {isEdit ? 'Atualizar informações do cliente' : 'Criar um novo perfil de cliente'}
            </p>
          </div>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-elegant">
          <Save className="h-4 w-4 mr-2" />
          {isEdit ? 'Atualizar Cliente' : 'Salvar Cliente'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-foreground">Informações Básicas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground">Nome Completo *</Label>
                  <Input 
                    id="name" 
                    defaultValue={mockData.name} 
                    placeholder="Digite o nome completo do cliente"
                    className="bg-background border-border focus:ring-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">Endereço de E-mail *</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    defaultValue={mockData.email}
                    placeholder="cliente@email.com"
                    className="bg-background border-border focus:ring-primary"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-foreground">Número de Telefone</Label>
                  <Input 
                    id="phone" 
                    defaultValue={mockData.phone}
                    placeholder="+55 (11) 99123-4567"
                    className="bg-background border-border focus:ring-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status" className="text-foreground">Status</Label>
                  <Select defaultValue={mockData.status || "Ativo"}>
                    <SelectTrigger className="bg-background border-border">
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Ativo">Ativo</SelectItem>
                      <SelectItem value="Inativo">Inativo</SelectItem>
                      <SelectItem value="Suspenso">Suspenso</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-foreground">Informações de Endereço</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address" className="text-foreground">Endereço</Label>
                <Input 
                  id="address" 
                  defaultValue={mockData.address}
                  placeholder="Rua Principal, 123"
                  className="bg-background border-border focus:ring-primary"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city" className="text-foreground">Cidade</Label>
                  <Input 
                    id="city" 
                    defaultValue={mockData.city}
                    placeholder="Cidade"
                    className="bg-background border-border focus:ring-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state" className="text-foreground">Estado</Label>
                  <Input 
                    id="state" 
                    defaultValue={mockData.state}
                    placeholder="Estado"
                    className="bg-background border-border focus:ring-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode" className="text-foreground">CEP</Label>
                  <Input 
                    id="zipCode" 
                    defaultValue={mockData.zipCode}
                    placeholder="12345-678"
                    className="bg-background border-border focus:ring-primary"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-foreground">Observações Adicionais</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="notes" className="text-foreground">Observações do Cliente</Label>
                <Textarea 
                  id="notes" 
                  defaultValue={mockData.notes}
                  placeholder="Adicione qualquer observação adicional sobre este cliente..."
                  rows={4}
                  className="bg-background border-border focus:ring-primary resize-none"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preferences */}
        <div className="space-y-6">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-foreground">Preferências de Leitura</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {genres.map((genre) => (
                <div key={genre} className="flex items-center space-x-2">
                  <Checkbox 
                    id={genre} 
                    defaultChecked={mockData.preferences?.includes(genre)}
                    className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <Label 
                    htmlFor={genre} 
                    className="text-sm text-foreground cursor-pointer"
                  >
                    {genre}
                  </Label>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-foreground">Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                disabled={!isEdit}
              >
                Enviar E-mail de Boas-vindas
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                disabled={!isEdit}
              >
                Ver Histórico de Pedidos
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                disabled={!isEdit}
              >
                Gerar Relatório
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CustomerForm;