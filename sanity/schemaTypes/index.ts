import { objectTypes } from "./objects";
import { pageTypes } from "./pages";
import { trip } from "./trip";

export { SINGLETONS } from "./pages";

export const schemaTypes = [trip, ...pageTypes, ...objectTypes];
