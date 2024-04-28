export function ConvertToNumber(id: any): number | null {
  const converted = Number(id);
  return isNaN(converted) ? null : converted;
}
