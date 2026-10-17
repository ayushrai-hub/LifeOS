# Authentication

Agents that call the protected API on life.ayushrai.site should follow this guide. Public pages, `/ask`, `/llms.txt`, and `/api/v1/sandbox` do not need a token. Protected entry points answer `GET` with `401` and a `WWW-Authenticate` challenge that points at the protected-resource metadata.

The `agent_auth` block in the authorization-server metadata is the machine-readable copy of this page. If this prose and that block disagree, trust the metadata.

## Discover

Fetch the protected-resource metadata:

`GET https://life.ayushrai.site/.well-known/oauth-protected-resource`

Read `resource`, `authorization_servers`, `scopes_supported`, and `bearer_methods_supported`. Then fetch the authorization server named there:

`GET https://life.ayushrai.site/.well-known/oauth-authorization-server`

Read `issuer`, `token_endpoint`, `revocation_endpoint`, `registration_endpoint`, `grant_types_supported`, and the whole `agent_auth` object: `skill`, `identity_endpoint`, `claim_endpoint`, `events_endpoint`, `identity_types_supported`, and `identity_assertion.assertion_types_supported`.

A protected call without a bearer looks like this:

```http
GET /api/v1 HTTP/1.1
Host: life.ayushrai.site
```

```http
HTTP/1.1 401 Unauthorized
WWW-Authenticate: Bearer resource_metadata="https://life.ayushrai.site/.well-known/oauth-protected-resource"
```

## Pick a method

`identity_types_supported` lists `anonymous`, `identity_assertion`, and `service_auth`.

Use `anonymous`. This personal site publishes public facts and does not run a private identity provider. `identity_assertion` would carry an id-jag (`urn:ietf:params:oauth:token-type:id-jag`) inside `identity_assertion.assertion_types_supported`, not as a top-level field. This site recognizes that shape and rejects it, because it cannot verify the assertion. `service_auth` is the same: there is no private client secret to accept.

## Register

`POST` the `identity_endpoint` (`https://life.ayushrai.site/agent/identity`) with the anonymous type:

```http
POST /agent/identity HTTP/1.1
Host: life.ayushrai.site
Content-Type: application/json

{"type":"anonymous"}
```

The success body tells you to continue at the token endpoint. It does not return a secret.

An `identity_assertion` or `service_auth` body receives `401` with `WWW-Authenticate` and `error` `invalid_assertion`. Switch to `anonymous`.

### Self-serve client registration (RFC 7591)

OAuth clients that prefer dynamic client registration can `POST` client metadata to the `registration_endpoint` (`https://life.ayushrai.site/oauth/register`). Registration is free, instant, and needs no human approval.

```http
POST /oauth/register HTTP/1.1
Host: life.ayushrai.site
Content-Type: application/json

{"client_name":"my-agent","grant_types":["public"],"token_endpoint_auth_method":"none"}
```

```http
HTTP/1.1 201 Created
Cache-Control: no-store

{"client_id":"public-...","client_id_issued_at":1792200000,"token_endpoint_auth_method":"none","grant_types":["public"],"response_types":[],"scope":"knowledge:read","token_endpoint":"https://life.ayushrai.site/oauth/token"}
```

Only public clients are issued (`token_endpoint_auth_method` `none`, no `client_secret`). Unsupported metadata returns `400` with `invalid_client_metadata` or `invalid_redirect_uri`. Continue at the token endpoint.

`OPTIONS` on `identity_endpoint`, `claim_endpoint`, and `events_endpoint` answers `204`.

## Claim

Anonymous access has no account to link, so the claim ceremony is a no-op. `POST` the `claim_endpoint` (`https://life.ayushrai.site/agent/claim`) and read the `not_required` status. Then exchange.

## Exchange

`POST` the token endpoint (`https://life.ayushrai.site/oauth/token`):

```http
POST /oauth/token HTTP/1.1
Host: life.ayushrai.site
Content-Type: application/json

{"grant_type":"public"}
```

```json
{"access_token":"public-read","token_type":"Bearer","scope":"knowledge:read","expires_in":3600}
```

`public-read` is not a secret. It only marks that you finished discovery. The scope `knowledge:read` covers the same public pages as the sandbox.

## Use the access_token

Send the bearer on a protected entry point:

```http
GET /api/v1 HTTP/1.1
Host: life.ayushrai.site
Authorization: Bearer public-read
```

The body is a short profile summary and the public page list. For a call that must not touch a credential at all, use `GET /api/v1/sandbox` instead. The sandbox is the same public data, with `X-Sandbox: true`, and it does not write.

## Errors

- `401` and `WWW-Authenticate` with `resource_metadata`: fetch the protected-resource document and start again at Discover.
- `400` `invalid_grant` on the token endpoint: the jwt-bearer grant was missing an assertion. Use `grant_type` `public` after anonymous registration.
- `401` `invalid_assertion` on the identity endpoint: the `identity_assertion` or `service_auth` type was refused. Use `anonymous`.
- `400` `invalid_client_metadata` on the registration endpoint: send a JSON object with `token_endpoint_auth_method` `none` and `grant_types` from `public` or jwt-bearer.
- `404`: the path is not an API. Read `/llms.txt`.

## Revocation

`POST` `https://life.ayushrai.site/oauth/revoke` with the access token. The response is `{"revoked": true}`. There is no server-side session behind `public-read`; revocation is acknowledged so clients can drop the token. Event notices can be posted to the `events_endpoint` at `https://life.ayushrai.site/agent/events`.
