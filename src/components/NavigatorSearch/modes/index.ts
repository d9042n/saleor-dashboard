import { MutationFunction } from "@apollo/client";
import { OrderDraftCreateMutation } from "@dashboard/graphql";
import { UseNavigatorResult } from "@dashboard/hooks/useNavigator";
import { IntlShape } from "react-intl";

import { QuickSearchAction, QuickSearchMode } from "../types";
import getCatalogModeActions from "./catalog";
import getCommandModeActions from "./commands";
import getCustomersModeActions from "./customers";
import getDefaultModeActions from "./default";
import getHelpModeActions from "./help";
import getOrdersModeActions from "./orders";
import { ActionQueries } from "./types";

function getModeActions(
  mode: QuickSearchMode,
  query: string,
  intl: IntlShape,
  queries: ActionQueries,
  cbs: {
    createOrder: MutationFunction<OrderDraftCreateMutation, {}>;
    navigate: UseNavigatorResult;
    setMode: (mode: QuickSearchMode) => void;
  },
): QuickSearchAction[] {
  switch (mode) {
    case "catalog":
      return getCatalogModeActions(query, intl, cbs.navigate, queries.catalog);
    case "commands":
      return getCommandModeActions(query, intl, cbs.navigate, cbs.createOrder, cbs.setMode);
    case "customers":
      return getCustomersModeActions(intl, cbs.navigate, queries.customers);
    case "help":
      return getHelpModeActions(query, intl, cbs.setMode);
    case "orders":
      return getOrdersModeActions(intl, cbs.navigate, queries.orders);
    default:
      return getDefaultModeActions(query, intl, cbs.navigate, cbs.createOrder, cbs.setMode);
  }
}

export default getModeActions;
