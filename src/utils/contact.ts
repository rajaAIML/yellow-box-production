export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ContactFormResult {
  success: boolean;
  message: string;
}

type ContactProvider = (data: ContactFormData) => Promise<ContactFormResult>;

let provider: ContactProvider | null = null;

export function setContactProvider(fn: ContactProvider): void {
  provider = fn;
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validateContactForm(data: ContactFormData): string | null {
  if (!data.name.trim()) return 'Please enter your name.';
  if (!data.email.trim()) return 'Please enter your email.';
  if (!validateEmail(data.email)) return 'Please enter a valid email address.';
  if (!data.message.trim()) return 'Please enter a message.';
  if (data.message.trim().length < 10) return 'Message must be at least 10 characters.';
  return null;
}

export async function submitContactForm(data: ContactFormData): Promise<ContactFormResult> {
  const error = validateContactForm(data);
  if (error) {
    return { success: false, message: error };
  }

  if (provider) {
    return provider(data);
  }

  await new Promise((resolve) => setTimeout(resolve, 800));
  return {
    success: true,
    message: 'Thank you. Your message has been received.',
  };
}
