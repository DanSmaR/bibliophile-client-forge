import { Link } from 'react-router-dom';
import { Users, BookOpen, TrendingUp, Package } from 'lucide-react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Index = () => {
  const stats = [
    { title: 'Total Customers', value: '1,247', icon: Users, color: 'text-primary' },
    { title: 'Books Sold', value: '8,543', icon: BookOpen, color: 'text-accent' },
    { title: 'Revenue', value: '$45,291', icon: TrendingUp, color: 'text-forest-green' },
    { title: 'Active Orders', value: '23', icon: Package, color: 'text-sage-green' }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          BookStore Admin Dashboard
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Manage your literary empire with elegance. Track customers, monitor sales, and grow your bookstore business.
        </p>
        <div className="mt-8">
          <Link to="/customers">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-elegant">
              <Users className="h-5 w-5 mr-2" />
              Manage Customers
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="shadow-soft hover:shadow-elegant transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  </div>
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-foreground">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <span className="text-foreground">New customer registered</span>
              <span className="text-sm text-muted-foreground">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-foreground">Order #1245 completed</span>
              <span className="text-sm text-muted-foreground">4 hours ago</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-foreground">Customer updated profile</span>
              <span className="text-sm text-muted-foreground">6 hours ago</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-foreground">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link to="/customers/new" className="block">
              <Button variant="outline" className="w-full justify-start">
                <Users className="h-4 w-4 mr-2" />
                Add New Customer
              </Button>
            </Link>
            <Link to="/customers" className="block">
              <Button variant="outline" className="w-full justify-start">
                <BookOpen className="h-4 w-4 mr-2" />
                View All Customers
              </Button>
            </Link>
            <Button variant="outline" className="w-full justify-start" disabled>
              <Package className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
