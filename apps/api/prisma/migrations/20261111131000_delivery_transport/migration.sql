ALTER TABLE "IdentityDeliveryMessage" ADD COLUMN transport TEXT NOT NULL DEFAULT 'LOCAL';
ALTER TABLE "IdentityDeliveryMessage" ADD CONSTRAINT "IdentityDeliveryMessage_transport_check" CHECK (transport IN ('LOCAL','RESEND','TWILIO'));
