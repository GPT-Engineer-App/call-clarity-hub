import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const initialCalls = [
  { id: 1, phoneNumber: '123-456-7890', contactName: 'John Doe', companyName: 'ABC Corp', salesAgent: 'Alice', ticketNumber: 'T001' },
  { id: 2, phoneNumber: '234-567-8901', contactName: 'Jane Smith', companyName: 'XYZ Inc', salesAgent: 'Bob', ticketNumber: 'T002' },
  { id: 3, phoneNumber: '345-678-9012', contactName: 'Mike Johnson', companyName: '123 LLC', salesAgent: 'Charlie', ticketNumber: 'T003' },
  // Add more initial data as needed
];

const Index = () => {
  const [calls, setCalls] = useState(initialCalls);
  const [newCall, setNewCall] = useState({ phoneNumber: '', contactName: '', companyName: '', salesAgent: '', ticketNumber: '' });
  const [filterAgent, setFilterAgent] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCall(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCalls(prev => [...prev, { ...newCall, id: prev.length + 1 }]);
    setNewCall({ phoneNumber: '', contactName: '', companyName: '', salesAgent: '', ticketNumber: '' });
  };

  const filteredCalls = filterAgent 
    ? calls.filter(call => call.salesAgent === filterAgent) 
    : calls;

  const uniqueAgents = [...new Set(calls.map(call => call.salesAgent))];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Incoming Calls Dashboard</h1>

      <Card className="mb-6">
        <CardHeader>Add New Call</CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input name="phoneNumber" value={newCall.phoneNumber} onChange={handleInputChange} placeholder="Phone Number" required />
            <Input name="contactName" value={newCall.contactName} onChange={handleInputChange} placeholder="Contact Name" required />
            <Input name="companyName" value={newCall.companyName} onChange={handleInputChange} placeholder="Company Name" required />
            <Input name="salesAgent" value={newCall.salesAgent} onChange={handleInputChange} placeholder="Sales Agent" required />
            <Input name="ticketNumber" value={newCall.ticketNumber} onChange={handleInputChange} placeholder="Ticket Number" required />
            <Button type="submit">Add Call</Button>
          </form>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>Filter by Sales Agent</CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Select value={filterAgent} onValueChange={setFilterAgent}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Sales Agent" />
              </SelectTrigger>
              <SelectContent>
                {uniqueAgents.map(agent => (
                  <SelectItem key={agent} value={agent}>{agent}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={() => setFilterAgent(null)} variant="outline">Clear Filter</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>Incoming Calls</CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Phone Number</TableHead>
                  <TableHead>Contact Name</TableHead>
                  <TableHead>Company Name</TableHead>
                  <TableHead>Sales Agent</TableHead>
                  <TableHead>Ticket Number</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCalls.map(call => (
                  <TableRow key={call.id}>
                    <TableCell>{call.phoneNumber}</TableCell>
                    <TableCell>{call.contactName}</TableCell>
                    <TableCell>{call.companyName}</TableCell>
                    <TableCell>{call.salesAgent}</TableCell>
                    <TableCell>{call.ticketNumber}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;