# RSS-API

## Getting Started
```bash
# Run application
make up
```

```bash
# Have some changes ?
make build
```

```bash
# Stop application and clean resources
make down
```

## API Endpoints
- **[GET]** : `/v1/posts` - Returns all posts
- **[GET]** : `/v1/posts/:id` - Return one post by ID
- **[POST]** : `/v1/posts/` - Create post
- **[PATCH]** : `/v1/posts/:id` - Partially update post
- **[DELETE]** : `/v1/posts/:id` - Remove post

### Swagger
- `/docs` - swagger api documentation
