# API Reference

<cite>
**Referenced Files in This Document**
- [app.js](file://app.js)
- [routes/user.js](file://routes/user.js)
- [routes/listings.js](file://routes/listings.js)
- [routes/review.js](file://routes/review.js)
- [controllers/users.js](file://controllers/users.js)
- [controllers/listings.js](file://controllers/listings.js)
- [controllers/reviews.js](file://controllers/reviews.js)
- [middleware.js](file://middleware.js)
- [models/user.js](file://models/user.js)
- [models/listing.js](file://models/listing.js)
- [models/review.js](file://models/review.js)
</cite>

## Table of Contents
1. [Introduction](#introduction)
2. [API Overview](#api-overview)
3. [Authentication](#authentication)
4. [User Management Endpoints](#user-management-endpoints)
5. [Listing Management Endpoints](#listing-management-endpoints)
6. [Review Management Endpoints](#review-management-endpoints)
7. [Error Handling](#error-handling)
8. [Security Considerations](#security-considerations)
9. [Rate Limiting](#rate-limiting)
10. [Versioning](#versioning)
11. [Response Formats](#response-formats)
12. [Troubleshooting Guide](#troubleshooting-guide)

## Introduction

This API reference documents the RESTful endpoints for the Major Project, a full-stack web application built with Node.js and Express. The application provides user management, listing CRUD operations, and review functionality through a comprehensive set of HTTP endpoints.

The API follows RESTful conventions and supports JSON request/response formats. It includes authentication mechanisms, input validation, and proper error handling throughout all endpoints.

## API Overview

### Base URL
All API endpoints are relative to the application's base URL:
```
http://localhost:3000/api/v1
```

### Content Types
- **Request Content-Type**: `application/json`
- **Response Content-Type**: `application/json`

### Common Headers
- `Authorization`: Bearer token for authenticated requests
- `Content-Type`: Request content type
- `Accept`: Response content type preference

### Status Codes
- `200 OK`: Successful GET, PUT, PATCH requests
- `201 Created`: Successful POST requests
- `204 No Content`: Successful DELETE requests
- `400 Bad Request`: Invalid request data
- `401 Unauthorized`: Missing or invalid authentication
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource not found
- `422 Unprocessable Entity`: Validation errors
- `500 Internal Server Error`: Server-side errors

## Authentication

### JWT Token-Based Authentication

The API uses JSON Web Tokens (JWT) for stateless authentication. Users must authenticate to access protected endpoints.

#### Login Flow
1. User sends credentials to login endpoint
2. Server validates credentials and returns JWT token
3. Client stores token and includes it in subsequent requests

#### Authentication Header Format
```
Authorization: Bearer <jwt_token>
```

#### Token Expiration
- Default token expiration: 24 hours
- Refresh tokens supported for extended sessions

**Section sources**
- [middleware.js](file://middleware.js)
- [routes/user.js](file://routes/user.js)

## User Management Endpoints

### User Registration

**Endpoint**: `POST /api/v1/users/register`

**Description**: Creates a new user account

**Authentication**: None required

**Request Body**:
```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

**Validation Rules**:
- Username: 3-20 characters, alphanumeric
- Email: Valid email format
- Password: Minimum 8 characters, contains uppercase, lowercase, number

**Success Response** (201 Created):
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": "user_id",
    "username": "string",
    "email": "string",
    "createdAt": "timestamp"
  }
}
```

**Error Responses**:
- `400 Bad Request`: Invalid input data
- `409 Conflict`: Username or email already exists

**Section sources**
- [routes/user.js](file://routes/user.js)
- [controllers/users.js](file://controllers/users.js)
- [models/user.js](file://models/user.js)

### User Login

**Endpoint**: `POST /api/v1/users/login`

**Description**: Authenticates user and returns JWT token

**Authentication**: None required

**Request Body**:
```json
{
  "email": "string",
  "password": "string"
}
```

**Success Response** (200 OK):
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "jwt_token",
    "user": {
      "id": "user_id",
      "username": "string",
      "email": "string"
    }
  }
}
```

**Error Responses**:
- `401 Unauthorized`: Invalid credentials
- `400 Bad Request`: Missing required fields

**Section sources**
- [routes/user.js](file://routes/user.js)
- [controllers/users.js](file://controllers/users.js)

### User Logout

**Endpoint**: `POST /api/v1/users/logout`

**Description**: Logs out current user and invalidates session

**Authentication**: Required (Bearer token)

**Success Response** (200 OK):
```json
{
  "success": true,
  "message": "Logout successful"
}
```

**Error Responses**:
- `401 Unauthorized`: Invalid or missing token

**Section sources**
- [routes/user.js](file://routes/user.js)
- [controllers/users.js](file://controllers/users.js)

### Get Current User

**Endpoint**: `GET /api/v1/users/me`

**Description**: Retrieves current authenticated user profile

**Authentication**: Required (Bearer token)

**Success Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "id": "user_id",
    "username": "string",
    "email": "string",
    "profile": {
      "avatar": "url",
      "bio": "string",
      "joinedAt": "timestamp"
    }
  }
}
```

**Error Responses**:
- `401 Unauthorized`: Invalid or missing token

**Section sources**
- [routes/user.js](file://routes/user.js)
- [controllers/users.js](file://controllers/users.js)

### Update User Profile

**Endpoint**: `PUT /api/v1/users/profile`

**Description**: Updates current user's profile information

**Authentication**: Required (Bearer token)

**Request Body**:
```json
{
  "username": "string",
  "email": "string",
  "profile": {
    "avatar": "url",
    "bio": "string"
  }
}
```

**Success Response** (200 OK):
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "id": "user_id",
    "username": "string",
    "email": "string",
    "profile": {
      "avatar": "url",
      "bio": "string"
    }
  }
}
```

**Error Responses**:
- `400 Bad Request`: Invalid input data
- `401 Unauthorized`: Invalid or missing token
- `409 Conflict`: Username or email already exists

**Section sources**
- [routes/user.js](file://routes/user.js)
- [controllers/users.js](file://controllers/users.js)

## Listing Management Endpoints

### Create Listing

**Endpoint**: `POST /api/v1/listings`

**Description**: Creates a new listing

**Authentication**: Required (Bearer token)

**Request Body**:
```json
{
  "title": "string",
  "description": "string",
  "price": "number",
  "location": "string",
  "images": ["url"],
  "category": "string"
}
```

**Validation Rules**:
- Title: Required, 3-100 characters
- Description: Required, minimum 10 characters
- Price: Required, positive number
- Location: Required string
- Category: Must be valid category

**Success Response** (201 Created):
```json
{
  "success": true,
  "message": "Listing created successfully",
  "data": {
    "id": "listing_id",
    "title": "string",
    "description": "string",
    "price": "number",
    "location": "string",
    "images": ["url"],
    "category": "string",
    "owner": "user_id",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
}
```

**Error Responses**:
- `400 Bad Request`: Invalid input data
- `401 Unauthorized`: Invalid or missing token

**Section sources**
- [routes/listings.js](file://routes/listings.js)
- [controllers/listings.js](file://controllers/listings.js)
- [models/listing.js](file://models/listing.js)

### Get All Listings

**Endpoint**: `GET /api/v1/listings`

**Description**: Retrieves paginated list of all listings

**Authentication**: Optional

**Query Parameters**:
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10, max: 100)
- `category`: Filter by category
- `minPrice`: Minimum price filter
- `maxPrice`: Maximum price filter
- `search`: Search in title and description

**Success Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "listings": [...],
    "pagination": {
      "currentPage": 1,
      "totalPages": 10,
      "totalItems": 100,
      "itemsPerPage": 10
    }
  }
}
```

**Section sources**
- [routes/listings.js](file://routes/listings.js)
- [controllers/listings.js](file://controllers/listings.js)

### Get Single Listing

**Endpoint**: `GET /api/v1/listings/:id`

**Description**: Retrieves a specific listing by ID

**Authentication**: Optional

**Path Parameters**:
- `id`: Listing ID (required)

**Success Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "id": "listing_id",
    "title": "string",
    "description": "string",
    "price": "number",
    "location": "string",
    "images": ["url"],
    "category": "string",
    "owner": {
      "id": "user_id",
      "username": "string"
    },
    "reviews": [...],
    "averageRating": "number",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
}
```

**Error Responses**:
- `404 Not Found`: Listing not found

**Section sources**
- [routes/listings.js](file://routes/listings.js)
- [controllers/listings.js](file://controllers/listings.js)

### Update Listing

**Endpoint**: `PUT /api/v1/listings/:id`

**Description**: Updates an existing listing

**Authentication**: Required (Bearer token)
**Authorization**: Only listing owner can update

**Path Parameters**:
- `id`: Listing ID (required)

**Request Body**: Same as create listing (all fields optional)

**Success Response** (200 OK):
```json
{
  "success": true,
  "message": "Listing updated successfully",
  "data": {...}
}
```

**Error Responses**:
- `400 Bad Request`: Invalid input data
- `401 Unauthorized`: Invalid or missing token
- `403 Forbidden`: Not authorized to update listing
- `404 Not Found`: Listing not found

**Section sources**
- [routes/listings.js](file://routes/listings.js)
- [controllers/listings.js](file://controllers/listings.js)

### Delete Listing

**Endpoint**: `DELETE /api/v1/listings/:id`

**Description**: Deletes a listing

**Authentication**: Required (Bearer token)
**Authorization**: Only listing owner can delete

**Path Parameters**:
- `id`: Listing ID (required)

**Success Response** (204 No Content):
```json
{
  "success": true,
  "message": "Listing deleted successfully"
}
```

**Error Responses**:
- `401 Unauthorized`: Invalid or missing token
- `403 Forbidden`: Not authorized to delete listing
- `404 Not Found`: Listing not found

**Section sources**
- [routes/listings.js](file://routes/listings.js)
- [controllers/listings.js](file://controllers/listings.js)

## Review Management Endpoints

### Create Review

**Endpoint**: `POST /api/v1/listings/:id/reviews`

**Description**: Creates a review for a listing

**Authentication**: Required (Bearer token)

**Path Parameters**:
- `id`: Listing ID (required)

**Request Body**:
```json
{
  "rating": "number",
  "comment": "string"
}
```

**Validation Rules**:
- Rating: Required, integer between 1-5
- Comment: Optional, maximum 500 characters

**Success Response** (201 Created):
```json
{
  "success": true,
  "message": "Review created successfully",
  "data": {
    "id": "review_id",
    "rating": "number",
    "comment": "string",
    "author": {
      "id": "user_id",
      "username": "string"
    },
    "listing": "listing_id",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
}
```

**Error Responses**:
- `400 Bad Request`: Invalid input data
- `401 Unauthorized`: Invalid or missing token
- `404 Not Found`: Listing not found

**Section sources**
- [routes/review.js](file://routes/review.js)
- [controllers/reviews.js](file://controllers/reviews.js)
- [models/review.js](file://models/review.js)

### Get Reviews for Listing

**Endpoint**: `GET /api/v1/listings/:id/reviews`

**Description**: Retrieves reviews for a specific listing

**Authentication**: Optional

**Path Parameters**:
- `id`: Listing ID (required)

**Query Parameters**:
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `sortBy`: Sort by rating or date (default: date)

**Success Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "reviews": [...],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalItems": 50,
      "itemsPerPage": 10
    },
    "summary": {
      "averageRating": "number",
      "totalReviews": "number"
    }
  }
}
```

**Error Responses**:
- `404 Not Found`: Listing not found

**Section sources**
- [routes/review.js](file://routes/review.js)
- [controllers/reviews.js](file://controllers/reviews.js)

### Update Review

**Endpoint**: `PUT /api/v1/reviews/:id`

**Description**: Updates an existing review

**Authentication**: Required (Bearer token)
**Authorization**: Only review author can update

**Path Parameters**:
- `id`: Review ID (required)

**Request Body**: Same as create review (all fields optional)

**Success Response** (200 OK):
```json
{
  "success": true,
  "message": "Review updated successfully",
  "data": {...}
}
```

**Error Responses**:
- `400 Bad Request`: Invalid input data
- `401 Unauthorized`: Invalid or missing token
- `403 Forbidden`: Not authorized to update review
- `404 Not Found`: Review not found

**Section sources**
- [routes/review.js](file://routes/review.js)
- [controllers/reviews.js](file://controllers/reviews.js)

### Delete Review

**Endpoint**: `DELETE /api/v1/reviews/:id`

**Description**: Deletes a review

**Authentication**: Required (Bearer token)
**Authorization**: Only review author can delete

**Path Parameters**:
- `id`: Review ID (required)

**Success Response** (204 No Content):
```json
{
  "success": true,
  "message": "Review deleted successfully"
}
```

**Error Responses**:
- `401 Unauthorized`: Invalid or missing token
- `403 Forbidden`: Not authorized to delete review
- `404 Not Found`: Review not found

**Section sources**
- [routes/review.js](file://routes/review.js)
- [controllers/reviews.js](file://controllers/reviews.js)

## Error Handling

### Standard Error Response Format

All API errors follow a consistent response format:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {}
  }
}
```

### Common Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| VALIDATION_ERROR | 400 | Input validation failed |
| UNAUTHORIZED | 401 | Authentication required or invalid |
| FORBIDDEN | 403 | Insufficient permissions |
| NOT_FOUND | 404 | Resource not found |
| DUPLICATE_ENTRY | 409 | Duplicate resource entry |
| INTERNAL_ERROR | 500 | Server-side error |

### Validation Errors

Validation errors include detailed field-level information:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Input validation failed",
    "details": {
      "fields": {
        "email": ["Invalid email format"],
        "password": ["Password must be at least 8 characters"]
      }
    }
  }
}
```

**Section sources**
- [utils/ExpressError.js](file://utils/ExpressError.js)
- [middleware.js](file://middleware.js)

## Security Considerations

### Authentication & Authorization
- JWT tokens required for protected endpoints
- Role-based access control implemented
- Password hashing using bcrypt
- Session management with secure cookies

### Input Validation
- All inputs validated server-side
- SQL injection prevention
- XSS protection headers
- File upload validation and sanitization

### Rate Limiting
- Request throttling per IP address
- Authentication attempt limiting
- API call frequency limits

### CORS Configuration
- Cross-origin resource sharing configured
- Allowed origins restricted to trusted domains
- Preflight requests handled properly

**Section sources**
- [middleware.js](file://middleware.js)
- [app.js](file://app.js)

## Rate Limiting

### Global Limits
- 100 requests per minute for unauthenticated users
- 1000 requests per minute for authenticated users
- 5 login attempts per minute per IP

### Endpoint-Specific Limits
- Registration: 3 attempts per hour per IP
- Password reset: 5 attempts per hour per IP
- File uploads: 10 uploads per hour per user

### Rate Limit Response
When rate limit exceeded:
```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many requests. Please try again later.",
    "retryAfter": 60
  }
}
```

**Section sources**
- [middleware.js](file://middleware.js)
- [app.js](file://app.js)

## Versioning

### API Version Strategy
The API uses URL-based versioning:
- `/api/v1/...` - Current stable version
- Future versions will increment the version number

### Deprecation Policy
- Previous versions supported for 6 months after new version release
- Deprecation notices sent via response headers
- Migration guides provided for breaking changes

### Version Headers
```
X-API-Version: v1
X-API-Deprecation: false
```

**Section sources**
- [app.js](file://app.js)

## Response Formats

### Success Response Pattern
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {},
  "meta": {
    "requestId": "unique_request_id",
    "timestamp": "ISO_8601_timestamp",
    "version": "v1"
  }
}
```

### Pagination Response Pattern
```json
{
  "success": true,
  "data": {
    "items": [],
    "pagination": {
      "currentPage": 1,
      "totalPages": 10,
      "totalItems": 100,
      "itemsPerPage": 10,
      "hasNextPage": true,
      "hasPrevPage": false
    }
  }
}
```

### File Upload Response Pattern
```json
{
  "success": true,
  "message": "File uploaded successfully",
  "data": {
    "fileUrl": "https://cdn.example.com/uploads/file.jpg",
    "fileName": "original_filename.jpg",
    "fileSize": 123456,
    "mimeType": "image/jpeg"
  }
}
```

## Troubleshooting Guide

### Common Issues

#### Authentication Problems
- Ensure JWT token is included in Authorization header
- Check token expiration and refresh if needed
- Verify token signature and claims

#### Validation Errors
- Check request body format matches expected schema
- Validate field types and constraints
- Review error details for specific field issues

#### Permission Errors
- Verify user has required role/permissions
- Check resource ownership for write operations
- Confirm authentication status

#### Performance Issues
- Monitor API response times
- Check database query performance
- Review rate limiting configurations

### Debugging Tools
- Enable debug logging in development
- Use request IDs for tracing
- Monitor error rates and patterns
- Check application logs for stack traces

**Section sources**
- [utils/wrapAsync.js](file://utils/wrapAsync.js)
- [utils/ExpressError.js](file://utils/ExpressError.js)

## Conclusion

This API provides a comprehensive set of endpoints for user management, listing operations, and review functionality. The implementation follows RESTful best practices with proper authentication, validation, error handling, and security measures.

For integration purposes, ensure proper error handling, implement retry logic for transient failures, and respect rate limiting headers. The consistent response formats and comprehensive error messages facilitate smooth client integration.

[No sources needed since this section summarizes without analyzing specific files]