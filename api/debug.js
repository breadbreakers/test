// file: debug-cert.js
import https from "https";

const opts = {
  host: "auth.breadbreakers.sg",
  port: 443,
  servername: "auth.breadbreakers.sg", // force SNI
  method: "GET",
  path: "/",
};

const req = https.request(opts, (res) => {
  console.log("statusCode:", res.statusCode);
  const sock = res.socket;
  // getPeerCertificate(true) returns full chain
  const peer = sock.getPeerCertificate(true);
  console.log("peer cert (leaf):", peer.subject);
  if (peer.issuer) console.log("leaf issuer:", peer.issuer);
  if (Array.isArray(peer.raw) || typeof peer === "object") {
    // print chain if available
    console.log("full certificate chain (getPeerCertificate(true)):");
    console.dir(peer, { depth: 2 });
  }
  res.on("data", () => {});
  res.on("end", () => process.exit(0));
});

req.on("error", (err) => {
  console.error("request error:", err);
  process.exit(2);
});
req.end();
