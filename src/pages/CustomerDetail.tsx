import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, MapPin, Calendar, Package, DollarSign, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const mockCustomer = {
  id: 1,
  name: 'Emma Thompson',
  email: 'emma.thompson@email.com',
  phone: '+1 (555) 123-4567',
  address: '123 Literary Lane, Boston, MA 02101',
  status: 'Active',
  orders: 12,
  totalSpent: '$1,247.50',
  joinDate: '2023-01-15',
  lastOrder: '2024-01-15',
  notes: 'Prefers classic literature and poetry collections. Frequent customer with high-value orders.',
  preferences: ['Classic Literature', 'Poetry', 'Historical Fiction'],
  recentOrders: [
    { id: 1001, date: '2024-01-15', total: '$89.50', status: 'Completed' },
    { id: 1000, date: '2024-01-02', total: '$124.75', status: 'Completed' },
    { id: 999, date: '2023-12-18', total: '$67.30', status: 'Completed' }
  ]
};

const CustomerDetail = () => {
  const { id } = useParams();

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
            <p className="text-muted-foreground">Customer #{mockCustomer.id}</p>
          </div>
          <Badge 
            variant={mockCustomer.status === 'Active' ? 'default' : 'secondary'}
            className={mockCustomer.status === 'Active' 
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
              Edit Customer
            </Button>
          </Link>
          <Button variant="destructive" className="bg-destructive hover:bg-destructive/90">
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer Information */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-foreground">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium text-foreground">{mockCustomer.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium text-foreground">{mockCustomer.phone}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p className="font-medium text-foreground">{mockCustomer.address}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-foreground">Customer Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground leading-relaxed">{mockCustomer.notes}</p>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-foreground">Reading Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {mockCustomer.preferences.map((preference, index) => (
                  <Badge key={index} variant="outline" className="bg-accent/10 text-accent border-accent/30">
                    {preference}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats and Recent Orders */}
        <div className="space-y-6">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-foreground">Customer Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Package className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">Total Orders</span>
                </div>
                <span className="font-semibold text-foreground">{mockCustomer.orders}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-accent" />
                  <span className="text-muted-foreground">Total Spent</span>
                </div>
                <span className="font-semibold text-accent">{mockCustomer.totalSpent}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">Customer Since</span>
                </div>
                <span className="font-semibold text-foreground">{mockCustomer.joinDate}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">Last Order</span>
                </div>
                <span className="font-semibold text-foreground">{mockCustomer.lastOrder}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-foreground">Recent Orders</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockCustomer.recentOrders.map((order, index) => (
                <div key={order.id}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">#{order.id}</p>
                      <p className="text-sm text-muted-foreground">{order.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-accent">{order.total}</p>
                      <Badge variant="outline" className="text-xs bg-forest-green/10 text-forest-green border-forest-green/30">
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                  {index < mockCustomer.recentOrders.length - 1 && (
                    <Separator className="mt-3" />
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetail;