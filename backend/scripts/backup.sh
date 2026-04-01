#!/bin/bash
# ============================================================================
# MongoDB backup script for Hostinger VPS
# Schedule via cron:  0 2 * * * /path/to/backend/scripts/backup.sh
# Requires: mongodump (install via mongodb-database-tools)
# ============================================================================

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Load env
if [ -f "$SCRIPT_DIR/../.env" ]; then
  export $(grep -v '^#' "$SCRIPT_DIR/../.env" | xargs)
fi

BACKUP_DIR="${BACKUP_DIR:-/var/backups/mongodb}"
RETENTION_DAYS="${RETENTION_DAYS:-7}"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_PATH="$BACKUP_DIR/$TIMESTAMP"

if [ -z "${MONGODB_URI:-}" ]; then
  echo "[backup] ERROR: MONGODB_URI not set" >&2
  exit 1
fi

mkdir -p "$BACKUP_DIR"

echo "[backup] Starting backup → $BACKUP_PATH"
mongodump --uri="$MONGODB_URI" --out="$BACKUP_PATH" --quiet

# Compress
tar -czf "$BACKUP_PATH.tar.gz" -C "$BACKUP_DIR" "$TIMESTAMP"
rm -rf "$BACKUP_PATH"

echo "[backup] Compressed → $BACKUP_PATH.tar.gz"

# Prune old backups
find "$BACKUP_DIR" -name "*.tar.gz" -mtime +"$RETENTION_DAYS" -delete
echo "[backup] Pruned backups older than $RETENTION_DAYS days"

echo "[backup] Done."
