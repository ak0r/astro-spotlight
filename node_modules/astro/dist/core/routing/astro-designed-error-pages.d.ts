import type { ManifestData, RouteData } from '../../@types/astro.js';
export declare const DEFAULT_404_ROUTE: RouteData;
export declare const DEFAULT_500_ROUTE: RouteData;
export declare function ensure404Route(manifest: ManifestData): ManifestData;
export declare function default404Page({ pathname }: {
    pathname: string;
}): Promise<Response>;
export declare namespace default404Page {
    var isAstroComponentFactory: boolean;
}
