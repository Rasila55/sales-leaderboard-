const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// In-memory storage for sales data
let salesData = [];

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Sales Leaderboard API is running!' });
});

// POST endpoint - Add sales data
app.post('/api/sales', (req, res) => {
  const { agentName, amountSold, numberOfSales } = req.body;
  
  // Validate input
  if (!agentName || !amountSold || !numberOfSales) {
    return res.status(400).json({ 
      error: 'Please provide agentName, amountSold, and numberOfSales' 
    });
  }
  
  // Check if agent already exists
  const existingAgent = salesData.find(agent => agent.agentName === agentName);
  
  if (existingAgent) {
    // Update existing agent
    existingAgent.amountSold += amountSold;
    existingAgent.numberOfSales += numberOfSales;
  } else {
    // Add new agent
    salesData.push({
      agentName,
      amountSold,
      numberOfSales
    });
  }
  
  res.status(201).json({ 
    message: 'Sales data added successfully',
    data: { agentName, amountSold, numberOfSales }
  });
});

// GET endpoint - Get leaderboard
app.get('/api/leaderboard', (req, res) => {
  // Sort by amountSold in descending order
  const leaderboard = salesData
    .sort((a, b) => b.amountSold - a.amountSold)
    .map((agent, index) => ({
      rank: index + 1,
      agentName: agent.agentName,
      totalSales: agent.amountSold,
      totalDeals: agent.numberOfSales
    }));
  
  res.json({
    totalAgents: leaderboard.length,
    totalSalesAmount: salesData.reduce((sum, agent) => sum + agent.amountSold, 0),
    leaderboard
  });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});