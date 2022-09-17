export const routes = {
  login: {
    path: '/login',
    name: 'login',
    meta: {
      requiresGuest: true,
    },
  },
  dashboard: {
    path: '/',
    name: 'dashboard',
    meta: {
      requiresAuth: true,
    },
  },
  registrationB2B: {
    path: '/registration',
    name: 'Registration B2B',
    meta: {
      requiresAuth: true,
    },
  },
  registrationB2BAgreements: {
    path: '/registration-agreements',
    name: 'Registration B2B Agreements',
    meta: {
      requiresAuth: true,
    },
  },
  clients: {
    path: '/clients',
    name: 'Clients',
    meta: {
      requiresAuth: true,
    },
  },
  clientDetails: {
    path: (id: string): string => `/clients/${id}`,
    name: 'Client details',
    meta: {
      requiresAuth: true,
    },
  },
  clientEdit: {
    path: (id: string): string => `/clients/${id}/edit`,
    name: 'Client details edit',
    meta: {
      requiresAuth: true,
    },
  },
  clientContacts: {
    path: (id: string): string => `/clients/${id}/contacts`,
    name: 'Client contacts',
    meta: {
      requiresAuth: true,
    },
  },
  clientContactEdit: {
    path: (id: string, contactId: string): string => `/clients/${id}/contacts/${contactId}`,
    name: 'Client contact edit',
    meta: {
      requiresAuth: true,
    },
  },
  clientOrders: {
    path: (id: string): string => `/clients/${id}/orders`,
    name: 'Client orders',
    meta: {
      requiresAuth: true,
    },
  },
  clientAddresses: {
    path: (id: string): string => `/clients/${id}/addresses`,
    name: 'Client addresses',
    meta: {
      requiresAuth: true,
    },
  },
  clientAddress: {
    path: (id: string, addressId: string): string => `/clients/${id}/addresses/${addressId}`,
    name: 'Client address',
    meta: {
      requiresAuth: true,
    },
  },
  clientOffers: {
    path: (id: string): string => `/clients/${id}/offers`,
    name: 'Client offers',
    meta: {
      requiresAuth: true,
    },
  },
  clientOrderDetails: {
    path: (id: string, orderId: string): string => `/clients/${id}/orders/${orderId}`,
    name: 'Client order details',
    meta: {
      requiresAuth: true,
    },
  },
  clientPaymentMethods: {
    path: (clientId: string): string => `/clients/${clientId}/payment-methods`,
    name: 'Client Payment Methods',
    meta: {
      requiresAuth: true,
    },
  },
  importedClients: {
    path: '/imported-clients',
    name: 'Imported clients',
    meta: {
      requiresAuth: true,
    },
  },
  importedClientRegistration: {
    path: '/imported-clients/registration',
    name: 'Imported client registration',
    meta: {
      requiresAuth: true,
    },
  },
  importedClientAgreement: {
    path: '/imported-clients/agreement',
    name: 'Imported client agreement',
    meta: {
      requiresAuth: true,
    },
  },
  ordersHistory: {
    path: '/orders-history',
    name: 'Orders History',
    meta: {
      requiresAuth: true,
    },
  },
  addressEmployees: {
    path: (clientId: string, addressId: string): string =>
      `/clients/${clientId}/addresses/${addressId}/employees`,
    name: 'Address employee List',
    meta: {
      requiresAuth: true,
    },
  },
  orderCreate: {
    path: `/orders/create`,
    name: 'Create order page',
    meta: {
      requiresAuth: true,
    },
  },
  productRequests: {
    path: `/product-requests`,
    name: 'Product requests page',
    meta: {
      requiresAuth: true,
    },
  },
  productRequest: {
    path: (productId: string): string => `/product/${productId}/request`,
    name: 'Product request details',
    meta: {
      requiresAuth: true,
    },
  },
  // TODO: revisit this route. It looks like requests can be independently listed from products.
  productRequestCreate: {
    path: (productId: string): string => `/product/${productId}/request/create`,
    name: 'Request product page',
    meta: {
      requiresAuth: true,
    },
  },
  offers: {
    path: '/offers',
    name: 'Offers',
    meta: {
      requiresAuth: true,
    },
  },
  offerDetails: {
    path: (id: string): string => `/offers/${id}`,
    name: 'Offer details',
    meta: {
      requiresAuth: true,
    },
  },
  offerCreate: {
    path: '/offers/create',
    name: 'Create Offer',
    meta: {
      requiresAuth: true,
    },
  },
  search: {
    path: '/search',
    name: 'Search Results',
    meta: {
      requiresAuth: true,
    },
  },
  stock: {
    path: '/stock',
    name: 'Stock Overview',
    meta: {
      requiresAuth: true,
    },
  },
  productDetails: {
    path: (productId: string): string => `/products/${productId}`,
    name: 'Product details page',
    meta: {
      requiresAuth: true,
    },
  },
  offerToOrder: {
    path: (offerId: string): string => `/offer/${offerId}/convert`,
    name: 'Offer to order page',
    meta: {
      requiresAuth: true,
    },
  },
  specialProcurements: {
    path: '/procurements',
    name: 'Special procurements page',
    meta: {
      requiresAuth: true,
    },
  },
  specialProcurementDetails: {
    path: (procurementId: string): string => `/procurement/${procurementId}`,
    name: 'Special procurement details page',
    meta: {
      requiresAuth: true,
    },
  },
  specialProcurementCreate: {
    path: '/procurements/create',
    name: 'Create Special Procurement',
    meta: {
      requiresAuth: true,
    },
  },
  experimentalSignature: {
    path: '/signature',
    name: 'Signature',
    meta: {
      requiresAuth: true,
    },
  },
  claims: {
    path: '/claims',
    name: 'Claims',
  },
  claimOrder: {
    path: (id: string): string => `/orders/${id}/claim`,
    name: 'Claim order',
    meta: {
      requiresAuth: true,
    },
  },
  claimReasons: {
    path: (id: string): string => `/orders/${id}/claim-reasons`,
    name: 'Claim Reasons',
    meta: {
      requiresAuth: true,
    },
  },
  claimBarcodes: {
    path: (id: string): string => `/orders/${id}/claim-barcodes`,
    name: 'Claim Barcodes',
    meta: {
      requiresAuth: true,
    },
  },
};
