import { RouteRecordRaw, createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
import { routes } from '@/shared/constants/routes';

const routeConfig: Array<RouteRecordRaw> = [
  {
    ...routes.login,
    component: () => import(/* webpackChunkName: "login" */ '@/pages/login/LoginPage.vue'),
  },
  {
    ...routes.dashboard,
    component: () =>
      import(/* webpackChunkName: "dashboard" */ '@/pages/dashboard/DashboardPage.vue'),
  },
  {
    ...routes.registrationB2B,
    component: () =>
      import(
        /* webpackChunkName: "registrationB2B" */ '@/pages/registration/RegistrationB2BWrapper.vue'
      ),
  },
  {
    ...routes.registrationB2BAgreements,
    component: () =>
      import(
        /* webpackChunkName: "registrationB2BAgreements" */ '@/pages/registration/RegistrationB2BAgreementsPage.vue'
      ),
  },
  {
    ...routes.clients,
    component: () => import(/* webpackChunkName: "clients" */ '@/pages/client/ClientsPage.vue'),
  },
  {
    ...routes.clientDetails,
    path: routes.clientDetails.path(':id'),
    component: () =>
      import(/* webpackChunkName: "clientDetails" */ '@/pages/client/ClientPageWrapper.vue'),
  },
  {
    ...routes.clientEdit,
    path: routes.clientEdit.path(':id'),
    component: () =>
      import(/* webpackChunkName: "clientEdit" */ '@/pages/client/ClientEditPage.vue'),
  },
  {
    ...routes.clientContactEdit,
    path: routes.clientContactEdit.path(':id', ':contactId'),
    component: () =>
      import(
        /* webpackChunkName: "clientContactEdit" */ '@/pages/clientContacts/ClientContactEditPage.vue'
      ),
  },
  {
    ...routes.clientContacts,
    path: routes.clientContacts.path(':id'),
    component: () =>
      import(
        /* webpackChunkName: "clientContactEdit" */ '@/pages/clientContacts/ClientContactsPage.vue'
      ),
  },
  {
    ...routes.clientOrders,
    path: routes.clientOrders.path(':id'),
    component: () =>
      import(
        /* webpackChunkName: "clientOrders" */ '@/pages/clientOrders/ClientOrdersPageWrapper.vue'
      ),
  },
  {
    ...routes.clientAddresses,
    path: routes.clientAddresses.path(':id'),
    component: () =>
      import(
        /* webpackChunkName: "clientAddresses" */ '@/pages/clientAddresses/ClientAddressesPageWrapper.vue'
      ),
  },
  {
    ...routes.clientAddress,
    path: routes.clientAddress.path(':id', ':addressId'),
    component: () =>
      import(
        /* webpackChunkName: "clientAddresses" */ '@/pages/clientAddresses/ClientAddressEditPage.vue'
      ),
  },
  {
    ...routes.clientOffers,
    path: routes.clientOffers.path(':id'),
    component: () =>
      import(/* webpackChunkName: "clientOffers" */ '@/pages/clientOffers/ClientOffersPage.vue'),
  },
  {
    ...routes.clientOrderDetails,
    path: routes.clientOrderDetails.path(':id', ':orderId'),
    component: () =>
      import(
        /* webpackChunkName: "clientOrderDetails" */ '@/pages/clientOrderDetails/ClientOrderDetailsPageWrapper.vue'
      ),
  },
  {
    ...routes.clientPaymentMethods,
    path: routes.clientPaymentMethods.path(':clientId'),
    component: () =>
      import(
        /* webpackChunkName: "clientPaymentMethods" */ '@/pages/clientPaymentDetails/ClientPaymentMethodsPage.vue'
      ),
  },
  {
    ...routes.importedClients,
    component: () =>
      import(
        /* webpackChunkName: "importedClients" */ '@/pages/importedClient/ImportedClientsPage.vue'
      ),
  },
  {
    ...routes.importedClientRegistration,
    component: () =>
      import(
        /* webpackChunkName: "ImportedClientRegistrationPage" */ '@/pages/importedClient/ImportedClientRegistrationWrapper.vue'
      ),
  },
  {
    ...routes.importedClientAgreement,
    component: () =>
      import(
        /* webpackChunkName: "importedClientAgreement" */ '@/pages/importedClient/ImportedClientAgreementPage.vue'
      ),
  },
  {
    ...routes.ordersHistory,
    component: () =>
      import(/* webpackChunkName: "ordersHistory" */ '@/pages/order/OrderHistoryPage.vue'),
  },
  {
    ...routes.addressEmployees,
    path: routes.addressEmployees.path(':clientId', ':addressId'),
    component: () =>
      import(
        /* webpackChunkName: "addressEmployees" */ '@/pages/addressEmployees/AddressEmployeesPage.vue'
      ),
  },
  {
    ...routes.orderCreate,
    component: () =>
      import(/* webpackChunkName: "orderCreate" */ '@/pages/order/OrderCreatePage.vue'),
  },
  {
    ...routes.productRequests,
    path: routes.productRequests.path,
    component: () =>
      import(
        /* webpackChunkName: "productRequests" */ '@/pages/productRequest/ProductRequestsPage.vue'
      ),
  },
  {
    ...routes.productRequest,
    path: routes.productRequest.path(':productId'),
    component: () =>
      import(
        /* webpackChunkName: "productRequest" */ '@/pages/productRequest/ProductRequestDetailsPage.vue'
      ),
  },
  {
    ...routes.productRequestCreate,
    path: routes.productRequestCreate.path(':productId'),
    component: () =>
      import(
        /* webpackChunkName: "productRequestCreate" */ '@/pages/productRequest/ProductRequestCreatePage.vue'
      ),
  },
  {
    ...routes.stock,
    path: routes.stock.path,
    component: () => import(/* webpackChunkName: "productStocks" */ '@/pages/stock/StockPage.vue'),
  },
  {
    ...routes.search,
    path: routes.search.path,
    component: () => import(/* webpackChunkName: "search" */ '@/pages/search/SearchPage.vue'),
  },
  {
    ...routes.offers,
    component: () => import(/* webpackChunkName: "offers" */ '@/pages/offer/OffersPage.vue'),
  },
  {
    ...routes.offerDetails,
    path: routes.offerDetails.path(':offerId'),
    component: () =>
      import(/* webpackChunkName: "offerDetails" */ '@/pages/offer/OfferDetailsPage.vue'),
  },
  {
    ...routes.productDetails,
    path: routes.productDetails.path(':productId'),
    component: () =>
      import(
        /* webpackChunkName: "productDetails" */ '@/pages/productDetails/ProductDetailsWrapper.vue'
      ),
  },
  {
    ...routes.offerCreate,
    path: routes.offerCreate.path,
    component: () =>
      import(/* webpackChunkName: "offerCreate" */ '@/pages/offer/OfferCreatePage.vue'),
  },
  {
    ...routes.offerToOrder,
    path: routes.offerToOrder.path(':offerId'),
    component: () =>
      import(/* webpackChunkName: "offerToOrder" */ '@/pages/offerToOrder/OfferToOrderPage.vue'),
  },
  {
    ...routes.specialProcurements,
    path: routes.specialProcurements.path,
    component: () =>
      import(
        /* webpackChunkName: "specialProcurements" */ '@/pages/specialProcurement/SpecialProcurementsPage.vue'
      ),
  },
  {
    ...routes.specialProcurementDetails,
    path: routes.specialProcurementDetails.path(':procurementId'),
    component: () =>
      import(
        /* webpackChunkName: "specialProcurement" */ '@/pages/specialProcurement/SpecialProcurementDetailsPage.vue'
      ),
  },
  {
    ...routes.specialProcurementCreate,
    path: routes.specialProcurementCreate.path,
    component: () =>
      import(
        /* webpackChunkName: "specialProcurementCreate" */ '@/pages/specialProcurement/SpecialProcurementCreatePage.vue'
      ),
  },
  {
    ...routes.experimentalSignature,
    path: routes.experimentalSignature.path,
    component: () =>
      import(/* webpackChunkName: "signature" */ '@/pages/signature/SignaturePage.vue'),
  },
  {
    ...routes.claims,
    component: () => import(/* webpackChunkName: "claims" */ '@/pages/claims/ClaimsPage.vue'),
  },
  {
    ...routes.claimOrder,
    path: routes.claimOrder.path(':orderId'),
    component: () =>
      import(/* webpackChunkName: "claimOrder" */ '@/pages/claims/ClaimProductSelectionPage.vue'),
  },
  {
    ...routes.claimReasons,
    path: routes.claimReasons.path(':orderId'),
    component: () =>
      import(/* webpackChunkName: "claimReasons" */ '@/pages/claims/ClaimReasonsPage.vue'),
  },
  {
    ...routes.claimBarcodes,
    path: routes.claimBarcodes.path(':orderId'),
    component: () =>
      import(
        /* webpackChunkName: "claimBarcodeCreation" */ '@/pages/claims/ClaimBarcodeCreationPage.vue'
      ),
  },
];

export const router = createRouter({
  history: process.env.VUE_APP_ENABLE_HASH_ROUTER
    ? createWebHashHistory(process.env.BASE_URL)
    : createWebHistory(process.env.BASE_URL),
  routes: routeConfig,
  scrollBehavior: (to, from, scroll) => (from.path === to.path ? { top: scroll?.top } : { top: 0 }),
});
