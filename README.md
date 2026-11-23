# gentesty-evaluation-action

[![GitHub Marketplace](https://img.shields.io/badge/GitHub%20Marketplace-gentesty%20Evaluation%20Action-blue?logo=github)](https://github.com/marketplace/actions/gentesty-evaluation-action)

A GitHub Action to start an evaluation run on the [gentesty](https://gentesty.com) platform, stream live logs over
WebSocket, and get the final test result (success/failure) directly in your workflow logs.

## ✨ Features

- **Trigger evaluation runs** on gentesty via secure webhook.
- **Stream real-time logs** from the WebSocket connection into your GitHub Actions log output.
- **Receive final result** (success/failure) when the run completes.
- Token-based authentication for secure access.
- Works in **staging** and **production** environments.

---

## 📦 Inputs

| Name          | Required | Description                                                      |
| ------------- | -------- | ---------------------------------------------------------------- |
| `webhook_url` | ✅ Yes   | The gentesty webhook HTTP endpoint to trigger an evaluation run. |
| `token`       | ✅ Yes   | Bearer token for authentication with the gentesty platform.      |

---

## 🚀 Example Usage

### Trigger in a workflow

```yaml
name: Run gentesty Evaluation

on:
    workflow_dispatch:

jobs:
    run-eval:
        runs-on: ubuntu-latest
        steps:
            - name: Checkout repo
              uses: actions/checkout@v4

            - name: Run gentesty Evaluation
              uses: gentesty/gentesty-eval-action
              with:
                  webhook_url: https://api.gentesty.com/evaluations/start
                  token: ${{ secrets.GENTESTY_API_TOKEN }}
```
