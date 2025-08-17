import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Plus, Trash2, CreditCard, MapPin, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';

const CustomerForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: 'billing',
      name: 'Endereço Principal',
      residenceType: 'Casa',
      streetType: 'Rua',
      street: 'das Letras',
      number: '123',
      neighborhood: 'Centro',
      zipCode: '01234-567',
      city: 'São Paulo',
      state: 'SP',
      country: 'Brasil',
      observations: ''
    }
  ]);
  const [creditCards, setCreditCards] = useState([
    {
      id: 1,
      number: '**** **** **** 1234',
      name: 'Ana Silva',
      brand: 'Visa',
      securityCode: '***',
      preferred: true
    }
  ]);

  // Mock data for edit mode
  const mockData = isEdit ? {
    customerId: 'CLI-001',
    name: 'Ana Silva',
    gender: 'F',
    birthDate: '1990-05-15',
    cpf: '123.456.789-10',
    phoneType: 'Celular',
    phoneAreaCode: '11',
    phoneNumber: '99123-4567',
    email: 'ana.silva@email.com',
    status: 'Ativo',
    ranking: 4,
    notes: 'Prefere literatura clássica e coleções de poesia. Cliente frequente com pedidos de alto valor.'
  } : {};

  const genders = [
    { value: 'M', label: 'Masculino' },
    { value: 'F', label: 'Feminino' },
    { value: 'NB', label: 'Não Binário' },
    { value: 'O', label: 'Outro' },
    { value: 'NI', label: 'Prefiro não informar' }
  ];

  const phoneTypes = ['Celular', 'Residencial', 'Comercial'];
  const residenceTypes = ['Casa', 'Apartamento', 'Condomínio', 'Sobrado', 'Kitnet', 'Outro'];
  const streetTypes = ['Rua', 'Avenida', 'Travessa', 'Alameda', 'Estrada', 'Rodovia', 'Praça', 'Largo'];
  const states = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];
  const creditCardBrands = ['Visa', 'Mastercard', 'American Express', 'Elo', 'Hipercard'];

  const addAddress = (type: 'billing' | 'delivery') => {
    const newAddress = {
      id: Date.now(),
      type,
      name: type === 'billing' ? 'Endereço de Cobrança' : 'Endereço de Entrega',
      residenceType: 'Casa',
      streetType: 'Rua',
      street: '',
      number: '',
      neighborhood: '',
      zipCode: '',
      city: '',
      state: 'SP',
      country: 'Brasil',
      observations: ''
    };
    setAddresses([...addresses, newAddress]);
  };

  const removeAddress = (id: number) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
  };

  const addCreditCard = () => {
    const newCard = {
      id: Date.now(),
      number: '',
      name: '',
      brand: 'Visa',
      securityCode: '',
      preferred: creditCards.length === 0
    };
    setCreditCards([...creditCards, newCard]);
  };

  const removeCreditCard = (id: number) => {
    setCreditCards(creditCards.filter(card => card.id !== id));
  };

  const setPreferredCard = (id: number) => {
    setCreditCards(creditCards.map(card => ({
      ...card,
      preferred: card.id === id
    })));
  };

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
              {isEdit ? 'Editar Cliente' : 'Cadastrar Novo Cliente'}
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

      <Tabs defaultValue="basic" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">Dados Básicos</TabsTrigger>
          <TabsTrigger value="addresses">Endereços</TabsTrigger>
          <TabsTrigger value="cards">Cartões</TabsTrigger>
          <TabsTrigger value="password">Senha</TabsTrigger>
        </TabsList>

        {/* Basic Information Tab */}
        <TabsContent value="basic" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Personal Information */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-foreground">Informações Pessoais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEdit && (
                  <div className="space-y-2">
                    <Label htmlFor="customerId" className="text-foreground">Código do Cliente</Label>
                    <Input 
                      id="customerId" 
                      defaultValue={mockData.customerId} 
                      disabled
                      className="bg-muted border-border"
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground">Nome Completo *</Label>
                  <Input 
                    id="name" 
                    defaultValue={mockData.name} 
                    placeholder="Digite o nome completo do cliente"
                    className="bg-background border-border focus:ring-primary"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="gender" className="text-foreground">Gênero *</Label>
                    <Select defaultValue={mockData.gender}>
                      <SelectTrigger className="bg-background border-border">
                        <SelectValue placeholder="Selecione o gênero" />
                      </SelectTrigger>
                      <SelectContent>
                        {genders.map((gender) => (
                          <SelectItem key={gender.value} value={gender.value}>
                            {gender.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="birthDate" className="text-foreground">Data de Nascimento *</Label>
                    <Input 
                      id="birthDate" 
                      type="date"
                      defaultValue={mockData.birthDate}
                      className="bg-background border-border focus:ring-primary"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cpf" className="text-foreground">CPF *</Label>
                  <Input 
                    id="cpf" 
                    defaultValue={mockData.cpf}
                    placeholder="000.000.000-00"
                    className="bg-background border-border focus:ring-primary"
                    required
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
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Contact and Status */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-foreground">Contato e Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-foreground">Telefone *</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <Select defaultValue={mockData.phoneType}>
                      <SelectTrigger className="bg-background border-border">
                        <SelectValue placeholder="Tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        {phoneTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input 
                      placeholder="DDD"
                      defaultValue={mockData.phoneAreaCode}
                      className="bg-background border-border focus:ring-primary"
                      maxLength={2}
                      required
                    />
                    <Input 
                      placeholder="Número"
                      defaultValue={mockData.phoneNumber}
                      className="bg-background border-border focus:ring-primary"
                      required
                    />
                  </div>
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
                {isEdit && (
                  <div className="space-y-2">
                    <Label htmlFor="ranking" className="text-foreground">Ranking do Cliente</Label>
                    <div className="flex items-center space-x-2">
                      <Input 
                        id="ranking" 
                        type="number"
                        min="1"
                        max="5"
                        defaultValue={mockData.ranking}
                        className="bg-background border-border focus:ring-primary"
                        disabled
                      />
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <div
                            key={star}
                            className={`w-4 h-4 rounded-full ${
                              star <= (mockData.ranking || 0) ? 'bg-primary' : 'bg-muted'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="notes" className="text-foreground">Observações</Label>
                  <Textarea 
                    id="notes" 
                    defaultValue={mockData.notes}
                    placeholder="Adicione observações sobre este cliente..."
                    rows={4}
                    className="bg-background border-border focus:ring-primary resize-none"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Addresses Tab */}
        <TabsContent value="addresses" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold text-foreground">Endereços</h3>
              <p className="text-sm text-muted-foreground">
                É obrigatório pelo menos um endereço de cobrança e um de entrega
              </p>
            </div>
            <div className="flex space-x-2">
              <Button onClick={() => addAddress('billing')} variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Endereço de Cobrança
              </Button>
              <Button onClick={() => addAddress('delivery')} variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Endereço de Entrega
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {addresses.map((address, index) => (
              <Card key={address.id} className="shadow-soft">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <CardTitle className="text-foreground">{address.name}</CardTitle>
                      <Badge variant={address.type === 'billing' ? 'default' : 'secondary'}>
                        {address.type === 'billing' ? 'Cobrança' : 'Entrega'}
                      </Badge>
                    </div>
                    {addresses.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeAddress(address.id)}
                        className="text-destructive hover:text-destructive/90"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Nome do Endereço *</Label>
                    <Input 
                      defaultValue={address.name}
                      placeholder="Ex: Casa, Trabalho, Casa da Avó"
                      className="bg-background border-border focus:ring-primary"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Tipo de Residência *</Label>
                      <Select defaultValue={address.residenceType}>
                        <SelectTrigger className="bg-background border-border">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {residenceTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Tipo de Logradouro *</Label>
                      <Select defaultValue={address.streetType}>
                        <SelectTrigger className="bg-background border-border">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {streetTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2 space-y-2">
                      <Label>Logradouro *</Label>
                      <Input 
                        defaultValue={address.street}
                        placeholder="Nome da rua"
                        className="bg-background border-border focus:ring-primary"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Número *</Label>
                      <Input 
                        defaultValue={address.number}
                        placeholder="123"
                        className="bg-background border-border focus:ring-primary"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Bairro *</Label>
                      <Input 
                        defaultValue={address.neighborhood}
                        placeholder="Nome do bairro"
                        className="bg-background border-border focus:ring-primary"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>CEP *</Label>
                      <Input 
                        defaultValue={address.zipCode}
                        placeholder="00000-000"
                        className="bg-background border-border focus:ring-primary"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Cidade *</Label>
                      <Input 
                        defaultValue={address.city}
                        placeholder="Nome da cidade"
                        className="bg-background border-border focus:ring-primary"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Estado *</Label>
                      <Select defaultValue={address.state}>
                        <SelectTrigger className="bg-background border-border">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {states.map((state) => (
                            <SelectItem key={state} value={state}>
                              {state}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>País *</Label>
                    <Input 
                      defaultValue={address.country}
                      className="bg-background border-border focus:ring-primary"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Observações</Label>
                    <Textarea 
                      defaultValue={address.observations}
                      placeholder="Informações adicionais sobre este endereço..."
                      rows={2}
                      className="bg-background border-border focus:ring-primary resize-none"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Credit Cards Tab */}
        <TabsContent value="cards" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold text-foreground">Cartões de Crédito</h3>
              <p className="text-sm text-muted-foreground">
                Gerencie os cartões de crédito associados ao cliente
              </p>
            </div>
            <Button onClick={addCreditCard} variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Cartão
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {creditCards.map((card, index) => (
              <Card key={card.id} className="shadow-soft">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CreditCard className="h-4 w-4 text-primary" />
                      <CardTitle className="text-foreground">Cartão {index + 1}</CardTitle>
                      {card.preferred && (
                        <Badge className="bg-primary text-primary-foreground">
                          Preferencial
                        </Badge>
                      )}
                    </div>
                    {creditCards.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeCreditCard(card.id)}
                        className="text-destructive hover:text-destructive/90"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Número do Cartão *</Label>
                    <Input 
                      defaultValue={card.number}
                      placeholder="0000 0000 0000 0000"
                      className="bg-background border-border focus:ring-primary"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Nome Impresso no Cartão *</Label>
                    <Input 
                      defaultValue={card.name}
                      placeholder="Nome como aparece no cartão"
                      className="bg-background border-border focus:ring-primary"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Bandeira *</Label>
                      <Select defaultValue={card.brand}>
                        <SelectTrigger className="bg-background border-border">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {creditCardBrands.map((brand) => (
                            <SelectItem key={brand} value={brand}>
                              {brand}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Código de Segurança *</Label>
                      <Input 
                        defaultValue={card.securityCode}
                        placeholder="000"
                        maxLength={4}
                        className="bg-background border-border focus:ring-primary"
                        required
                      />
                    </div>
                  </div>
                  {!card.preferred && creditCards.length > 1 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPreferredCard(card.id)}
                      className="w-full"
                    >
                      Definir como Preferencial
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Password Tab */}
        <TabsContent value="password" className="space-y-6">
          <Card className="shadow-soft max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="text-foreground">
                {isEdit ? 'Alterar Senha' : 'Definir Senha'}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                A senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas e caracteres especiais
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground">
                  {isEdit ? 'Nova Senha' : 'Senha'} *
                </Label>
                <div className="relative">
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"}
                    placeholder="Digite a senha"
                    className="bg-background border-border focus:ring-primary pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-foreground">
                  Confirmar Senha *
                </Label>
                <div className="relative">
                  <Input 
                    id="confirmPassword" 
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Digite a senha novamente"
                    className="bg-background border-border focus:ring-primary pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>
              <div className="text-xs text-muted-foreground space-y-1">
                <p>A senha deve conter:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Pelo menos 8 caracteres</li>
                  <li>Pelo menos uma letra maiúscula</li>
                  <li>Pelo menos uma letra minúscula</li>
                  <li>Pelo menos um caractere especial (!@#$%^&*)</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CustomerForm;