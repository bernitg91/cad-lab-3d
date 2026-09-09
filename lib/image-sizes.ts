export function containedImageSizes(sizes: string, imageRatio: number, frameRatio: number) {
  const scale = Math.min(1, imageRatio / frameRatio);
  if (scale === 1) return sizes;
  return sizes.split(",").map(size => {
    // Keep the media condition unchanged; scale only its source-size length.
    const condition = size.match(/^(\s*\([^)]*:[^)]*\)\s+)(.*)$/);
    const prefix = condition?.[1] ?? "";
    const length = condition?.[2] ?? size;
    return prefix + length.replace(/([\d.]+)(vw|px|rem)/g, (_, number, unit) => `${(Number(number) * scale).toFixed(2)}${unit}`);
  }).join(",");
}
