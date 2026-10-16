# life-ayushrai

Official SDK and CLI for [life.ayushrai.site](https://life.ayushrai.site/).

Homepage: https://life.ayushrai.site/  
Repository: https://github.com/ayushrai-hub/LifeOS/tree/main/packages/life-ayushrai  
Developers: https://life.ayushrai.site/developers/

## Install

```bash
npm install life-ayushrai
```

## CLI

```bash
npx life-ayushrai ask "Who is Ayush Rai?"
npx life-ayushrai sandbox
npx life-ayushrai job "Who is Ayush Rai?" projects
```

## Library

```js
const { ask, sandbox, createJob, getJob } = require("life-ayushrai");
```

`createJob` posts to `POST /api/v1/jobs` (HTTP 202 + `Location`). Poll with `getJob(job_id)`.
