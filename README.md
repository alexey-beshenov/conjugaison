# Little table of French verb conjugation

To try this out, visit

https://alexey-beshenov.github.io/conjugaison/

Here are the main files in this repository:
* `json/` — JSON data for each verb,
* `conj.js` — JavaScript to render JSON,
* `index.html` — the main HTML file,
* `style.css` — a simple CSS style.

Moreover,
* `validate-json.sh` — validate that `json/` has correct contents,
* `verb-index.pl` — create the verb index `verbs.json` from `json/`,
* `verbs.json` — the output of `verb-index.pl`.
* `french-verbs.txt` — a list of French verbs fetched from the Wiktionary API.
