# Social Media API Integration Guide

## Overview

This sentiment analysis platform supports fetching real comments from multiple social media platforms. This guide explains how to integrate with each platform's API.

## Important Note

⚠️ **Demo Mode**: The platform currently runs in demo mode with simulated data. To enable real comment fetching, follow the instructions below for your target platform(s).

## Supported Platforms

1. Instagram
2. Twitter / X
3. Facebook
4. LinkedIn
5. YouTube

---

## Instagram API Integration

### Prerequisites
- Facebook Developer Account
- Instagram Business or Creator Account
- App registered on Meta for Developers

### Setup Steps

1. **Create Facebook App**
   - Go to [developers.facebook.com](https://developers.facebook.com)
   - Create a new app and select "Business" type
   - Add Instagram product to your app

2. **Get Access Token**
   ```bash
   # Basic Display API endpoint
   https://graph.instagram.com/me/media
   
   # Required Permissions:
   - instagram_basic
   - instagram_manage_comments
   - pages_read_engagement
   ```

3. **Fetch Comments**
   ```javascript
   // Example API call
   const response = await fetch(
     `https://graph.instagram.com/me/media?fields=comments{text,username,timestamp,like_count}&access_token=${accessToken}`
   );
   ```

4. **Implementation Location**
   - Update `/components/SocialMediaAPIConnector.tsx`
   - Replace mock data in `handleConnect` function with real API calls

### Rate Limits
- 200 calls per hour per user
- 4800 calls per day per app

---

## Twitter / X API Integration

### Prerequisites
- Twitter Developer Account (Elevated Access recommended)
- App created in Developer Portal
- API Key, API Secret, and Bearer Token

### Setup Steps

1. **Apply for Developer Account**
   - Visit [developer.twitter.com](https://developer.twitter.com)
   - Apply for Elevated Access for better rate limits
   - Create a new Project and App

2. **Generate Credentials**
   ```bash
   # API v2 endpoint for tweet replies
   https://api.twitter.com/2/tweets/{tweet_id}/replies
   
   # Required Authentication:
   - Bearer Token (for app-only auth)
   - OR OAuth 2.0 (for user context)
   ```

3. **Fetch Tweet Replies**
   ```javascript
   // Example API call
   const response = await fetch(
     `https://api.twitter.com/2/tweets/${tweetId}?expansions=author_id&tweet.fields=public_metrics`,
     {
       headers: {
         'Authorization': `Bearer ${bearerToken}`
       }
     }
   );
   ```

4. **Search Recent Mentions**
   ```javascript
   // Get mentions of a user
   const response = await fetch(
     `https://api.twitter.com/2/tweets/search/recent?query=@${username}&max_results=100`,
     {
       headers: {
         'Authorization': `Bearer ${bearerToken}`
       }
     }
   );
   ```

### Rate Limits
- Free Tier: 500,000 tweets/month
- Basic: 10,000 tweets/month
- Elevated: 2,000,000 tweets/month

---

## Facebook API Integration

### Prerequisites
- Facebook Developer Account
- Page Access Token
- App with appropriate permissions

### Setup Steps

1. **Create Facebook App**
   - Go to [developers.facebook.com](https://developers.facebook.com)
   - Create Business app
   - Add Facebook Login and Graph API products

2. **Get Page Access Token**
   ```bash
   # Graph API endpoint for post comments
   https://graph.facebook.com/v18.0/{post-id}/comments
   
   # Required Permissions:
   - pages_read_engagement
   - pages_read_user_content
   ```

3. **Fetch Post Comments**
   ```javascript
   // Example API call
   const response = await fetch(
     `https://graph.facebook.com/v18.0/${postId}/comments?fields=message,from,created_time,like_count,comment_count&access_token=${pageAccessToken}`
   );
   ```

### Rate Limits
- 200 calls per hour per user
- Varies based on app usage level

---

## YouTube API Integration

### Prerequisites
- Google Cloud Project
- YouTube Data API v3 enabled
- API Key or OAuth 2.0 credentials

### Setup Steps

1. **Enable YouTube Data API**
   - Go to [console.cloud.google.com](https://console.cloud.google.com)
   - Create or select a project
   - Enable YouTube Data API v3
   - Create credentials (API Key for public data, OAuth for user data)

2. **Fetch Video Comments**
   ```javascript
   // Example API call
   const response = await fetch(
     `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${apiKey}&maxResults=100`
   );
   ```

3. **Parse Comment Data**
   ```javascript
   // Response structure
   {
     items: [
       {
         snippet: {
           topLevelComment: {
             snippet: {
               textDisplay: "comment text",
               authorDisplayName: "username",
               likeCount: 5,
               publishedAt: "2024-01-01T00:00:00Z"
             }
           }
         }
       }
     ]
   }
   ```

### Rate Limits
- 10,000 quota units per day (default)
- Each read operation costs 1-5 units

---

## LinkedIn API Integration

### Prerequisites
- LinkedIn Developer Account
- LinkedIn App created
- OAuth 2.0 credentials

### Setup Steps

1. **Create LinkedIn App**
   - Visit [linkedin.com/developers](https://www.linkedin.com/developers)
   - Create a new app
   - Request access to Social Actions API

2. **OAuth 2.0 Flow**
   ```bash
   # Required Scopes:
   - r_liteprofile
   - w_member_social
   - r_organization_social (for company pages)
   ```

3. **Fetch Post Comments**
   ```javascript
   // Example API call
   const response = await fetch(
     `https://api.linkedin.com/v2/socialActions/${shareUrn}/comments`,
     {
       headers: {
         'Authorization': `Bearer ${accessToken}`,
         'X-Restli-Protocol-Version': '2.0.0'
       }
     }
   );
   ```

### Rate Limits
- Varies by API endpoint and partner tier
- Throttled at application level

---

## Implementation Guide

### Step 1: Environment Variables

Create a `.env` file in your project root:

```env
# Instagram
INSTAGRAM_ACCESS_TOKEN=your_instagram_token

