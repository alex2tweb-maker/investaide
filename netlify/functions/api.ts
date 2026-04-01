import express from "express";
import serverless from "serverless-http";

const app = express();
app.use(express.json());

const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN || "pat1DtBL7vnQMauGx.158bfcac6637df545117810a8bfdbfc97874dea677a933b429b6963aa77a6141";
const AIRTABLE_APP_ID = process.env.AIRTABLE_APP_ID || "appMygdNfMb2CaYO6";

const router = express.Router();

router.get("/webinars", async (req, res) => {
  try {
    const response = await fetch(`https://api.airtable.com/v0/${AIRTABLE_APP_ID}/event`, {
      headers: {
        Authorization: `Bearer ${AIRTABLE_TOKEN}`,
      },
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching webinars:", error);
    res.status(500).json({ error: "Failed to fetch webinars" });
  }
});

router.get("/conseillers", async (req, res) => {
  try {
    const response = await fetch(`https://api.airtable.com/v0/${AIRTABLE_APP_ID}/conseiller`, {
      headers: {
        Authorization: `Bearer ${AIRTABLE_TOKEN}`,
      },
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching conseillers:", error);
    res.status(500).json({ error: "Failed to fetch conseillers" });
  }
});

router.post("/register", async (req, res) => {
  const MAKE_WEBHOOK_URL = process.env.MAKE_WEBHOOK_URL || "https://hook.eu1.make.com/k31chwwcdrtkbol6j44raomn8l3ms2kt";
  try {
    const response = await fetch(MAKE_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });
    if (response.ok) {
      res.json({ success: true });
    } else {
      res.status(response.status).json({ error: "Webhook failed" });
    }
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/admin/check-connection", async (req, res) => {
  const results = {
    planning: { status: "pending", count: 0, error: null },
    conseiller: { status: "pending", count: 0, error: null },
  };

  try {
    // Check planning
    const planningRes = await fetch(`https://api.airtable.com/v0/${AIRTABLE_APP_ID}/event?maxRecords=1`, {
      headers: { Authorization: `Bearer ${AIRTABLE_TOKEN}` },
    });
    if (planningRes.ok) {
      const data = await planningRes.json();
      results.planning.status = "ok";
      results.planning.count = data.records?.length || 0;
    } else {
      results.planning.status = "error";
      results.planning.error = await planningRes.text() as any;
    }

    // Check conseiller
    const conseillerRes = await fetch(`https://api.airtable.com/v0/${AIRTABLE_APP_ID}/conseiller?maxRecords=1`, {
      headers: { Authorization: `Bearer ${AIRTABLE_TOKEN}` },
    });
    if (conseillerRes.ok) {
      const data = await conseillerRes.json();
      results.conseiller.status = "ok";
      results.conseiller.count = data.records?.length || 0;
    } else {
      results.conseiller.status = "error";
      results.conseiller.error = await conseillerRes.text() as any;
    }

    res.json(results);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.use("/api", router);
app.use("/.netlify/functions/api", router);

export const handler = serverless(app);
