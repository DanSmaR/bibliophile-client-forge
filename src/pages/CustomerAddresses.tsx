import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Plus, Trash2, MapPin, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

const mockCustomer = {
  id: 1,
  customerId: 'CLI-001',
  name: 'Ana Silva'
};

const mockAddresses = [
  {
    id: 1,
    type: 'billing',
    name: 'Endereço Residencial',
    residenceType: 'Casa',
    streetType: 'Rua',
    street: 'das Letras',
    number: '123',
    neighborhood: 'Centro',
    zipCode: '01234-567',
    city: 'São Paulo',
    state: 'SP',
    country: 'Brasil',
    observations: 'Portão azul'
  },
  {
    id: 2,
    type: 'delivery',
    name: 'Trabalho',
    residenceType: 'Prédio Comercial',
    streetType: 'Avenida',
    street: 'Paulista',
    number: '1000',
    neighborhood: 'Bela Vista',
    zipCode: '01310-100',
    city: 'São Paulo',
    state: 'SP',
    country: 'Brasil',
    observations: 'Recepção do 15º andar'
  }
];

const CustomerAddresses = () => {
  const { id } = useParams();
  const [addresses, setAddresses] = useState(mockAddresses);
  const [editingAddress, setEditingAddress] = useState<number | null>(null);

  const residenceTypes = ['Casa', 'Apartamento', 'Condomínio', 'Sobrado', 'Kitnet', 'Prédio Comercial', 'Outro'];
  const streetTypes = ['Rua', 'Avenida', 'Travessa', 'Alameda', 'Estrada', 'Rodovia', 'Praça', 'Largo'];
  const states = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];

  const addAddress = (type: 'billing' | 'delivery') => {
    const newAddress = {
      id: Date.now(),
      type,
      name: type === 'billing' ? 'Novo Endereço de Cobrança' : 'Novo Endereço de Entrega',
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
    setEditingAddress(newAddress.id);
  };

  const removeAddress = (addressId: number) => {
    setAddresses(addresses.filter(addr => addr.id !== addressId));
    if (editingAddress === addressId) {
      setEditingAddress(null);
    }
  };

  const updateAddress = (addressId: number, field: string, value: string) => {
    setAddresses(addresses.map(addr => 
      addr.id === addressId ? { ...addr, [field]: value } : addr
    ));
  };

  const getAddressTypeCount = (type: 'billing' | 'delivery') => {
    return addresses.filter(addr => addr.type === type).length;
  };

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
            <h1 className="text-3xl font-bold text-foreground">Endereços</h1>
            <p className="text-muted-foreground">{mockCustomer.name} - {mockCustomer.customerId}</p>
          </div>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-elegant">
          <Save className="h-4 w-4 mr-2" />
          Salvar Alterações
        </Button>
      </div>

      {/* Address Requirements Notice */}
      <Card className="shadow-soft border-l-4 border-l-primary">
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <Home className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium text-foreground">Requisitos de Endereço</p>
              <p className="text-sm text-muted-foreground">
                É obrigatório pelo menos um endereço de cobrança e um endereço de entrega para cada cliente.
              </p>
              <div className="flex items-center space-x-4 mt-2 text-sm">
                <span className="text-muted-foreground">
                  Endereços de Cobrança: <strong>{getAddressTypeCount('billing')}</strong>
                </span>
                <span className="text-muted-foreground">
                  Endereços de Entrega: <strong>{getAddressTypeCount('delivery')}</strong>
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add New Address Buttons */}
      <div className="flex justify-center space-x-4">
        <Button onClick={() => addAddress('billing')} variant="outline" className="flex-1 max-w-xs">
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Endereço de Cobrança
        </Button>
        <Button onClick={() => addAddress('delivery')} variant="outline" className="flex-1 max-w-xs">
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Endereço de Entrega
        </Button>
      </div>

      {/* Addresses List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {addresses.map((address) => (
          <Card key={address.id} className="shadow-soft">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <CardTitle className="text-foreground">
                    {editingAddress === address.id ? (
                      <Input
                        value={address.name}
                        onChange={(e) => updateAddress(address.id, 'name', e.target.value)}
                        className="h-7 text-base font-semibold"
                      />
                    ) : (
                      address.name
                    )}
                  </CardTitle>
                  <Badge variant={address.type === 'billing' ? 'default' : 'secondary'}>
                    {address.type === 'billing' ? 'Cobrança' : 'Entrega'}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  {editingAddress === address.id ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingAddress(null)}
                    >
                      Concluir
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingAddress(address.id)}
                    >
                      Editar
                    </Button>
                  )}
                  {addresses.length > 2 && (
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
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {editingAddress === address.id ? (
                // Edit Mode
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Tipo de Residência *</Label>
                      <Select 
                        value={address.residenceType}
                        onValueChange={(value) => updateAddress(address.id, 'residenceType', value)}
                      >
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
                      <Select 
                        value={address.streetType}
                        onValueChange={(value) => updateAddress(address.id, 'streetType', value)}
                      >
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
                        value={address.street}
                        onChange={(e) => updateAddress(address.id, 'street', e.target.value)}
                        placeholder="Nome da rua"
                        className="bg-background border-border focus:ring-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Número *</Label>
                      <Input 
                        value={address.number}
                        onChange={(e) => updateAddress(address.id, 'number', e.target.value)}
                        placeholder="123"
                        className="bg-background border-border focus:ring-primary"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Bairro *</Label>
                      <Input 
                        value={address.neighborhood}
                        onChange={(e) => updateAddress(address.id, 'neighborhood', e.target.value)}
                        placeholder="Nome do bairro"
                        className="bg-background border-border focus:ring-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>CEP *</Label>
                      <Input 
                        value={address.zipCode}
                        onChange={(e) => updateAddress(address.id, 'zipCode', e.target.value)}
                        placeholder="00000-000"
                        className="bg-background border-border focus:ring-primary"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Cidade *</Label>
                      <Input 
                        value={address.city}
                        onChange={(e) => updateAddress(address.id, 'city', e.target.value)}
                        placeholder="Nome da cidade"
                        className="bg-background border-border focus:ring-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Estado *</Label>
                      <Select 
                        value={address.state}
                        onValueChange={(value) => updateAddress(address.id, 'state', value)}
                      >
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
                      value={address.country}
                      onChange={(e) => updateAddress(address.id, 'country', e.target.value)}
                      className="bg-background border-border focus:ring-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Observações</Label>
                    <Textarea 
                      value={address.observations}
                      onChange={(e) => updateAddress(address.id, 'observations', e.target.value)}
                      placeholder="Informações adicionais sobre este endereço..."
                      rows={2}
                      className="bg-background border-border focus:ring-primary resize-none"
                    />
                  </div>
                </>
              ) : (
                // View Mode
                <div className="space-y-2">
                  <p className="text-foreground">
                    <span className="font-medium">{address.residenceType}</span> - {address.streetType} {address.street}, {address.number}
                  </p>
                  <p className="text-muted-foreground">
                    {address.neighborhood}, {address.city} - {address.state}, {address.zipCode}
                  </p>
                  <p className="text-muted-foreground">{address.country}</p>
                  {address.observations && (
                    <p className="text-sm text-muted-foreground italic">
                      {address.observations}
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CustomerAddresses;
