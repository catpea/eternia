export default {

  common: {
    author: 'catpea'
  },

  project:[

    {
      name: 'furkies-purrkies',
      title: 'Cat Pea University',
      description: 'Home of Furkies Purrkies and Westland Warrior',
      destination: './website',

      network: [
        {
          name: 'Urban Dictionary',
          icon: 'link-45deg',
          href: 'https://www.urbandictionary.com/author.php?author=Cat%20Pea',
        },

        {
          name: 'Wayback Machine',
          icon: 'link-45deg',
          href: 'https://web.archive.org/web/*/catpea.com',
        },

        {
          name: 'Dribbble',
          icon: 'link-45deg',
          href: 'https://dribbble.com/catpea',
        },

        {
          name: 'GitLab',
          icon: 'link-45deg',
          href: 'https://gitlab.com/catpea',
        },

        {
          name: 'GitHub',
          icon: 'link-45deg',
          href: 'https://github.com/catpea',
        },
      ],

      dependencies: [
        'furkies-purrkies',
        'westland-warrior',
      ],

      objects: [
        'dist/furkies-purrkies/furkies-purrkies.json',
        'dist/westland-warrior/westland-warrior.json'
      ],

      mounts: [
        { mountpoint: '/image', directory: '/home/meow/Universe/Development/poetry2/dist/furkies-purrkies/image', },
        { mountpoint: '/audio', directory: '/home/meow/Universe/Development/poetry2/dist/furkies-purrkies/audio', },
        { mountpoint: '/image', directory: '/home/meow/Universe/Development/poetry2/dist/westland-warrior/image', },
        { mountpoint: '/audio', directory: '/home/meow/Universe/Development/poetry2/dist/westland-warrior/audio', },
      ],

    },


    {
      name: 'furkies-purrkies-standalone',
      title: 'Furkies Purrkies',
      description: 'Furkies Purrkies Home Page',
      destination: './website',

      network: [
        {
          name: 'Urban Dictionary',
          icon: 'link-45deg',
          href: 'https://www.urbandictionary.com/author.php?author=Cat%20Pea',
        },

        {
          name: 'GitLab',
          icon: 'link-45deg',
          href: 'https://gitlab.com/catpea',
        },

        {
          name: 'GitHub',
          icon: 'link-45deg',
          href: 'https://github.com/catpea',
        },
      ],

      dependencies: [
        'furkies-purrkies',
      ],

      objects: [
        'dist/furkies-purrkies/furkies-purrkies.json',
      ],

      mounts: [
        { mountpoint: '/image', directory: '/home/meow/Universe/Development/poetry2/dist/furkies-purrkies/image', },
        { mountpoint: '/audio', directory: '/home/meow/Universe/Development/poetry2/dist/furkies-purrkies/audio', },
      ]
    },



    {
      name: 'westland-warrior',
      title: 'Westland Warrior',
      description: 'Home of Westland Warrior',
      network: [
        {
          name: 'GitHub',
          icon: 'link-45deg',
          href: 'https://github.com/catpea',
        },
      ],
      destination: './website',
      dependencies: [
        'westland-warrior',
      ],

      objects: [
        'dist/westland-warrior/westland-warrior.json'
      ],

      mounts: [
        { mountpoint: '/image', directory: '/home/meow/Universe/Development/poetry2/dist/westland-warrior/image', },
        { mountpoint: '/audio', directory: '/home/meow/Universe/Development/poetry2/dist/westland-warrior/audio', },
      ]
    },



  ]

}
