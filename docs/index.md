# ☕ Emotionally Unstable Coffee API

> A state-driven REST API where a coffee machine behaves like a burned-out human.

[Try Live API](https://emotionally-unstable-coffee-api.onrender.com/preview)

## Live API

**Base URL**

```
https://emotionally-unstable-coffee-api.onrender.com
```

**Try it now:**

* `/status` → [https://emotionally-unstable-coffee-api.onrender.com/status](https://emotionally-unstable-coffee-api.onrender.com/status)
* `/preview` → [https://emotionally-unstable-coffee-api.onrender.com/preview](https://emotionally-unstable-coffee-api.onrender.com/preview)

## Overview

This API simulates a coffee machine with emotions, burnout, and questionable life choices.

Every request affects its internal state.
Every response reflects how it *feels*.

Sometimes it serves coffee.
Sometimes it refuses.
Sometimes it spirals.

## Quick Demo

Watch the API in action: [Watch Demo Video](https://drive.google.com/file/d/13uz1Eovod3ChN9oYO0YkuQm_x91xzrCs/view?usp=sharing)

## Core Idea

This is not just an API.

> It is a **state-driven personality system exposed through HTTP endpoints**.

### Internal State

```json
{
  "mood": "neutral",
  "caffeineLevel": 70,
  "burnout": 30,
  "cleanliness": 80
}
```

### What affects the system?

* Brewing - increases burnout
* Refill - restores caffeine
* Clean - improves mood
* Therapy - unpredictable emotional reaction

## Endpoints

| Method | Route       | Description                |
| ------ | ----------- | -------------------------- |
| GET    | `/status`   | Current system state       |
| POST   | `/brew`     | Brew coffee                |
| POST   | `/refill`   | Add caffeine               |
| POST   | `/clean`    | Clean machine              |
| GET    | `/motivate` | Motivation (based on mood) |
| POST   | `/therapy`  | Talk to the machine        |
| GET    | `/claims`   | Random claims              |
| GET    | `/preview`  | Full system demo           |
| GET    | `/info`     | API metadata               |

## Quick Examples

### GET /status

```json
{
  "status": "operational",
  "mood": "neutral",
  "caffeineLevel": 70,
  "burnout": 30,
  "cleanliness": 80
}
```

### POST /brew

```json
{
  "cups": 2
}
```

**Response**

```json
{
  "status": 200,
  "message": "Coffee ready. Don’t push it."
}
```

### POST /therapy

```json
{
  "message": "you’re doing great"
}
```

**Possible response**

```json
{
  "mood": "suspicious",
  "message": "Why are you being nice?"
}
```

## Behavior System

The API evolves over time:

* Too many `/brew` - burnout increases
* Low caffeine - tired responses
* Dirty machine - irritation
* High burnout - refusal (503 / 418)

Even the same request can return different results.

## Protocol Flavor

Inspired by HTCPCP (Hyper Text Coffee Pot Control Protocol)

* Uses HTTP methods (GET / POST)
* Includes playful status codes (like **418 - I'm a teapot**)
* Custom headers reflect internal mood

Example:

```
X-Coffee-Mood: existential_crisis
X-Caffeine-Level: 12
```

## Try the Full Experience

**Open this:**
[https://emotionally-unstable-coffee-api.onrender.com/preview](https://emotionally-unstable-coffee-api.onrender.com/preview)

This route simulates:

* current state
* multiple endpoints
* unpredictable behavior

## Local Setup

```bash
git clone https://github.com/dipanshu447/emotionally-unstable-coffee-api.git
cd emotionally-unstable-coffee-api
npm install
npm start
```

Server:

```
http://localhost:5000
```

## Author

**Dipanshu Sahu**

* GitHub: [https://github.com/dipanshu447](https://github.com/dipanshu447)
* Portfolio: [https://www.itsdipanshu.dev](https://www.itsdipanshu.dev)
* Dev.to: [https://dev.to/dipanshu447](https://dev.to/dipanshu447)

## Why this exists

Most APIs return predictable results.

This one reacts.

> What if an API didn’t just respond… but had a personality?

## Origin

Built for the [Dev.to April Fools Challenge 2026](https://dev.to/challenges/aprilfools-2026).

## Disclaimer

This API is intentionally unstable.

* It may refuse requests
* It may behave unpredictably
* It may question your existence

Use responsibly.