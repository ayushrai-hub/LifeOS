// Package life is the official Go client for the public, read-only API at
// https://life.ayushrai.site. Every call is free and needs no API key.
//
// Documentation: https://life.ayushrai.site/developers
// OpenAPI:       https://life.ayushrai.site/openapi.json
package life

import (
	"bytes"
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"strings"
	"time"
)

// Version is the SDK version, sent in the User-Agent header.
const Version = "0.1.0"

// DefaultBaseURL is the production origin.
const DefaultBaseURL = "https://life.ayushrai.site"

// Client calls the life.ayushrai.site API. The zero value is not usable; use New.
type Client struct {
	baseURL    string
	httpClient *http.Client
	userAgent  string
}

// Option configures a Client.
type Option func(*Client)

// WithBaseURL overrides the API origin (for example a preview deployment).
func WithBaseURL(base string) Option {
	return func(c *Client) { c.baseURL = strings.TrimRight(base, "/") }
}

// WithHTTPClient supplies a custom http.Client.
func WithHTTPClient(hc *http.Client) Option {
	return func(c *Client) { c.httpClient = hc }
}

// New returns a Client with a 15 second timeout.
func New(opts ...Option) *Client {
	c := &Client{
		baseURL:    DefaultBaseURL,
		httpClient: &http.Client{Timeout: 15 * time.Second},
		userAgent:  "life-ayushrai-go/" + Version,
	}
	for _, opt := range opts {
		opt(c)
	}
	return c
}

// APIError is a structured error returned by the API.
type APIError struct {
	StatusCode int    `json:"status"`
	Code       string `json:"code"`
	Message    string `json:"message"`
	Hint       string `json:"hint"`
	Docs       string `json:"docs"`
}

func (e *APIError) Error() string {
	if e.Hint != "" {
		return fmt.Sprintf("life: %d %s: %s (%s)", e.StatusCode, e.Code, e.Message, e.Hint)
	}
	return fmt.Sprintf("life: %d %s: %s", e.StatusCode, e.Code, e.Message)
}

// Meta describes an NLWeb response.
type Meta struct {
	ResponseType string `json:"response_type"`
	Version      string `json:"version"`
}

// Result is one public page that answers a query.
type Result struct {
	URL         string `json:"url"`
	Name        string `json:"name"`
	Description string `json:"description"`
}

// AskResponse is the NLWeb answer for one query.
type AskResponse struct {
	Meta    Meta     `json:"_meta"`
	Query   string   `json:"query"`
	Results []Result `json:"results"`
}

// Page is one entry in the sandbox catalog.
type Page struct {
	URL         string `json:"url"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Keywords    string `json:"keywords"`
}

// SandboxResponse is the zero-auth public catalog.
type SandboxResponse struct {
	Sandbox    bool            `json:"sandbox"`
	Notice     string          `json:"notice"`
	Resource   string          `json:"resource"`
	Summary    string          `json:"summary"`
	Pages      []Page          `json:"pages"`
	Pagination json.RawMessage `json:"pagination"`
}

// QueryResult is one entry of a batch or completed job.
type QueryResult struct {
	Index  int          `json:"index"`
	Query  string       `json:"query"`
	Answer *AskResponse `json:"answer,omitempty"`
	Error  *APIError    `json:"error,omitempty"`
}

// BatchResponse answers up to ten queries at once.
type BatchResponse struct {
	Resource string        `json:"resource"`
	Count    int           `json:"count"`
	Results  []QueryResult `json:"results"`
}

// JobAccepted is returned by CreateJob (HTTP 202).
type JobAccepted struct {
	JobID     string `json:"job_id"`
	Status    string `json:"status"`
	Poll      string `json:"poll"`
	StatusURL string `json:"status_url"`
}

// JobCompleted is returned by GetJob.
type JobCompleted struct {
	JobID   string        `json:"job_id"`
	Status  string        `json:"status"`
	Count   int           `json:"count"`
	Results []QueryResult `json:"results"`
}

// Ask answers one public question (GET /ask).
func (c *Client) Ask(ctx context.Context, query string) (*AskResponse, error) {
	var out AskResponse
	err := c.do(ctx, http.MethodGet, "/ask?query="+url.QueryEscape(query), nil, http.StatusOK, &out)
	return &out, err
}

// Sandbox returns the public catalog with no credentials (GET /api/v1/sandbox).
func (c *Client) Sandbox(ctx context.Context) (*SandboxResponse, error) {
	var out SandboxResponse
	err := c.do(ctx, http.MethodGet, "/api/v1/sandbox", nil, http.StatusOK, &out)
	return &out, err
}

// Batch answers 1 to 10 queries in one request (POST /api/v1/batch).
func (c *Client) Batch(ctx context.Context, queries []string) (*BatchResponse, error) {
	var out BatchResponse
	err := c.do(ctx, http.MethodPost, "/api/v1/batch", map[string][]string{"queries": queries}, http.StatusOK, &out)
	return &out, err
}

// CreateJob starts an async job (POST /api/v1/jobs, HTTP 202 Accepted).
func (c *Client) CreateJob(ctx context.Context, queries []string) (*JobAccepted, error) {
	var out JobAccepted
	err := c.do(ctx, http.MethodPost, "/api/v1/jobs", map[string][]string{"queries": queries}, http.StatusAccepted, &out)
	return &out, err
}

// GetJob polls an async job (GET /api/v1/jobs/{id}).
func (c *Client) GetJob(ctx context.Context, id string) (*JobCompleted, error) {
	if id == "" {
		return nil, errors.New("life: job id is required")
	}
	var out JobCompleted
	err := c.do(ctx, http.MethodGet, "/api/v1/jobs/"+url.PathEscape(id), nil, http.StatusOK, &out)
	return &out, err
}

func (c *Client) do(ctx context.Context, method, path string, body any, want int, out any) error {
	var reader io.Reader
	if body != nil {
		buf, err := json.Marshal(body)
		if err != nil {
			return err
		}
		reader = bytes.NewReader(buf)
	}
	req, err := http.NewRequestWithContext(ctx, method, c.baseURL+path, reader)
	if err != nil {
		return err
	}
	req.Header.Set("Accept", "application/json")
	req.Header.Set("User-Agent", c.userAgent)
	if body != nil {
		req.Header.Set("Content-Type", "application/json")
	}
	resp, err := c.httpClient.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()
	data, err := io.ReadAll(io.LimitReader(resp.Body, 8<<20))
	if err != nil {
		return err
	}
	if resp.StatusCode != want {
		apiErr := &APIError{StatusCode: resp.StatusCode, Code: "unexpected_status", Message: http.StatusText(resp.StatusCode)}
		var envelope struct {
			Error *APIError `json:"error"`
		}
		if json.Unmarshal(data, &envelope) == nil && envelope.Error != nil {
			apiErr = envelope.Error
			apiErr.StatusCode = resp.StatusCode
		}
		return apiErr
	}
	return json.Unmarshal(data, out)
}
