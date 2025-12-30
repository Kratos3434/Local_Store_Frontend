export const isValidEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

export function isValidCanadianPostalCode(code: string): boolean {
  if (!code) return false;

  // Remove spaces and make uppercase
  const normalized = code.toUpperCase().replace(/\s+/g, '');

  // Canadian postal code regex (no D, F, I, O, Q, U)
  const regex = /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z]\d[ABCEGHJ-NPRSTV-Z]\d$/;

  return regex.test(normalized);
}

export const errorMessage = (message: string) => {
    return {
        message
    }
}

export function isDateTodayOrPast(input: Date | string): boolean {
  const date = new Date(input);
  if (isNaN(date.getTime())) return false;

  const today = new Date();
  
  // Normalize both to start of day (local time)
  date.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  return date <= today;
}

export function isTimeBetween8pmAnd7am(date: Date): boolean {
  const hours = date.getHours(); // 0–23

  return hours >= 20 || hours < 7;
}

export function isValidPhoneNumber(phone: string): boolean {
  return /^(\+1)?[2-9]\d{2}[2-9]\d{2}\d{4}$/.test(
    phone.replace(/\D/g, "")
  );
}