# Twitter
TWITTER_BEARER_TOKEN=your_twitter_bearer_token

# Facebook
FACEBOOK_PAGE_ACCESS_TOKEN=your_facebook_token

# YouTube
YOUTUBE_API_KEY=your_youtube_api_key

# LinkedIn
LINKEDIN_CLIENT_ID=your_linkedin_client_id
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret
```

### Step 2: Update API Connector

In `/components/SocialMediaAPIConnector.tsx`, replace the mock implementation:

```typescript
const handleConnect = async () => {
  setIsConnecting(true);
  setError('');

  try {
    let comments: Comment[] = [];

    switch (platform) {
      case 'instagram':
        comments = await fetchInstagramComments(apiKey, username);
        break;
      case 'twitter':
        comments = await fetchTwitterComments(apiKey, username);
        break;
      case 'facebook':
        comments = await fetchFacebookComments(apiKey, username);
        break;
      case 'youtube':
        comments = await fetchYouTubeComments(apiKey, username);
        break;
      case 'linkedin':
        comments = await fetchLinkedInComments(apiKey, username);
        break;
    }

    setIsConnected(true);
    onFetchComplete(comments);
  } catch (err) {
    setError(err.message);
  } finally {
    setIsConnecting(false);
  }
};
```

### Step 3: Create API Service Functions

Create a new file `/services/socialMediaAPI.ts`:

```typescript
export async function fetchInstagramComments(accessToken: string, username: string) {
  // Implementation
}

export async function fetchTwitterComments(bearerToken: string, username: string) {
  // Implementation
}

export async function fetchFacebookComments(pageToken: string, username: string) {
  // Implementation
}

export async function fetchYouTubeComments(apiKey: string, videoId: string) {
  // Implementation
}

export async function fetchLinkedInComments(accessToken: string, postUrn: string) {
  // Implementation
}
```

### Step 4: Handle Errors and Edge Cases

```typescript
// Implement retry logic
async function fetchWithRetry(url: string, options: RequestInit, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);
      if (response.ok) return response.json();
      if (response.status === 429) {
        // Rate limited - wait and retry
        await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
        continue;
      }
      throw new Error(`API Error: ${response.status}`);
    } catch (err) {
      if (i === retries - 1) throw err;
    }
  }
}
```

---

## Security Best Practices

1. **Never Commit API Keys**
   - Use environment variables
   - Add `.env` to `.gitignore`

2. **Use Backend Proxy**
   - Don't expose API keys in frontend
   - Create a backend service to proxy requests

3. **Token Refresh**
   - Implement OAuth refresh token flow
   - Handle expired tokens gracefully

4. **Rate Limiting**
   - Implement client-side rate limiting
   - Cache responses when appropriate

5. **Data Privacy**
   - Follow platform terms of service
   - Don't store user data without consent
   - Implement data retention policies

---

## Testing

### Test with Mock Data First
The platform includes comprehensive mock data for testing without API credentials.

### API Testing Checklist
- [ ] Successfully authenticate with each platform
- [ ] Fetch comments from recent posts
- [ ] Handle pagination for large comment sets
- [ ] Parse emoji and special characters correctly
- [ ] Handle rate limit errors gracefully
- [ ] Test with private/public accounts
- [ ] Verify sentiment analysis accuracy

---

## Troubleshooting

### Common Issues

**Issue: "Invalid Access Token"**
- Solution: Regenerate token and ensure required permissions

**Issue: "Rate Limit Exceeded"**
- Solution: Implement exponential backoff, upgrade API tier

**Issue: "Comments Not Appearing"**
- Solution: Check post privacy settings, verify API permissions

**Issue: "CORS Error"**
- Solution: Use backend proxy or configure CORS headers

---

## Cost Considerations

| Platform | Free Tier | Paid Plans |
|----------|-----------|------------|
| Instagram | Limited | Meta Business Suite |
| Twitter | Basic (deprecated) | $100-$5000/month |
| Facebook | Limited | Usage-based |
| YouTube | 10k quota/day | Request increase |
| LinkedIn | Varies | Partner program |

---

## Additional Resources

- [Meta for Developers](https://developers.facebook.com)
- [Twitter Developer Platform](https://developer.twitter.com)
- [YouTube Data API](https://developers.google.com/youtube/v3)
- [LinkedIn Developers](https://www.linkedin.com/developers/)

---

## Support

For implementation assistance or questions:
1. Check platform-specific documentation
2. Review error logs in browser console
3. Test API endpoints using Postman or curl
4. Verify permissions and scopes

---

**Last Updated:** September 30, 2025