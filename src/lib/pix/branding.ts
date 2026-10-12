/**
 * Visitor-facing assistant name for Pixelette Holdings.
 *
 * Kept out of any env-reading module so client components can import it without
 * pulling server configuration into the browser bundle.
 *
 * Internal export names keep the PIX_T_ prefix from the reference implementation
 * so the copied UI does not need a rename sweep; the strings visitors see are
 * Holdings-specific.
 */

export const PIX_T_NAME = 'Pix H';
export const PIX_T_DESCRIPTOR = 'site assistant';
