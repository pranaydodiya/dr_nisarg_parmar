# MongoDB connection: fix `querySrv ECONNREFUSED`

If you see:

```text
querySrv ECONNREFUSED _mongodb._tcp.cluster0.xxxxx.mongodb.net
```

your network or DNS is blocking the **SRV** lookup that `mongodb+srv://` uses. Use a **standard** connection string instead.

## 1. Get the standard connection string in Atlas

1. Log in to [MongoDB Atlas](https://cloud.mongodb.com).
2. Open your **Project** → **Database** → select your cluster.
3. Click **Connect**.
4. Choose **Drivers** (or “Connect your application”).
5. In the connection string section, look for:
   - **“Use a connection string”** or **“Connection string”**,
   - and an option like **“Standard”** or **“Standard connection string”** (instead of SRV).
6. Copy that string. It will look like:
   - `mongodb://` (not `mongodb+srv://`)
   - with explicit hosts, e.g. `cluster0-shard-00-00.dvlyf91.mongodb.net:27017,cluster0-shard-00-01....`
   - and options like `?ssl=true&replicaSet=atlas-xxxxx&authSource=admin`

If you don’t see “Standard”:

- In the cluster view, open the **“...”** menu → **“Get connection string”** (or similar) and check for a **Standard** / non-SRV option.
- Or in **Connect** → **Connect using MongoDB Compass** (or another tool) and see if a non-SRV URI is shown there.

## 2. Use it in this project

1. Open **`.env`** in the project root.
2. Set **`MONGODB_URI`** to the **standard** string you copied (the one starting with `mongodb://`):

   ```env
   MONGODB_URI=mongodb://USERNAME:PASSWORD@cluster0-shard-00-00.dvlyf91.mongodb.net:27017,cluster0-shard-00-01.dvlyf91.mongodb.net:27017,cluster0-shard-00-02.dvlyf91.mongodb.net:27017/?ssl=true&replicaSet=atlas-xxxxx&authSource=admin
   ```

   Replace `USERNAME`, `PASSWORD`, and the host/replica set names with the values from Atlas.

3. Restart the dev server and try again (e.g. seed or login).

## 3. Other checks

- **Network access:** In Atlas → **Network Access** → ensure your current IP (or `0.0.0.0/0` for testing) is allowed.
- **DNS:** Try switching your machine’s DNS to **8.8.8.8** (Google) or **1.1.1.1** (Cloudflare) and retry with the **SRV** string; if it works, the issue is your default DNS.
- **VPN / firewall:** Try from another network (e.g. mobile hotspot) or with VPN off to see if SRV starts working.
