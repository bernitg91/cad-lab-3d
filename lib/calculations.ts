export function pieceCount(value: number) {
  return Number.isFinite(value) ? Math.max(1, Math.floor(value)) : 1;
}

/** g / (cm² × g/cm³ × 100 cm/m), with the supplied filament diameter in mm. */
export function filamentLengthMeters(weightGrams: number, density: number, diameterMm = 1.75) {
  if (![weightGrams, density, diameterMm].every(Number.isFinite) || weightGrams < 0 || density <= 0 || diameterMm <= 0) return null;
  const crossSectionCm2 = Math.PI * (diameterMm / 20) ** 2;
  return weightGrams / (crossSectionCm2 * density * 100);
}

export function eligibleMaterials<T extends { name: string }>(materials: T[], flexible: boolean): T[] {
  return flexible ? materials.filter((material) => material.name === "TPU") : materials;
}
