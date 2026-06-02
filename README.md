# DSA Buddy 🚀

A Chrome Extension that helps you solve DSA problems with **tiny, specific hints instead of direct answers**.

DSA Buddy acts like a strict coding mentor. It reads the coding problem from the current tab, sends the problem + user message to an AI backend, and returns concise hints without spoiling the full solution unless explicitly requested.

---

## Features

* Specific DSA hints
* No unnecessary theory
* No direct solution unless asked
* Reads problem from current tab
* Chrome extension popup interface
* Backend API integration with AI model


---

## Architecture

![DSA Buddy Architecture](file_00000000730071fa861e1d5bd8fb7498)

### Flow

1. `content.js`

   * Reads the current coding problem from the active tab.

2. `popup.js`

   * Sends request to `content.js`
   * Gets the extracted problem
   * Takes user message (`hint`, `still stuck`, `solution`)
   * Sends both to backend

3. `backend.js`

   * Sends request to AI API
   * Applies strict DSA mentor system prompt
   * Returns structured hints/solution

4. Response returns to popup and gets displayed.

---

## Project Structure

```txt
DSA-Buddy/
│── extension/
│   ├── popup.js
│   ├── popup.html
│   ├── popup.css
│   ├── content.js
│   ├── manifest.json
│
│── backend/
│   ├── backend.js
│   ├── .env
│   ├── package.json
│
│── README.md
```

---

## Tech Stack

* JavaScript
* Chrome Extension API
* Node.js
* Express.js
* CORS
* dotenv
* Groq API / OpenAI API

---

## How It Works

### Step 1: Read Problem

`content.js` extracts the coding question from the current page.

### Step 2: Send Request

`popup.js` sends:

* Problem statement
* User message

Example:

```txt
Problem: Two Sum

Message: hint
```

### Step 3: AI Generates Hint

`backend.js` sends:

* System Prompt → strict DSA mentor rules
* User prompt → problem + user request

### Step 4: Return Response

Example output:

```txt
- Use HashMap for constant lookup
- Check complement before inserting
- Store value → index
```

---

## Installation

### Clone Project

```bash
git clone <your-repo-url>
```

### Install Backend Dependencies

```bash
npm install
```

### Create `.env`

```env
GROQ_API_KEY=your_api_key
```

### Run Backend

```bash
node backend.js
```

Server runs on:

```txt
http://localhost:3000
```

---

## Load Chrome Extension

1. Open Chrome

2. Go to:

```txt
chrome://extensions
```

3. Enable:

```txt
Developer Mode
```

4. Click:

```txt
Load Unpacked
```

5. Select extension folder

---

## Example Usage

User:

```txt
hint
```

Response:

```txt
- Extract last digit using modulo
- Build result digit by digit
- Check overflow before updating
```

User:

```txt
still stuck
```

Response:

```txt
- Remove processed digit using division
- Handle negative sign carefully
- Overflow check before update
```

User:

```txt
solution
```

Response:

```txt
Solution:
<clean code>
```

---

## Future Improvements

* Better platform detection (LeetCode, Codeforces, HackerRank)
* Conversation memory
* Multi-language code generation
* Better UI/UX
* Difficulty-based hint levels

---

## Author

Ankit Choudhary

Built to learn DSA smarter, not faster.
