# V8.2 BYOK Vault

V8.2 turns the provider settings area into a real BYOK foundation instead of a static demo screen.

## What Changed

- Provider keys are encrypted before storage.
- Key hints are stored without exposing the secret.
- Provider key save and test routes are available under `/api/provider-keys`.
- Audit events are recorded for key upserts and provider health checks.
- The Provider Vault UI now explains the production API path and security posture.

## Environment

Set this value before saving real provider keys:

```bash
BYOK_ENCRYPTION_KEY=replace_with_long_random_secret_min_32_chars
```

The encryption helper derives a 256-bit key from this secret and encrypts provider keys with AES-256-GCM.

## API Routes

### Save Or Rotate A Provider Key

```http
POST /api/provider-keys
```

Body:

```json
{
  "workspaceId": "00000000-0000-0000-0000-000000000001",
  "provider": "openai",
  "providerKey": "sk-live-example",
  "actorId": "demo-user",
  "rotationDays": 30
}
```

The route stores the encrypted key in `provider_keys`, updates `key_hint`, sets rotation metadata, and writes an audit event.

### List Provider Keys

```http
GET /api/provider-keys?workspaceId=00000000-0000-0000-0000-000000000001
```

The response includes safe metadata only. It does not return decrypted provider keys.

### Test A Provider Key

```http
POST /api/provider-keys/test
```

Body:

```json
{
  "workspaceId": "00000000-0000-0000-0000-000000000001",
  "provider": "openai",
  "actorId": "demo-user",
  "dryRun": true
}
```

V8.2 uses a deterministic provider test simulation so the product can be demonstrated without live API spend. The next iteration should replace this with real provider SDK calls.

## Production Notes

- API routes currently use the Supabase service role client. V8.1/V8.3 should connect them to authenticated workspace membership.
- Decryption is intentionally isolated in `lib/security/provider-key-crypto.ts`.
- Provider key values should never be sent back to the client.
- The router should only receive decrypted keys inside server-side provider execution paths.
- Audit logging is part of the product experience, not only an internal debug tool.

## Next Steps

- Add Clerk Organizations and workspace membership enforcement.
- Replace simulated key tests with real low-cost provider health checks.
- Connect the routing engine to workspace-scoped keys.
- Add per-provider budget caps and automatic fallback policies.
- Add a key rotation workflow with owner notifications.
