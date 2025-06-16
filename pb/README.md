# Pocketbase Instance

This is the Pocketbase Instance extended with Golang to revalidate the Frontend as updates occur.

---

## Tech Stack

- **Go**: A fast and efficient language for backend services.
- **PocketBase**: A lightweight backend for managing legal data.

---

## Hosting

The bot runs on a **dedicated server**, ensuring reliable uptime and quick responses. It is deployed with the github workflow `cd-pb.yml`

---

## Environment Variables

The pocketbase instance requires the following environment variables to be configured:

```env

FRONTEND_URL=(the URL of the frontend)
SECRET=(the secret used to authenticate with the frontend) [Make sure this matches in the frontend env as well]
```

---

## Commands

### Refresh Data

- **Command:** `/refresh-data`
- **Description:** Refreshes the bot’s stored legal data.

### Get Clauses

- **Command:** `/get-clauses`
- **Description:** Retrieves specific clauses from the constitution.
- **Options:**
  - `article-number` (Required): Article number of the clause.
  - `clause-number` (Optional): Clause number (autocomplete enabled).

### Get Articles

- **Command:** `/get-articles`
- **Description:** Retrieves articles from the constitution.
- **Options:**
  - `article-number` (Optional): Article number of the clause (autocomplete enabled).

### Get Amendments

- **Command:** `/get-amendments`
- **Description:** Retrieves constitutional amendments.
- **Options:**
  - `article-number` (Required): Article number of the constitution.
  - `clause-number` (Required): Clause number of the article.
  - `amendment-number` (Required): Amendment number of the clause.

---

## Built by Arinji

This project is proudly built as part of the **Garconia Monolithic Infrastructure** by [Arinji](https://www.arinji.com/). Check out my website for more cool projects!
