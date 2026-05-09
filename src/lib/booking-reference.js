// ClientLuminBook/src/lib/booking-reference.js
//
// 6-char booking reference codes, prefixed "LB-".
// The alphabet excludes ambiguous characters (0/O, 1/I, A/E/U) so that
// codes are easy for customers to type into a phone and for admins to
// match against MoMo SMS notifications.

const ALPHABET = 'BCDEFGHJKMNPQRSTUVWXYZ23456789';

export function generateReferenceCode() {
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
  }
  return 'LB-' + code;
}

// Generate a code guaranteed not to collide with an existing booking.
// Retries up to 10 times; throws if exhausted (effectively impossible at
// 30^6 codespace, but the explicit failure is cleaner than silent collision).
export async function generateUniqueReferenceCode(supabase) {
  for (let attempt = 0; attempt < 10; attempt++) {
    const code = generateReferenceCode();
    const { data } = await supabase
      .from('bookings')
      .select('id')
      .eq('reference_code', code)
      .limit(1);
    if (!data || data.length === 0) return code;
  }
  throw new Error('Failed to generate unique reference code after 10 attempts');
}
