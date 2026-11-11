import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { IdentityModule } from './identity.module';
import { IdentityBootstrap } from './bootstrap.service';
import { IdentityDelivery } from './identity.delivery';
async function main() {
  const command = process.argv[2];
  if (
    !['operator', 'institution', 'resend', 'retry-delivery'].includes(command)
  )
    throw new Error(
      'Use operator, institution, resend or retry-delivery; provide JSON on stdin, never secrets in arguments',
    );
  let input = '';
  for await (const chunk of process.stdin) {
    input += String(chunk);
    if (Buffer.byteLength(input) > 8192) throw new Error('Input too large');
  }
  const app = await NestFactory.createApplicationContext(IdentityModule, {
    logger: false,
  });
  try {
    const service = app.get(IdentityBootstrap);
    const result =
      command === 'retry-delivery'
        ? await app.get(IdentityDelivery).drain()
        : command === 'operator'
          ? await service.operator(JSON.parse(input))
          : command === 'resend'
            ? await service.resend(JSON.parse(input))
            : await service.institution(JSON.parse(input));
    console.log(JSON.stringify(result));
  } finally {
    await app.close();
  }
}
if (require.main === module)
  void main().catch(() => {
    console.error(
      'Bootstrap failed. Check authorization, configuration and unique identities; no input values were logged.',
    );
    process.exitCode = 1;
  });
