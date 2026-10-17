package life

import (
	"context"
	"encoding/json"
	"errors"
	"net/http"
	"net/http/httptest"
	"os"
	"testing"
)

func testServer(t *testing.T) *httptest.Server {
	t.Helper()
	mux := http.NewServeMux()
	mux.HandleFunc("/ask", func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Query().Get("query") != "projects" {
			t.Errorf("query not forwarded: %q", r.URL.RawQuery)
		}
		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte(`{"_meta":{"response_type":"item_list","version":"0.1"},"query":"projects","results":[{"url":"https://life.ayushrai.site/sites/projects/","name":"Projects","description":"x"}]}`))
	})
	mux.HandleFunc("/api/v1/sandbox", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte(`{"sandbox":true,"pages":[{"url":"https://life.ayushrai.site/","name":"Ayush Rai"}],"pagination":{"page":1}}`))
	})
	mux.HandleFunc("/api/v1/jobs", func(w http.ResponseWriter, r *http.Request) {
		var body map[string][]string
		if err := json.NewDecoder(r.Body).Decode(&body); err != nil || len(body["queries"]) == 0 {
			w.WriteHeader(http.StatusBadRequest)
			w.Write([]byte(`{"error":{"code":"invalid_batch","message":"bad","status":400,"hint":"Send queries"}}`))
			return
		}
		w.Header().Set("Location", "https://life.ayushrai.site/api/v1/jobs/abc")
		w.WriteHeader(http.StatusAccepted)
		w.Write([]byte(`{"job_id":"abc","status":"pending","poll":"https://life.ayushrai.site/api/v1/jobs/abc"}`))
	})
	mux.HandleFunc("/api/v1/jobs/abc", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte(`{"job_id":"abc","status":"completed","count":1,"results":[{"index":0,"query":"projects","answer":{"query":"projects"}}]}`))
	})
	return httptest.NewServer(mux)
}

func TestAskSandboxAndJobs(t *testing.T) {
	srv := testServer(t)
	defer srv.Close()
	c := New(WithBaseURL(srv.URL))
	ctx := context.Background()

	ask, err := c.Ask(ctx, "projects")
	if err != nil || len(ask.Results) != 1 || ask.Meta.ResponseType != "item_list" {
		t.Fatalf("Ask: %+v %v", ask, err)
	}
	sb, err := c.Sandbox(ctx)
	if err != nil || !sb.Sandbox || len(sb.Pages) != 1 {
		t.Fatalf("Sandbox: %+v %v", sb, err)
	}
	job, err := c.CreateJob(ctx, []string{"projects"})
	if err != nil || job.Status != "pending" || job.JobID != "abc" {
		t.Fatalf("CreateJob: %+v %v", job, err)
	}
	done, err := c.GetJob(ctx, job.JobID)
	if err != nil || done.Status != "completed" || done.Results[0].Answer.Query != "projects" {
		t.Fatalf("GetJob: %+v %v", done, err)
	}
}

func TestStructuredErrors(t *testing.T) {
	srv := testServer(t)
	defer srv.Close()
	_, err := New(WithBaseURL(srv.URL)).CreateJob(context.Background(), nil)
	var apiErr *APIError
	if !errors.As(err, &apiErr) {
		t.Fatalf("want *APIError, got %T %v", err, err)
	}
	if apiErr.StatusCode != 400 || apiErr.Code != "invalid_batch" || apiErr.Hint == "" {
		t.Fatalf("unexpected error: %+v", apiErr)
	}
	if _, err := New().GetJob(context.Background(), ""); err == nil {
		t.Fatal("empty job id must fail")
	}
}

// TestLive hits production when LIFE_LIVE=1.
func TestLive(t *testing.T) {
	if os.Getenv("LIFE_LIVE") != "1" {
		t.Skip("set LIFE_LIVE=1 to call https://life.ayushrai.site")
	}
	c := New()
	ctx := context.Background()
	if sb, err := c.Sandbox(ctx); err != nil || !sb.Sandbox {
		t.Fatalf("live Sandbox: %v", err)
	}
	job, err := c.CreateJob(ctx, []string{"Who is Ayush Rai?"})
	if err != nil {
		t.Fatalf("live CreateJob: %v", err)
	}
	if done, err := c.GetJob(ctx, job.JobID); err != nil || done.Status != "completed" {
		t.Fatalf("live GetJob: %+v %v", done, err)
	}
}
