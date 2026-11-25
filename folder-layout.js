const DEFAULT_FOLDER_LAYOUT = "date-site";

function resolveFolderLayout(stored) {
  if (["date-site", "site-date", "site", "flat"].includes(stored.folderLayout)) {
    return stored.folderLayout;
  }
  if (stored.saveByDate === false) {
    return stored.saveBySite === true || stored.saveBySite === "true" ? "site" : "flat";
  }
  return DEFAULT_FOLDER_LAYOUT;
}

async function readCollectorOptions(defaults) {
  const keys = [...Object.keys(defaults), "saveByDate", "saveBySite"];
  const stored = await chrome.storage.sync.get(keys);
  return { ...defaults, ...stored, folderLayout: resolveFolderLayout(stored) };
}
