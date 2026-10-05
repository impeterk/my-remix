import { createRouter, type MiddlewareContext } from "remix/router";
import { render } from "remix/middleware/render";
import { staticFiles } from "remix/middleware/static";

import controller from "./actions/controller.tsx";
import { assets } from "./assets.ts";
import { routes } from "./routes.ts";
import { compression as compression_middleware } from "remix/middleware/compression";

const renderMiddleware = render({ assets });
type AppContext = MiddlewareContext<[typeof renderMiddleware]>;

declare module "remix" {
  interface RouterTypes {
    context: AppContext;
  }
}

export const router = createRouter<AppContext>({
  middleware: [
    compression_middleware(),
    staticFiles("./public", { index: false }),
    renderMiddleware,
  ],
});

router.map(routes, controller);
