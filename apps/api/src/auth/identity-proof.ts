import { Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'node:async_hooks';
import type { Request } from 'express';
import type { SessionRecord } from '@nestjs/authentication';
/** Request-local bridge from verified OIDC identity to the shared session store. */
@Injectable()
export class IdentityProof {
  private readonly storage = new AsyncLocalStorage<{
    request: Request;
    nativeActor?: SessionRecord;
    user?: { id: string; authVersion: number };
  }>();
  run<T>(
    request: Request,
    action: () => Promise<T>,
    nativeActor?: SessionRecord,
  ) {
    return this.storage.run({ request, nativeActor }, action);
  }
  get request(): Request | undefined {
    return this.storage.getStore()?.request;
  }
  get nativeActor(): SessionRecord | undefined {
    return this.storage.getStore()?.nativeActor;
  }
  prove(user: { id: string; authVersion: number }) {
    const state = this.storage.getStore();
    if (!state) throw new Error('Verified callback context required');
    state.user = { id: user.id, authVersion: user.authVersion };
  }
  version(userId: string) {
    const user = this.storage.getStore()?.user;
    return user?.id === userId ? user.authVersion : undefined;
  }
}
