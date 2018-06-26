import shelf from '../shelf';

describe('shelf reducer', () => {
  const parts = {
    refinementMenuVO: {
      '@class': 'com.endeca.infront.cartridge.AZRefinementMenuVO',
      listOfRelatedPartsAndProducts: [
        {
          '@class': 'com.autozone.catalog.dto.RelatedPartTypeVO',
          relatedPartType: true,
          name: 'Hood Scoop',
          id: null,
          url: '/exterior-dress-up/hood-scoop'
        },
        {
          '@class': 'com.autozone.catalog.dto.RelatedPartTypeVO',
          relatedPartType: true,
          name: 'Ignition Rotor',
          id: null,
          url: '/ignition-tune-up-and-routine-maintenance/ignition-rotor'
        },
        {
          '@class': 'com.autozone.catalog.dto.RelatedPartTypeVO',
          relatedPartType: true,
          name: 'Spark Plug - Performance',
          id: null,
          url:
            '/ignition-tune-up-and-routine-maintenance/spark-plug-performance'
        },
        {
          '@class': 'com.autozone.catalog.dto.RelatedPartTypeVO',
          relatedPartType: false,
          name: 'Lubricant/Grease',
          id: null,
          url: '/greases-and-gear-oil/lubricant-grease'
        },
        {
          '@class': 'com.autozone.catalog.dto.RelatedPartTypeVO',
          relatedPartType: false,
          name: 'Manuals and Software',
          id: null,
          url: '/manuals-and-repair-software/manuals-and-software'
        }
      ],
      refinementMenuList: [
        {
          '@type': 'RefinementMenu',
          displayName: 'Brand',
          'endeca:auditInfo': {
            'ecr:innerPath': 'leftContent[1]/navigation[0]',
            'ecr:resourcePath':
              '/content/Web/Web Browse Pages/Product Shelf Page - DEFAULT'
          },
          name: 'Brand',
          ancestors: [],
          dimensionName: 'Brand',
          whyPrecedenceRuleFired: null,
          multiSelect: false,
          refinements: [
            {
              contentPath: '/parts',
              '@class': 'com.endeca.infront.cartridge.model.Refinement',
              navigationState:
                '/2010-Acura-RDX-AWD/Spark-Plug/Autolite-Double-Plat/_/N-jwss9Z1to41tZ1z13jvz?seourl=%2Fexternal-engine%2Fspark-plug',
              siteRootPath: '/pages',
              siteState: {
                validSite: true,
                contentPath:
                  '/pages/parts/external-engine/spark-plug/_/N-1to41t',
                '@class': 'com.endeca.infront.site.model.SiteState',
                siteDisplayName: 'Autozoneen',
                matchedUrlPattern: null,
                siteDefinition: {
                  '@class': 'com.endeca.infront.site.model.SiteDefinition',
                  displayName: 'Autozoneen',
                  patterns: [],
                  id: '/Autozoneen',
                  urlPattern: null,
                  filterStateConfiguration: null
                },
                siteId: '/Autozoneen',
                properties: {}
              },
              count: 1,
              label: 'Autolite Double Plat',
              properties: {
                seoUrl: '/external-engine/spark-plug?filters=4294943855'
              },
              multiSelect: false
            },
            {
              contentPath: '/parts',
              '@class': 'com.endeca.infront.cartridge.model.Refinement',
              navigationState:
                '/2010-Acura-RDX-AWD/Spark-Plug/Autolite-XP-Iridium/_/N-jwss9Z1to41tZ1z13ips?seourl=%2Fexternal-engine%2Fspark-plug',
              siteRootPath: '/pages',
              siteState: {
                validSite: true,
                contentPath:
                  '/pages/parts/external-engine/spark-plug/_/N-1to41t',
                '@class': 'com.endeca.infront.site.model.SiteState',
                siteDisplayName: 'Autozoneen',
                matchedUrlPattern: null,
                siteDefinition: {
                  '@class': 'com.endeca.infront.site.model.SiteDefinition',
                  displayName: 'Autozoneen',
                  patterns: [],
                  id: '/Autozoneen',
                  urlPattern: null,
                  filterStateConfiguration: null
                },
                siteId: '/Autozoneen',
                properties: {}
              },
              count: 1,
              label: 'Autolite XP Iridium',
              properties: {
                seoUrl: '/external-engine/spark-plug?filters=4294942336'
              },
              multiSelect: false
            },
            {
              contentPath: '/parts',
              '@class': 'com.endeca.infront.cartridge.model.Refinement',
              navigationState:
                '/2010-Acura-RDX-AWD/Spark-Plug/Champion-Copper/_/N-jwss9Z1to41tZ1z13ii1?seourl=%2Fexternal-engine%2Fspark-plug',
              siteRootPath: '/pages',
              siteState: {
                validSite: true,
                contentPath:
                  '/pages/parts/external-engine/spark-plug/_/N-1to41t',
                '@class': 'com.endeca.infront.site.model.SiteState',
                siteDisplayName: 'Autozoneen',
                matchedUrlPattern: null,
                siteDefinition: {
                  '@class': 'com.endeca.infront.site.model.SiteDefinition',
                  displayName: 'Autozoneen',
                  patterns: [],
                  id: '/Autozoneen',
                  urlPattern: null,
                  filterStateConfiguration: null
                },
                siteId: '/Autozoneen',
                properties: {}
              },
              count: 1,
              label: 'Champion Copper',
              properties: {
                seoUrl: '/external-engine/spark-plug?filters=4294942057'
              },
              multiSelect: false
            },
            {
              contentPath: '/parts',
              '@class': 'com.endeca.infront.cartridge.model.Refinement',
              navigationState:
                '/2010-Acura-RDX-AWD/Spark-Plug/NGK-Laser-Iridium/_/N-jwss9Z1to41tZ1z137z3?seourl=%2Fexternal-engine%2Fspark-plug',
              siteRootPath: '/pages',
              siteState: {
                validSite: true,
                contentPath:
                  '/pages/parts/external-engine/spark-plug/_/N-1to41t',
                '@class': 'com.endeca.infront.site.model.SiteState',
                siteDisplayName: 'Autozoneen',
                matchedUrlPattern: null,
                siteDefinition: {
                  '@class': 'com.endeca.infront.site.model.SiteDefinition',
                  displayName: 'Autozoneen',
                  patterns: [],
                  id: '/Autozoneen',
                  urlPattern: null,
                  filterStateConfiguration: null
                },
                siteId: '/Autozoneen',
                properties: {}
              },
              count: 1,
              label: 'NGK Laser Iridium',
              properties: {
                seoUrl: '/external-engine/spark-plug?filters=4294928415'
              },
              multiSelect: false
            },
            {
              contentPath: '/parts',
              '@class': 'com.endeca.infront.cartridge.model.Refinement',
              navigationState:
                '/2010-Acura-RDX-AWD/Spark-Plug/Pulstar/_/N-jwss9Z1to41tZ1z12ttb?seourl=%2Fexternal-engine%2Fspark-plug',
              siteRootPath: '/pages',
              siteState: {
                validSite: true,
                contentPath:
                  '/pages/parts/external-engine/spark-plug/_/N-1to41t',
                '@class': 'com.endeca.infront.site.model.SiteState',
                siteDisplayName: 'Autozoneen',
                matchedUrlPattern: null,
                siteDefinition: {
                  '@class': 'com.endeca.infront.site.model.SiteDefinition',
                  displayName: 'Autozoneen',
                  patterns: [],
                  id: '/Autozoneen',
                  urlPattern: null,
                  filterStateConfiguration: null
                },
                siteId: '/Autozoneen',
                properties: {}
              },
              count: 1,
              label: 'Pulstar',
              properties: {
                seoUrl: '/external-engine/spark-plug?filters=4294910063'
              },
              multiSelect: false
            }
          ]
        }
      ]
    },
    '@class': 'com.endeca.infront.cartridge.AZShelfPageVO',
    azshelfPageRecordsVO: {
      currentPageURL:
        '/parts/external-engine/spark-plug/_/N-1to41t?seourl=/external-engine/spark-plug',
      '@class': 'com.endeca.infront.cartridge.AZShelfPageRecordsVO',
      firstRecNum: 0,
      recordsList: [
        {
          productReviewsEnabled: true,
          techNote: null,
          skuReviewEnabled: true,
          vendorId: 3455,
          lifetimeWarranty: false,
          alternatePartNumber: null,
          techNotes: null,
          partTypeId: 33,
          skuNumber: 417863,
          oemQuickNote: null,
          locationFilter: '',
          brand: 'Autolite XP Iridium',
          partType: null,
          productImageUrl:
            '/images/MEDIA_ProductCatalog/m3490104_prd-Spark-Plug.jpg',
          aqCodes: [],
          brandName: null,
          shoprunnerElegible: false,
          count: 0,
          active: true,
          numRecords: 0,
          oemPartNumber: null,
          name: 'Spark Plug',
          brandNode: null,
          itemIdentifier: '417863_0_0_',
          oemBrand: null,
          productRepositoryId: '33-0',
          records: null,
          totalPrice: null,
          vehiclSpecific: true,
          description: 'Autolite XP Iridium/Spark Plug',
          techNoteCode: 0,
          lineCode: 'AUT',
          seoUrl:
            '/external-engine/spark-plug/autolite-xp-iridium-spark-plug/417863_0_0',
          detailsAction: {
            contentPath: '/parts',
            '@class': 'com.endeca.infront.cartridge.model.RecordAction',
            siteRootPath: '/pages',
            siteState: null,
            label: null,
            recordState:
              '?R=PARTS%7Csku-417863..33-0.33-0.catalog10001.en__US%7C%7C%7C3921002%7C62254'
          },
          nonAppLabels: null,
          oemTechNote: null,
          imageUrl: null,
          overrideImgBlocking: true,
          '@class': 'com.autozone.catalog.dto.EndecaProductRecord',
          labeledProperties: {},
          recordType: 'app',
          itemIdentifierFlag: null,
          quickNoteCode: 0,
          vdpAttributeValuesFromAQs: '',
          warrantyMonths: 0,
          application: '',
          oemInfo: null,
          systemCode: 0,
          repositoryId: '417863',
          vehicleFitmentLabel: 'VehicleSpecific Products',
          weightInPounds: 0,
          attributes: {},
          partNumber: 'XP5701',
          quickNote: null,
          category: null,
          accessory: false,
          properties: []
        },
        {
          productReviewsEnabled: true,
          techNote: null,
          skuReviewEnabled: true,
          vendorId: 3741,
          lifetimeWarranty: false,
          alternatePartNumber: null,
          techNotes: null,
          partTypeId: 33,
          skuNumber: 255814,
          oemQuickNote: null,
          locationFilter: '',
          brand: 'NGK Laser Iridium',
          partType: null,
          productImageUrl:
            '/images/MEDIA_ProductCatalog/m3490104_prd-Spark-Plug.jpg',
          aqCodes: [],
          brandName: null,
          shoprunnerElegible: false,
          count: 0,
          active: true,
          numRecords: 0,
          oemPartNumber: null,
          name: 'Spark Plug',
          brandNode: null,
          itemIdentifier: '255814_0_0_',
          oemBrand: null,
          productRepositoryId: '33-0',
          records: null,
          totalPrice: null,
          vehiclSpecific: true,
          description: 'NGK Laser Iridium/Spark Plug',
          techNoteCode: 0,
          lineCode: 'NGK',
          seoUrl:
            '/external-engine/spark-plug/ngk-laser-iridium-spark-plug/255814_0_0',
          detailsAction: {
            contentPath: '/parts',
            '@class': 'com.endeca.infront.cartridge.model.RecordAction',
            siteRootPath: '/pages',
            siteState: null,
            label: null,
            recordState:
              '?R=PARTS%7Csku-255814..33-0.33-0.catalog10001.en__US%7C%7C%7C3830201%7C64710'
          },
          nonAppLabels: null,
          oemTechNote: null,
          imageUrl: null,
          overrideImgBlocking: true,
          '@class': 'com.autozone.catalog.dto.EndecaProductRecord',
          labeledProperties: {},
          recordType: 'app',
          itemIdentifierFlag: null,
          quickNoteCode: 0,
          vdpAttributeValuesFromAQs: '',
          warrantyMonths: 0,
          application: '',
          oemInfo: null,
          systemCode: 0,
          repositoryId: '255814',
          vehicleFitmentLabel: 'VehicleSpecific Products',
          weightInPounds: 0,
          attributes: {},
          partNumber: '1402',
          quickNote: null,
          category: null,
          accessory: false,
          properties: []
        },
        {
          productReviewsEnabled: true,
          techNote: null,
          skuReviewEnabled: true,
          vendorId: 313,
          lifetimeWarranty: false,
          alternatePartNumber: null,
          techNotes: null,
          partTypeId: 33,
          skuNumber: 417824,
          oemQuickNote: null,
          locationFilter: '',
          brand: 'Autolite Double Plat',
          partType: null,
          productImageUrl:
            '/images/MEDIA_ProductCatalog/m3490104_prd-Spark-Plug.jpg',
          aqCodes: [],
          brandName: null,
          shoprunnerElegible: false,
          count: 0,
          active: true,
          numRecords: 0,
          oemPartNumber: null,
          name: 'Spark Plug',
          brandNode: null,
          itemIdentifier: '417824_0_0_',
          oemBrand: null,
          productRepositoryId: '33-0',
          records: null,
          totalPrice: null,
          vehiclSpecific: true,
          description: 'Autolite Double Plat/Spark Plug',
          techNoteCode: 0,
          lineCode: 'AUT',
          seoUrl:
            '/external-engine/spark-plug/autolite-double-plat-spark-plug/417824_0_0',
          detailsAction: {
            contentPath: '/parts',
            '@class': 'com.endeca.infront.cartridge.model.RecordAction',
            siteRootPath: '/pages',
            siteState: null,
            label: null,
            recordState:
              '?R=PARTS%7Csku-417824..33-0.33-0.catalog10001.en__US%7C%7C%7C3921002%7C59574'
          },
          nonAppLabels: null,
          oemTechNote: null,
          imageUrl: null,
          overrideImgBlocking: true,
          '@class': 'com.autozone.catalog.dto.EndecaProductRecord',
          labeledProperties: {},
          recordType: 'app',
          itemIdentifierFlag: null,
          quickNoteCode: 0,
          vdpAttributeValuesFromAQs: '',
          warrantyMonths: 0,
          application: '',
          oemInfo: null,
          systemCode: 0,
          repositoryId: '417824',
          vehicleFitmentLabel: 'VehicleSpecific Products',
          weightInPounds: 0,
          attributes: {},
          partNumber: 'APP5701',
          quickNote: null,
          category: null,
          accessory: false,
          properties: []
        },
        {
          productReviewsEnabled: true,
          techNote: null,
          skuReviewEnabled: true,
          vendorId: 125,
          lifetimeWarranty: false,
          alternatePartNumber: null,
          techNotes: null,
          partTypeId: 33,
          skuNumber: 561716,
          oemQuickNote: null,
          locationFilter: '',
          brand: 'Champion Copper',
          partType: null,
          productImageUrl:
            '/images/MEDIA_ProductCatalog/m3490104_prd-Spark-Plug.jpg',
          aqCodes: [],
          brandName: null,
          shoprunnerElegible: false,
          count: 0,
          active: true,
          numRecords: 0,
          oemPartNumber: null,
          name: 'Spark Plug',
          brandNode: null,
          itemIdentifier: '561716_0_0_',
          oemBrand: null,
          productRepositoryId: '33-0',
          records: null,
          totalPrice: null,
          vehiclSpecific: true,
          description: 'Champion Copper/Spark Plug',
          techNoteCode: 0,
          lineCode: 'CHA',
          seoUrl:
            '/external-engine/spark-plug/champion-copper-spark-plug/561716_0_0',
          detailsAction: {
            contentPath: '/parts',
            '@class': 'com.endeca.infront.cartridge.model.RecordAction',
            siteRootPath: '/pages',
            siteState: null,
            label: null,
            recordState:
              '?R=PARTS%7Csku-561716..33-0.33-0.catalog10001.en__US%7C%7C%7C4747901%7C56471'
          },
          nonAppLabels: null,
          oemTechNote: null,
          imageUrl: null,
          overrideImgBlocking: true,
          '@class': 'com.autozone.catalog.dto.EndecaProductRecord',
          labeledProperties: {},
          recordType: 'app',
          itemIdentifierFlag: null,
          quickNoteCode: 0,
          vdpAttributeValuesFromAQs: '',
          warrantyMonths: 0,
          application: '',
          oemInfo: null,
          systemCode: 0,
          repositoryId: '561716',
          vehicleFitmentLabel: 'VehicleSpecific Products',
          weightInPounds: 0,
          attributes: {},
          partNumber: '990',
          quickNote: null,
          category: null,
          accessory: false,
          properties: []
        },
        {
          productReviewsEnabled: true,
          techNote:
            'With plasma core; inconel electrode material; 26.5 mm reach; 12 mm thread diameter; resistor; gasket seat',
          skuReviewEnabled: true,
          vendorId: 3867,
          lifetimeWarranty: false,
          alternatePartNumber: null,
          techNotes: [
            'With plasma core; inconel electrode material; 26.5 mm',
            'reach; 12 mm thread diameter; resistor; gasket seat'
          ],
          partTypeId: 33,
          skuNumber: 459064,
          oemQuickNote: null,
          locationFilter: '',
          brand: 'Pulstar',
          partType: null,
          productImageUrl:
            '/images/MEDIA_ProductCatalog/m3490104_prd-Spark-Plug.jpg',
          aqCodes: [],
          brandName: null,
          shoprunnerElegible: false,
          count: 0,
          active: true,
          numRecords: 0,
          oemPartNumber: null,
          name: 'Spark Plug',
          brandNode: null,
          itemIdentifier: '459064_912260_0_',
          oemBrand: null,
          productRepositoryId: '33-0',
          records: null,
          totalPrice: null,
          vehiclSpecific: true,
          description: 'Pulstar/Spark Plug',
          techNoteCode: 912260,
          lineCode: 'ENP',
          seoUrl:
            '/external-engine/spark-plug/pulstar-spark-plug/459064_912260_0',
          detailsAction: {
            contentPath: '/parts',
            '@class': 'com.endeca.infront.cartridge.model.RecordAction',
            siteRootPath: '/pages',
            siteState: null,
            label: null,
            recordState:
              '?R=PARTS%7Csku-459064..33-0.33-0.catalog10001.en__US%7C%7C912260%7C3745001%7C66493'
          },
          nonAppLabels: null,
          oemTechNote: null,
          imageUrl: null,
          overrideImgBlocking: true,
          '@class': 'com.autozone.catalog.dto.EndecaProductRecord',
          labeledProperties: {},
          recordType: 'app',
          itemIdentifierFlag: null,
          quickNoteCode: 0,
          vdpAttributeValuesFromAQs: '',
          warrantyMonths: 0,
          application: '',
          oemInfo: null,
          systemCode: 0,
          repositoryId: '459064',
          vehicleFitmentLabel: 'VehicleSpecific Products',
          weightInPounds: 0,
          attributes: {},
          partNumber: 'GG1H10',
          quickNote: null,
          category: null,
          accessory: false,
          properties: []
        }
      ],
      recsPerPage: 12,
      totalNumrecords: 5
    }
  };
  const priceDetails = {
    preferredStoreNumber: '117',
    aZBadgesFlagVO: {
      eligibleForNextDay: false,
      '@class': 'com.autozone.diy.vo.AZBadgesFlagVO',
      dealAvailable: false,
      vehicleFit: false
    },
    '@class': 'com.autozone.diy.vo.AZCatalogShelfPageVO',
    catalogVehicleId: '',
    skuPricingAndAvailability: {
      lowestPrice: 0,
      corePriceAvailable: true,
      rebateUrl: null,
      vendorId: null,
      bopusStore: false,
      productLine: null,
      storePickupCSSClass: null,
      SRElegible: false,
      configurableSkuMessage: null,
      shipToHomeCSSClass: null,
      storePickupLabel: 'Store Pick Up',
      shipToHomeLabel: 'Ship To Home',
      skuId: '319465',
      highestPrice: 0,
      '@class': 'com.autozone.diy.commerce.pricing.AZPricingDealsInfo',
      onlineStockLabel: null,
      productId: null,
      rebatesAvaialble: false,
      shipToHomeStockLabel: 'Not Available',
      skuAddedTocart: false,
      storePickupAvailable: false,
      dealAvailable: false,
      skuUnavailable: false,
      storePickupStockLabel: 'Out of Stock',
      skuAvailabilityInfo: {
        unAvailableInStoreAndVdpStore: false,
        lowestPrice: null,
        unavailOnlineQoh: false,
        hubAvail: false,
        storeAvail: true,
        availableInOnline: false,
        webCorePrice: null,
        availableInVdpOnline: false,
        shippingAvailabilityMessage: null,
        availableInStore: true,
        storeTotalPrice: '209.99',
        orderByMessage: null,
        showSearchAnotherStoreLink: false,
        storeRetailPrice: '191.99',
        unAvailableInOnlineAndVdpOnline: true,
        unavailQoh: true,
        eligibleForNextDay: null,
        item: null,
        '@class': 'com.autozone.diy.valueobject.SKUAvailabilityPriceInfo',
        webRetailPrice: null,
        webTotalPrice: null,
        availableForDirectShipping: false,
        exceptionItem: false,
        storeCorePrice: '18.0',
        availableInVdpStore: false,
        messageCutOffTime: null,
        nextDayAvailableMessage: null,
        skuid: '319465'
      },
      estimatedDeliveryMessage: 'Not Available',
      shipToHomeAvailable: false,
      dealUrl: false,
      configurableSku: false,
      retailPrice: 191.99,
      categoryId: null,
      corePrice: 18
    },
    warranty: '3 years',
    azVehicleFitproductResponseVO: {
      '@class': 'com.autozone.diy.vo.AZVehicleFitProductResponseVO',
      vehicleDescription: null,
      vehicleFit: false,
      showYmme: true
    }
  };
  test('should return the initial state for shelf data', () => {
    expect(shelf(undefined, {})).toEqual({
      readyStatus: 'PARTS_INVALID',
      isList: true,
      parts: {},
      skuIds: [],
      relatedParts: {},
      relatedProducts: {},
      err: null,
      cartSuccess: {},
      cartItems: [],
      cartSuccessNote: false,
      productImageUrl: ''
    });
  });

  test('should handle SET_VIEW', () => {
    expect(
      shelf(undefined, {
        type: 'SET_VIEW',
        view: false
      })
    ).toEqual({
      readyStatus: 'SET_VIEW_SUCCESS',
      parts: {},
      skuIds: [],
      relatedParts: {},
      relatedProducts: {},
      err: null,
      isList: false,
      cartSuccess: {},
      cartItems: [],
      cartSuccessNote: false,
      productImageUrl: ''
    });
  });

  test('should handle PARTS_SUCCESS', () => {
    expect(
      shelf(undefined, {
        type: 'PARTS_SUCCESS',
        data: parts
      })
    ).toEqual({
      readyStatus: 'PARTS_SUCCESS',
      parts,
      skuIds: [],
      relatedParts: {},
      relatedProducts: {},
      err: null,
      isList: true,
      cartSuccess: {},
      cartItems: [],
      cartSuccessNote: false,
      productImageUrl: ''
    });
  });

  test('should handle PARTS_FAILURE', () => {
    expect(
      shelf(undefined, {
        type: 'PARTS_FAILURE',
        err: 'Oops! Something went wrong.'
      })
    ).toEqual({
      readyStatus: 'PARTS_FAILURE',
      err: 'Oops! Something went wrong.',
      parts: {},
      skuIds: [],
      relatedParts: {},
      relatedProducts: {},
      isList: true,
      cartSuccess: {},
      cartItems: [],
      cartSuccessNote: false,
      productImageUrl: ''
    });
  });

  test('should handle PARTS_REQUESTING', () => {
    expect(
      shelf(undefined, {
        type: 'PARTS_REQUESTING'
      })
    ).toEqual({
      readyStatus: 'PARTS_REQUESTING',
      isList: true,
      parts: {},
      skuIds: [],
      relatedParts: {},
      relatedProducts: {},
      err: null,
      cartSuccess: {},
      cartItems: [],
      cartSuccessNote: false,
      productImageUrl: ''
    });
  });

  xtest('should handle PRICE_SUCCESS', () => {
    expect(
      shelf(undefined, {
        type: 'PRICE_SUCCESS',
        data: priceDetails,
        skuIds: [12345, 12348, 12458]
      })
    ).toEqual({
      readyStatus: 'PRICE_SUCCESS',
      err: null,
      parts: {},
      skuIds: [12345, 12348, 12458],
      relatedParts: {},
      relatedProducts: {},
      isList: true,
      cartSuccess: {},
      cartItems: [],
      cartSuccessNote: false,
      productImageUrl: ''
    });
  });

  test('should handle ADD_TO_CART_SUCCESS', () => {
    expect(
      shelf(undefined, {
        type: 'ADD_TO_CART_SUCCESS',
        data: { atgResponse: {} }
      })
    ).toEqual({
      readyStatus: 'ADD_TO_CART_SUCCESS',
      err: null,
      parts: {},
      skuIds: [],
      relatedParts: {},
      relatedProducts: {},
      isList: true,
      cartSuccess: { atgResponse: {} },
      cartItems: [],
      cartSuccessNote: true,
      productImageUrl: ''
    });
  });
});
