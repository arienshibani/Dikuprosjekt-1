import fetch from "node-fetch";

export async function get(req, res) {
    try {
        const url = `${process.env.API_URL}/api/v1/questions?limit=10`;

        const resp = await fetch(url);
        const json = await resp.json();

        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(json));
    } catch (error) {
        res.status(500).end(JSON.stringify({ error }));
    }
}

export async function post(req, res) {
    const { body } = req;

    const url = `${process.env.API_URL}/api/v1/questions`;

    try {
        const resp = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `token ${process.env.API_KEY}`,
            },
            body: JSON.stringify(body),
        });

        const text = await resp.text();

        try {
            const json = JSON.parse(text);

            if (resp.ok) {
                res.status(201).json(json)
            } else {
                res.status(resp.status).json(json);
            }
        } catch (error) {
            res.status(500).end("Json parsing failed, text: " + text);
        }
    } catch (error) {
        res.status(500).end("Request failed")
    }
}
