const globalApiDomain = 'https://www.autozone.com';
module.exports = {
  global: {
    apiDomainUrl: 'https://www.autozone.com'
  },
  app: {
    title: 'AutoZone | %s',
    titleTemplate: 'AutoZone.com | %s',
    meta: [
      {
        name: 'description',
        content:
          'AutoZone is the leading auto parts retailer.You will always find the best replacement parts,aftermarket accessories for cars,trucks and SUVs online or In-store.Get yours today!'
      }
    ],
    script: [
      {
        type: 'application/ld+json',
        innerHTML: `{
             "@context": "http://schema.org", 
             "@type": "Organization", 
             "name": "AutoZone (AZO)", 
             "url": "https://www.autozone.com", 
             "logo": "http://www.autozone.com/images/common/azLogo_color_sm.png",
              "contactPoint" : [ { "@type" : "ContactPoint", "telephone" : "+1-800-288-6966", "contactType" : ["Sales","Customer Service"], "contactOption" : "TollFree", "areaServed" : "US", "availableLanguage" : ["English", "Spanish"] } ], "sameAs" : [ "https://en.wikipedia.org/wiki/AutoZone", "https://www.facebook.com/autozone", "https://twitter.com/autozone", "https://www.youtube.com/user/AutoZone" ]
          }`
      },
      {
        type: 'application/ld+json',
        innerHTML: `{
             "@context": "http://schema.org", "@type": "WebSite", "name": "AutoZone",
              "url": ${globalApiDomain}, "potentialAction": { "@type": "SearchAction", "target": "https://www.autozone.com/searchresult?searchText={search_term_string}", "query-input": "required name=search_term_string" }
          }`
      },
      {
        type: 'application/ld+json',
        innerHTML: `{
            "@context": "http://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement":[
              {
              "@type": "ListItem",
              "position": 1,
              "item":
                {
                  "@id": "https://www.autozone.com",
                  "name": "Home" 
                }
              } 
            ]
          }`
      }
    ]
  }
};
