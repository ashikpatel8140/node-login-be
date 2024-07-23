export const checkKeys = async (data: Record<string, unknown>, keys: string[]): Promise<boolean> => {
  // Use some/every for efficient early termination
  return keys.every(key => data.hasOwnProperty(key) && data[key] !== undefined && data[key] !== null);
};
