# Sales Leaderboard Backend

Simple REST API for tracking sales and ranking agents.

## Setup
```bash
npm install
npm run dev
```

Runs on port 3000.

## How to use

**Add sales data:**
POST to `/api/sales` with:
```json
{
  "agentName": "Ram Sharma",
  "amountSold": 500000,
  "numberOfSales": 12
}
```

**Get leaderboard:**
GET `/api/leaderboard`

Returns agents ranked by total sales.

## The logic

- Sales data gets stored in an array
- If agent already exists, their numbers get added together
- Leaderboard sorts by total sales amount (high to low)
- Rank is just the position in sorted array

## Stack

Node.js + Express. That's it. Keeping it simple.

## Testing

Used Thunder Client. Works fine locally, tested with a few agents.

## What's next

Need to deploy this and push to GitHub. Also might add some input validation for edge cases.

Built for Nest Nepal internship task.
## Live Deployment

**API Base URL**: https://sales-leaderboard-pbdt.onrender.com

**Endpoints:**
- Health Check: `GET https://sales-leaderboard-pbdt.onrender.com/`
- Add Sales Data: `POST https://sales-leaderboard-pbdt.onrender.com/api/sales`
- Get Leaderboard: `GET https://sales-leaderboard-pbdt.onrender.com/api/leaderboard`

**Test the API:**
```bash
# Get leaderboard
curl https://sales-leaderboard-pbdt.onrender.com/api/leaderboard

# Add sales data
curl -X POST https://sales-leaderboard-pbdt.onrender.com/api/sales \
  -H "Content-Type: application/json" \
  -d '{"agentName":"Test User","amountSold":100000,"numberOfSales":5}'
```

Note: Free tier may take 30 seconds to wake up on first request.

