const NEXTDNS_ENDPOINT = "https://api.nextdns.io";
const API_KEY = ""; // Replace this with your NextDNS API. You can obtain the API from NextDNS -> Account
const PROFILE_ID = ""; // Replace this with your NextDNS Profile ID. You can obtain the ID from Setup page , under EndPoint.
const API_KEY_HEADER = {
  "X-Api-Key": API_KEY,
};

export async function getProfiles() {
  const option = {
    method: "GET",
    headers: API_KEY_HEADER,
  };
  try {
    const response = await fetch(`${NEXTDNS_ENDPOINT}/profiles/${PROFILE_ID}`, option);
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function addDomainToDenyList(denyDomainObject) {
  const option = {
    method: "POST",
    headers: { ...API_KEY_HEADER, "Content-Type": "application/json" },
    body: JSON.stringify(denyDomainObject),
  };
  try {
    await fetch(`${NEXTDNS_ENDPOINT}/profiles/${PROFILE_ID}/denylist`, option);
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function resetDenyList() {
  const option = {
    method: "PUT",
    headers: { ...API_KEY_HEADER, "Content-Type": "application/json" },
    body: JSON.stringify([]),
  };
  try {
    await fetch(`${NEXTDNS_ENDPOINT}/profiles/${PROFILE_ID}/denylist`, option);
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function getDenyList() {
  const option = {
    method: "GET",
    headers: { ...API_KEY_HEADER },
  };
  try {
    const response = await fetch(`${NEXTDNS_ENDPOINT}/profiles/${PROFILE_ID}/denylist`, option);
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
