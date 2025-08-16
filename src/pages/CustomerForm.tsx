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
    name: 'Emma Thompson',
    email: 'emma.thompson@email.com',
    phone: '+1 (555) 123-4567',
    address: '123 Literary Lane',
    city: 'Boston',
    state: 'MA',
    zipCode: '02101',
    status: 'Active',
    notes: 'Prefers classic literature and poetry collections. Frequent customer with high-value orders.',
    preferences: ['Classic Literature', 'Poetry']
  } : {};

  const genres = [
    'Classic Literature',
    'Contemporary Fiction',
    'Mystery & Thriller',
    'Science Fiction',
    'Fantasy',
    'Romance',
    'Poetry',
    'Non-Fiction',
    'Biography',
    'History',
    'Philosophy',
    'Self-Help'
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
              {isEdit ? 'Edit Customer' : 'Add New Customer'}
            </h1>
            <p className="text-muted-foreground">
              {isEdit ? 'Update customer information' : 'Create a new customer profile'}
            </p>
          </div>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-elegant">
          <Save className="h-4 w-4 mr-2" />
          {isEdit ? 'Update Customer' : 'Save Customer'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-foreground">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground">Full Name *</Label>
                  <Input 
                    id="name" 
                    defaultValue={mockData.name} 
                    placeholder="Enter customer's full name"
                    className="bg-background border-border focus:ring-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">Email Address *</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    defaultValue={mockData.email}
                    placeholder="customer@email.com"
                    className="bg-background border-border focus:ring-primary"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-foreground">Phone Number</Label>
                  <Input 
                    id="phone" 
                    defaultValue={mockData.phone}
                    placeholder="+1 (555) 123-4567"
                    className="bg-background border-border focus:ring-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status" className="text-foreground">Status</Label>
                  <Select defaultValue={mockData.status || "Active"}>
                    <SelectTrigger className="bg-background border-border">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                      <SelectItem value="Suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-foreground">Address Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address" className="text-foreground">Street Address</Label>
                <Input 
                  id="address" 
                  defaultValue={mockData.address}
                  placeholder="123 Main Street"
                  className="bg-background border-border focus:ring-primary"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city" className="text-foreground">City</Label>
                  <Input 
                    id="city" 
                    defaultValue={mockData.city}
                    placeholder="City"
                    className="bg-background border-border focus:ring-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state" className="text-foreground">State</Label>
                  <Input 
                    id="state" 
                    defaultValue={mockData.state}
                    placeholder="State"
                    className="bg-background border-border focus:ring-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode" className="text-foreground">ZIP Code</Label>
                  <Input 
                    id="zipCode" 
                    defaultValue={mockData.zipCode}
                    placeholder="12345"
                    className="bg-background border-border focus:ring-primary"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-foreground">Additional Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="notes" className="text-foreground">Customer Notes</Label>
                <Textarea 
                  id="notes" 
                  defaultValue={mockData.notes}
                  placeholder="Add any additional notes about this customer..."
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
              <CardTitle className="text-foreground">Reading Preferences</CardTitle>
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
              <CardTitle className="text-foreground">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                disabled={!isEdit}
              >
                Send Welcome Email
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                disabled={!isEdit}
              >
                View Order History
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                disabled={!isEdit}
              >
                Generate Report
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CustomerForm;