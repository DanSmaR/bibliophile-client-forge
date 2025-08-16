import { Link } from 'react-router-dom';
import { Plus, Search, MoreHorizontal, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const mockCustomers = [
  {
    id: 1,
    name: 'Emma Thompson',
    email: 'emma.thompson@email.com',
    phone: '+1 (555) 123-4567',
    address: '123 Literary Lane, Boston, MA',
    status: 'Active',
    orders: 12,
    totalSpent: '$1,247.50',
    joinDate: '2023-01-15'
  },
  {
    id: 2,
    name: 'James Wilson',
    email: 'james.wilson@email.com',
    phone: '+1 (555) 987-6543',
    address: '456 Novel Street, Portland, OR',
    status: 'Active',
    orders: 8,
    totalSpent: '$892.30',
    joinDate: '2023-03-22'
  },
  {
    id: 3,
    name: 'Sarah Martinez',
    email: 'sarah.martinez@email.com',
    phone: '+1 (555) 456-7890',
    address: '789 Poetry Ave, Austin, TX',
    status: 'Inactive',
    orders: 3,
    totalSpent: '$234.90',
    joinDate: '2023-06-10'
  },
  {
    id: 4,
    name: 'Michael Chen',
    email: 'michael.chen@email.com',
    phone: '+1 (555) 321-0987',
    address: '321 Fiction Blvd, Seattle, WA',
    status: 'Active',
    orders: 15,
    totalSpent: '$1,856.75',
    joinDate: '2022-11-08'
  }
];

const Customers = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Customers</h1>
          <p className="text-muted-foreground mt-1">Manage your bookstore customers</p>
        </div>
        <Link to="/customers/new">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-elegant">
            <Plus className="h-4 w-4 mr-2" />
            Add Customer
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
                placeholder="Search customers by name, email, or phone..."
                className="pl-10 bg-background border-border focus:ring-primary"
              />
            </div>
            <Button variant="outline" className="w-full sm:w-auto">
              Filter
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
                  <p className="text-sm text-muted-foreground">Customer #{customer.id}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge 
                    variant={customer.status === 'Active' ? 'default' : 'secondary'}
                    className={customer.status === 'Active' 
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
                  <p className="text-xs text-muted-foreground">Orders</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-accent">{customer.totalSpent}</p>
                  <p className="text-xs text-muted-foreground">Total Spent</p>
                </div>
              </div>

              <div className="flex space-x-2 pt-2">
                <Link to={`/customers/${customer.id}`} className="flex-1">
                  <Button variant="outline" size="sm" className="w-full">
                    View Details
                  </Button>
                </Link>
                <Link to={`/customers/${customer.id}/edit`} className="flex-1">
                  <Button variant="default" size="sm" className="w-full bg-primary hover:bg-primary/90">
                    Edit
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