/** Local preview bounds, not a substitute for an authenticated upload service. */
export const profileImageLimit = 2 * 1024 * 1024;
export function profileImageError(
  type: string,
  size: number,
  header?: Uint8Array,
) {
  if (!["image/png", "image/jpeg"].includes(type))
    return "Choose a PNG or JPEG image.";
  if (!Number.isSafeInteger(size) || size <= 0 || size > profileImageLimit)
    return "Choose an image smaller than 2 MB.";
  if (header) {
    const png = [137, 80, 78, 71, 13, 10, 26, 10].every(
      (byte, index) => header[index] === byte,
    );
    const jpeg = header[0] === 255 && header[1] === 216 && header[2] === 255;
    if ((type === "image/png" && !png) || (type === "image/jpeg" && !jpeg))
      return "The image content does not match its file type.";
  }
  return "";
}
