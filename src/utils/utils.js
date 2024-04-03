export function validateURL(url) {
  try {
    const newUrl = new URL(url);
    const hostname = newUrl.hostname;
    const wwwIndex = hostname.indexOf("www.");

    if (wwwIndex !== -1) {
      if (hostname.indexOf(".", wwwIndex + 4) === -1) {
        return false;
      }
    }

    const dotIndex = hostname.lastIndexOf(".");
    const lastChar = hostname.charAt(hostname.length - 1);
    if (
      dotIndex === -1 ||
      dotIndex === hostname.length - 1 ||
      !lastChar.match(/[a-zA-Z]/)
    ) {
      return false;
    }

    return (
      (newUrl.protocol === "http:" || newUrl.protocol === "https:") &&
      hostname.includes(".")
    );
  } catch (err) {
    return false;
  }
}

export function convertBytes(length) {
  if (length < 1024) {
    return length + " bytes";
  } else if (length < 1024000) {
    return Math.round(length / 1024) + " KB";
  } else {
    return Math.round(length / 1048576) + " MB";
  }
}
