import {redirect} from 'react-router';
import type {Route} from './+types/pages.protocol';
import {PROTOCOL_PATH} from '~/lib/ferrum-tiers';

// Canonical Protocol page lives on the Storefront PDP. Old /pages/protocol
// links resolve there with a permanent redirect for SEO continuity.
export async function loader(_args: Route.LoaderArgs) {
  throw redirect(PROTOCOL_PATH, 301);
}

export default function ProtocolPageRedirect() {
  return null;
}
