# life.ayushrai.site Go SDK

Official Go client for the free, read-only API at https://life.ayushrai.site. No API key is needed.

```bash
go get life.ayushrai.site/sdk/go
```

```go
import life "life.ayushrai.site/sdk/go"

client := life.New()
answer, err := client.Ask(ctx, "Who is Ayush Rai?")
catalog, err := client.Sandbox(ctx)
job, err := client.CreateJob(ctx, []string{"projects"}) // HTTP 202
done, err := client.GetJob(ctx, job.JobID)
```

Errors from the API are returned as `*life.APIError` with `Code`, `Message`, and `Hint`.

- Developer portal: https://life.ayushrai.site/developers
- OpenAPI: https://life.ayushrai.site/openapi.json
- Source: https://github.com/ayushrai-hub/LifeOS/tree/main/packages/life-go

Tests: `go test ./...` (offline) and `LIFE_LIVE=1 go test ./...` (production).
