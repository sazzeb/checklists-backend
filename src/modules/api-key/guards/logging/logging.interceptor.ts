import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
    UseInterceptors,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class RequestResponseLoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const req = context.switchToHttp().getRequest();
        const res = context.switchToHttp().getResponse();
        const { method, url } = req;
        const now = Date.now();

        return next.handle().pipe(
            tap(() => {
                const { statusCode } = res;
                console.log(
                    `Outgoing response: ${method} ${url} [${statusCode}] - ${Date.now() - now}ms`
                );
            })
        );
    }
}

export function LogRequestResponse() {
    return UseInterceptors(RequestResponseLoggingInterceptor);
}
