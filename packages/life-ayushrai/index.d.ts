export declare const ORIGIN: "https://life.ayushrai.site";
export declare const VERSION: string;

export interface ClientOptions {
  /** API origin. Defaults to LIFE_API_BASE_URL or https://life.ayushrai.site. */
  origin?: string;
  /** Per-request timeout in milliseconds. Default 15000. */
  timeoutMs?: number;
  /** Custom fetch implementation. */
  fetch?: typeof fetch;
}

export interface NLWebMeta {
  response_type: string;
  version: string;
}

export interface Result {
  url: string;
  name: string;
  description: string;
}

export interface AskResponse {
  _meta: NLWebMeta;
  query: string;
  results: Result[];
  usage?: string;
}

export interface Page {
  url: string;
  name: string;
  description: string;
  keywords?: string;
}

export interface SandboxResponse {
  sandbox: true;
  mode: string;
  notice: string;
  resource: string;
  summary: string;
  pages: Page[];
  pagination: Record<string, unknown>;
}

export interface ApiErrorBody {
  code: string;
  message: string;
  status: number;
  hint?: string;
  docs?: string;
}

export interface QueryResult {
  index: number;
  query?: string;
  answer?: AskResponse;
  error?: ApiErrorBody;
}

export interface BatchResponse {
  resource: string;
  count: number;
  results: QueryResult[];
}

export interface JobAccepted {
  job_id: string;
  id: string;
  status: "pending";
  resource: string;
  poll: string;
  status_url: string;
  message?: string;
}

export interface JobCompleted {
  job_id: string;
  status: "completed";
  resource: string;
  count: number;
  results: QueryResult[];
}

export declare class LifeApiError extends Error {
  readonly status: number;
  readonly code: string;
  readonly hint: string;
  readonly docs: string;
}

export declare class LifeAyushRaiClient {
  constructor(options?: ClientOptions);
  readonly origin: string;
  ask(query: string): Promise<AskResponse>;
  sandbox(): Promise<SandboxResponse>;
  batch(queries: string[]): Promise<BatchResponse>;
  createJob(queries: string[]): Promise<JobAccepted>;
  getJob(jobId: string): Promise<JobCompleted>;
}

export declare function ask(query: string, options?: ClientOptions): Promise<AskResponse>;
export declare function sandbox(options?: ClientOptions): Promise<SandboxResponse>;
export declare function batch(queries: string[], options?: ClientOptions): Promise<BatchResponse>;
export declare function createJob(queries: string[], options?: ClientOptions): Promise<JobAccepted>;
export declare function getJob(jobId: string, options?: ClientOptions): Promise<JobCompleted>;
