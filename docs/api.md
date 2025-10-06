# Bubbles News API Documentation

The Bubbles API provides endpoints for news aggregation, AI-powered summarization, and bias detection. This RESTful API serves as the backbone for the Bubbles News platform.

## Base URL

```
Production: https://api.bubblesnews.app
Development: http://localhost:5000
```

## Authentication

Currently, the API is publicly accessible for demo purposes. Future versions will implement OAuth authentication for personalized features.

## Core Endpoints

### Articles

#### GET /api/articles
Retrieve processed news articles with summaries and bias scores.

**Query Parameters:**
- `limit` (number, optional): Number of articles to return (default: 20, max: 100)
- `offset` (number, optional): Pagination offset (default: 0)
- `status` (string, optional): Filter by processing status (`ready`, `processing`, `unprocessed`)
- `bias` (string, optional): Filter by bias category (`left`, `neutral`, `right`)
- `source` (string, optional): Filter by news source

**Response:**
```json
{
  "success": true,
  "data": {
    "articles": [
      {
        "_id": "64f8c9b8d123456789abcdef",
        "title": "AI Advances in News Processing",
        "content": "Full article content...",
        "url": "https://example.com/article",
        "publishedAt": "2024-10-06T10:00:00Z",
        "source": {
          "name": "Tech News Daily",
          "url": "https://technewsdaily.com"
        },
        "summary": "AI technology is revolutionizing how news is processed and consumed...",
        "biasScore": 0.1,
        "biasLabel": "slightly_right",
        "status": "ready",
        "timelineGroup": "ai_technology_2024",
        "createdAt": "2024-10-06T09:00:00Z",
        "updatedAt": "2024-10-06T09:30:00Z"
      }
    ],
    "pagination": {
      "total": 150,
      "limit": 20,
      "offset": 0,
      "hasMore": true
    }
  }
}
```

#### GET /api/articles/:id
Retrieve a specific article by ID.

**Parameters:**
- `id` (string): MongoDB ObjectId of the article

**Response:**
```json
{
  "success": true,
  "data": {
    "article": {
      "_id": "64f8c9b8d123456789abcdef",
      "title": "Article Title",
      "content": "Full article content...",
      "url": "https://example.com/article",
      "summary": "AI-generated summary...",
      "biasScore": -0.3,
      "biasLabel": "left_leaning",
      "relatedArticles": ["64f8c9b8d123456789abcde0", "64f8c9b8d123456789abcde1"]
    }
  }
}
```

### Timeline

#### GET /api/timeline/:group
Retrieve articles grouped by timeline.

**Parameters:**
- `group` (string): Timeline group identifier

**Response:**
```json
{
  "success": true,
  "data": {
    "timelineGroup": "ai_technology_2024",
    "articles": [
      {
        "_id": "64f8c9b8d123456789abcdef",
        "title": "Article Title",
        "summary": "Brief summary...",
        "publishedAt": "2024-10-06T10:00:00Z",
        "biasScore": 0.1
      }
    ],
    "totalArticles": 5
  }
}
```

### AI Processing Endpoints (Internal Use)

#### POST /api/ai/summarize
Generate a summary for article content.

**Request Body:**
```json
{
  "content": "Full article text to summarize...",
  "maxLength": 5
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "summary": "Generated summary text...",
    "model": "gpt-4-turbo",
    "confidence": 0.95
  }
}
```

#### POST /api/ai/bias-detect
Detect ideological bias in article content.

**Request Body:**
```json
{
  "content": "Article content to analyze...",
  "title": "Article title"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "biasScore": 0.2,
    "biasLabel": "slightly_right",
    "confidence": 0.87,
    "explanation": "Analysis indicates slight conservative lean based on language patterns"
  }
}
```

## Data Models

### Article Schema
```javascript
{
  _id: ObjectId,
  title: String,
  content: String,
  url: String,
  publishedAt: Date,
  source: {
    name: String,
    url: String
  },
  summary: String,           // AI-generated summary
  biasScore: Number,         // -1 to 1 scale
  biasLabel: String,         // left, neutral, right, etc.
  status: String,            // unprocessed, processing, ready
  timelineGroup: String,     // For timeline clustering
  createdAt: Date,
  updatedAt: Date
}
```

### Bias Score Scale
- `-1.0 to -0.6`: Strong left bias
- `-0.5 to -0.2`: Left leaning
- `-0.1 to 0.1`: Neutral
- `0.2 to 0.5`: Right leaning  
- `0.6 to 1.0`: Strong right bias

## Rate Limiting

- **Development**: No rate limiting
- **Production**: 100 requests per 15 minutes per IP
- **API Key**: 1000 requests per hour (future implementation)
## Error Responses

All endpoints may return the following error responses:

**400 Bad Request:**
```json
{
  "success": false,
  "error": "Invalid request parameters",
  "details": "Specific error details here"
}
```

**404 Not Found:**
```json
{
  "success": false,
  "error": "Resource not found",
  "message": "Article with specified ID does not exist"
}
```

**429 Too Many Requests:**
```json
{
  "success": false,
  "error": "Rate limit exceeded",
  "retryAfter": 900
}
```

**500 Internal Server Error:**
```json
{
  "success": false,
  "error": "Internal server error",
  "message": "An unexpected error occurred"
}
```

## Status Codes

- `200`: Success
- `400`: Bad Request - Invalid parameters
- `404`: Not Found - Resource doesn't exist
- `429`: Too Many Requests - Rate limit exceeded
- `500`: Internal Server Error - Server issue

## Example Usage

### Fetch Latest Articles
```bash
curl -X GET "https://api.bubblesnews.app/api/articles?limit=10&status=ready"
```

### Get Specific Article
```bash
curl -X GET "https://api.bubblesnews.app/api/articles/64f8c9b8d123456789abcdef"
```

### Filter by Bias
```bash
curl -X GET "https://api.bubblesnews.app/api/articles?bias=neutral&limit=5"
```
  "error": "Resource not found"
}
```

**500 Internal Server Error:**
```json
{
  "success": false,
  "error": "Internal server error"
}
```