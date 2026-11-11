export type LoginMethodSummary = {
  passwordConfigured: boolean;
  email: { address: string; verified: boolean } | null;
  providers: { id: string; provider: string; linkedAt: string }[];
  phone: { number: string; verifiedAt: string } | null;
  institutions: {
    identifier: string;
    kind: string;
    status: string;
    institution: { code: string; name: string; active: boolean };
  }[];
};
