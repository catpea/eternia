export default {
  common: {
    author: "catpea",
  },

  project: [
    {
      name: "test-database-one",
      title: "Test Database One",
      description: "Home of Test Database One",
      subtitle: "A Sample Database",
      icon: "collection-play",

      format: "v3",
      order: "latest",

      transformers: [
        { name: 'verifyIntegrity', options: {}, },
        { name: 'bustRecordCache', options: {}, },
        { name: 'initializeRecord', options: {}, },
        { name: 'processYaml', options: {}, },
        { name: 'processMd', options: {}, },
        { name: 'processHtml', options: {}, },
        { name: 'ensureBootstrap', options: {}, },
        { name: 'ensurePrint', options: {}, },
        { name: 'ensureText', options: {}, },
        { name: 'ensureImages', options: {}, },
        { name: 'ensureLinks', options: {}, },
        { name: 'validateSchema', options: {} },
        { name: 'saveRecord', options: {}, },
        { name: 'verifyCacheIntegrity', options: {}, },
        { name: 'downloadYoutubeThumbnails', options:{}},
        { name: 'createCoverFromThumbnails', options: {}, },
        { name: 'resizeCoverImages', options: {}, },
        { name: 'verifyPresenceOfImages', options: {}, },
      ],

      generators: [
        { name: 'copyLocalLinks', options:{} },
        { name: 'copyImages', options:{} },
        { name: 'createMirror', options:{} },
        { name: 'createWebsite', options:{} },
        // { name: 'verifyWebsite', options:{} },
      ],

      // list of projects required by this project, these will be built first.
      dependencies: [],

      // Objects to use for website
      objects: ["dist/test-database-one/test-database-one.json"],

      // Website mountpoints
      mounts: [
        { directory: "dist/test-database-one/image", mountpoint: "/image" },
        { directory: "dist/test-database-one/audio", mountpoint: "/audio" },
      ],

      // Social Network Links For Website Plugin
      links: [
        {
          name: "Example",
          icon: "link-45deg",
          href: "https://example.com",
        },
      ],
      network: [
        {
          name: "Example",
          icon: "link-45deg",
          href: "https://example.com",
        },
      ],
    },

    {
      name: "test-database-two",
      title: "Test Database Two",
      description: "Home of Test Database One and Two",
      subtitle: "A Sample Database",
      icon: "collection-play",

      format: "v3",
      order: "latest",


      transformers: [
        { name: 'verifyIntegrity', options: {}, },
        { name: 'bustRecordCache', options: {}, },
        { name: 'initializeRecord', options: {}, },
        { name: 'processYaml', options: {}, },
        { name: 'processMd', options: {}, },
        { name: 'processHtml', options: {}, },
        { name: 'ensureBootstrap', options: {}, },
        { name: 'ensurePrint', options: {}, },
        { name: 'ensureText', options: {}, },
        { name: 'ensureImages', options: {}, },
        { name: 'ensureLinks', options: {}, },
        { name: 'validateSchema', options: {} },
        { name: 'saveRecord', options: {}, },
        { name: 'verifyCacheIntegrity', options: {}, },
        { name: 'downloadYoutubeThumbnails', options:{}},
        { name: 'createCoverFromThumbnails', options: {}, },
        { name: 'resizeCoverImages', options: {}, },
        { name: 'verifyPresenceOfImages', options: {}, },
      ],

      generators: [
        { name: 'copyLocalLinks', options:{} },
        { name: 'copyImages', options:{} },
        { name: 'createMirror', options:{} },
        { name: 'createWebsite', options:{} },
        // { name: 'verifyWebsite', options:{} },
      ],





      // list of projects required by this project, these will be built first.
      dependencies: ["test-database-one"],

      // Objects to use for website
      objects: [
        "dist/test-database-one/test-database-one.json",
        "dist/test-database-two/test-database-two.json",
      ],

      // Website mountpoints
      mounts: [
        { directory: "dist/test-database-one/image", mountpoint: "/image" },
        { directory: "dist/test-database-one/audio", mountpoint: "/audio" },
        { directory: "dist/test-database-two/image", mountpoint: "/image" },
        { directory: "dist/test-database-two/audio", mountpoint: "/audio" },
      ],

      // Social Network Links For Website Plugin
      links: [
        {
          name: "Example",
          icon: "link-45deg",
          href: "https://example.com",
        },
      ],
      network: [
        {
          name: "Example",
          icon: "link-45deg",
          href: "https://example.com",
        },
      ],
    },
  ],
};
