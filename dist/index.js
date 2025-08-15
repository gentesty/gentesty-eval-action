import WebSocket from "ws";
import fetch from "node-fetch";
import * as core from "@actions/core";
async function run() {
    try {
        const webhookUrl = core.getInput("webhook_url", { required: true });
        const token = core.getInput("token", { required: true });
        // 1. Trigger the webhook to get WS URL
        const res = await fetch(webhookUrl, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) {
            throw new Error(`Webhook initiation failed: ${res.status} ${res.statusText}`);
        }
        const body = (await res.json());
        if (!body.wsUrl)
            throw new Error("No wsUrl returned from webhook endpoint");
        // 2. Connect to WebSocket
        const ws = new WebSocket(body.wsUrl, {
            headers: { Authorization: `Bearer ${token}` }
        });
        ws.on("open", () => {
            core.info(`✅ Connected to ${body.wsUrl}`);
        });
        ws.on("message", (data) => {
            process.stdout.write(data.toString());
        });
        ws.on("error", (err) => {
            core.setFailed(`WebSocket error: ${err.message}`);
        });
        ws.on("close", (code, reason) => {
            core.info(`\n🔌 Connection closed: ${code} ${reason}`);
        });
    }
    catch (err) {
        core.setFailed(err.message);
    }
}
run();
