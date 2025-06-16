import PocketBase from "pocketbase";

export async function getPB() {
  const pbURL = process.env.PB_URL;
  if (!pbURL) {
    throw new Error("PB_URL not set");
  }
  const adminEmail = process.env.PB_ADMIN_EMAIL;
  const adminPassword = process.env.PB_ADMIN_PASSWORD;
  if (!adminEmail) {
    throw new Error("PB_ADMIN_EMAIL not set");
  }
  if (!adminPassword) {
    throw new Error("PB_ADMIN_PASSWORD not set");
  }

  const pb = new PocketBase(pbURL);
  await pb
    .collection("_superusers")
    .authWithPassword(adminEmail, adminPassword);

  if (!pb.authStore.isSuperuser) {
    throw new Error("Not a superuser");
  }
  return pb;
}
