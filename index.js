import { addDomainToDenyList, resetDenyList } from "./nextdns-api.js";
import { downloadFiles, parseFile } from "./file-handler.js";

const BLOCKLIST_URLS = []; // Add blocklist url

async function uploadDomainToNextDNS() {
  try {
    // Reset deny list before uploading new domains
    await resetDenyList();

    console.log("Start downloading blocklist files...");
    await downloadFiles(BLOCKLIST_URLS);

    const denyDomainList = parseFile();
    const denyFormatDomainList = denyDomainList.map((data) => ({
      id: data,
      active: true,
    }));

    console.log("All blocklist files downloaded successfully.");
    console.log("Start uploading to NextDNS...");

    // Upload each domain to NextDNS
    for (let i = 0; i < denyFormatDomainList.length; i++) {
      const domainObject = denyFormatDomainList[i];
      const percentage = ((i + 1) / denyFormatDomainList.length) * 100;
      console.clear();
      console.log(
        `Uploading(${i + 1}/${denyFormatDomainList.length}): ${percentage.toFixed(2)}% completed`
      );

      await addDomainToDenyList(domainObject);

      // Sleep for 1.5 seconds before processing the next domain
      await new Promise((resolve) => setTimeout(resolve, 1500));
    }

    console.log("NextDNS upload completed.");
  } catch (error) {
    console.error("Error uploading to NextDNS:", error);
  }
}

async function main() {
  await uploadDomainToNextDNS();
}

main();
