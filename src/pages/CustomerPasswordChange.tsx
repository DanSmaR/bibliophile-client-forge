import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Eye, EyeOff, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

const mockCustomer = {
  id: 1,
  customerId: 'CLI-001',
  name: 'Ana Silva'
};

const CustomerPasswordChange = () => {
  const { id } = useParams();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
            <h1 className="text-3xl font-bold text-foreground">Alterar Senha</h1>
            <p className="text-muted-foreground">{mockCustomer.name} - {mockCustomer.customerId}</p>
          </div>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-elegant">
          <Save className="h-4 w-4 mr-2" />
          Salvar Nova Senha
        </Button>
      </div>

      <div className="max-w-md mx-auto">
        <Card className="shadow-soft">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-primary" />
              <CardTitle className="text-foreground">Alteração de Senha</CardTitle>
            </div>
            <p className="text-sm text-muted-foreground">
              A nova senha deve atender aos critérios de segurança estabelecidos
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Current Password */}
            <div className="space-y-2">
              <Label htmlFor="currentPassword" className="text-foreground">
                Senha Atual *
              </Label>
              <div className="relative">
                <Input 
                  id="currentPassword" 
                  type={showCurrentPassword ? "text" : "password"}
                  placeholder="Digite a senha atual"
                  className="bg-background border-border focus:ring-primary pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>

            {/* New Password */}
            <div className="space-y-2">
              <Label htmlFor="newPassword" className="text-foreground">
                Nova Senha *
              </Label>
              <div className="relative">
                <Input 
                  id="newPassword" 
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Digite a nova senha"
                  className="bg-background border-border focus:ring-primary pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>

            {/* Confirm New Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmNewPassword" className="text-foreground">
                Confirmar Nova Senha *
              </Label>
              <div className="relative">
                <Input 
                  id="confirmNewPassword" 
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Digite a nova senha novamente"
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

            {/* Password Requirements */}
            <div className="bg-muted/50 p-4 rounded-lg space-y-3">
              <h4 className="font-medium text-foreground">Requisitos da Senha:</h4>
              <div className="text-xs text-muted-foreground space-y-1">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                  <span>Pelo menos 8 caracteres</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                  <span>Pelo menos uma letra maiúscula (A-Z)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                  <span>Pelo menos uma letra minúscula (a-z)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                  <span>Pelo menos um caractere especial (!@#$%^&*)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                  <span>As senhas devem ser idênticas</span>
                </div>
              </div>
            </div>

            {/* Security Notice */}
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
              <div className="flex items-start space-x-2">
                <Shield className="h-4 w-4 text-blue-600 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-blue-800">Segurança da Senha</p>
                  <p className="text-blue-700">
                    A senha será criptografada e armazenada de forma segura. 
                    Recomendamos o uso de senhas únicas e fortes para proteger a conta do cliente.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-4">
              <Link to={`/customers/${id}`} className="flex-1">
                <Button variant="outline" className="w-full">
                  Cancelar
                </Button>
              </Link>
              <Button className="flex-1 bg-primary hover:bg-primary/90">
                <Save className="h-4 w-4 mr-2" />
                Salvar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CustomerPasswordChange;
