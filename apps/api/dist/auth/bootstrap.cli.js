"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const core_1 = require("@nestjs/core");
const identity_module_1 = require("./identity.module");
const bootstrap_service_1 = require("./bootstrap.service");
const identity_delivery_1 = require("./identity.delivery");
async function main() {
    const command = process.argv[2];
    if (!['operator', 'institution', 'resend', 'retry-delivery'].includes(command))
        throw new Error('Use operator, institution, resend or retry-delivery; provide JSON on stdin, never secrets in arguments');
    let input = '';
    for await (const chunk of process.stdin) {
        input += String(chunk);
        if (Buffer.byteLength(input) > 8192)
            throw new Error('Input too large');
    }
    const app = await core_1.NestFactory.createApplicationContext(identity_module_1.IdentityModule, {
        logger: false,
    });
    try {
        const service = app.get(bootstrap_service_1.IdentityBootstrap);
        const result = command === 'retry-delivery'
            ? await app.get(identity_delivery_1.IdentityDelivery).drain()
            : command === 'operator'
                ? await service.operator(JSON.parse(input))
                : command === 'resend'
                    ? await service.resend(JSON.parse(input))
                    : await service.institution(JSON.parse(input));
        console.log(JSON.stringify(result));
    }
    finally {
        await app.close();
    }
}
if (require.main === module)
    void main().catch(() => {
        console.error('Bootstrap failed. Check authorization, configuration and unique identities; no input values were logged.');
        process.exitCode = 1;
    });
//# sourceMappingURL=bootstrap.cli.js.map