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
        { name: 'initializeRecord', options: {}, },

      ],

      // list of projects required by this project, these will be built first.
      dependencies: ['test-database-two'],

      // Objects to use for website
      objects: ["dist/test-database-one/test-database-one.json"],

      // Website mountpoints
      mounts: [
        { directory: "dist/test-database-one/image", mountpoint: "/image" },
        { directory: "dist/test-database-one/audio", mountpoint: "/audio" },
      ],

      // Social Network Links For Website Plugin
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

        { name: 'processYaml', options: {}, },
        { name: 'processMd', options: {}, },
        { name: 'processHtml', options: {}, },

        { name: 'createPrint', options: {}, },
        { name: 'createText', options: {}, },

        { name: 'createMetadata', options: {}, },

        { name: 'createRecordImages', options: {}, },
        { name: 'createRecordLocalAssets', options: {}, },
        { name: 'createVideoLinks', options: {}, },

        { name: 'saveRecord', options: {}, },

        //



        { name: 'verifyCacheIntegrity', options: {}, },
        {
          name: 'validateSchema', options: {
            schema: {
              "title": "Record",
              "description": "Data Record",
              "type": "object",

              "properties": {
                "html": {
                  "description": "Simple HTML version of content to display",
                  "type": "string"
                },
                "bootstrap": {
                  "description": "Bootstrap HTML version of content to display",
                  "type": "string"
                },
                "print": {
                  "description": "Printer friendly HTML version of content to display",
                  "type": "string"
                },
                "text": {
                  "description": "Plain text version of content to display",
                  "type": "string"
                },
              },

              "required": [
                "html", "bootstrap", "print", "text"
              ],
            }
          }
        },

        { name: 'downloadVideoThumbnails', options:{}},
        { name: 'createCoverImageFromThumbnails', options: {}, },
        { name: 'resizeCoverImages', options: {}, },

        { name: 'createMirror', options:{} },
        { name: 'createWebsite', options:{} },
        { name: 'verifyFeatures', options:{} },
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
