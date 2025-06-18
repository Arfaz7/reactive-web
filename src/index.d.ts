declare module 'ndjson-rxjs' {
  import { Observable } from 'rxjs';

  export function stream<T>(source: string): Observable<T>;
  export function extractStream<T>(source: string): Observable<T>;
}