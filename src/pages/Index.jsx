const [filterAgent, setFilterAgent] = useState(null);

// ... (other code remains the same)

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

// ... (other code remains the same)

const filteredCalls = filterAgent 
  ? calls.filter(call => call.salesAgent === filterAgent) 
  : calls;