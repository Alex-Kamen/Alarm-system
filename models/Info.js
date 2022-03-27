export default {
  RESISTIVITY: 0.017,

  CROSS_SECTION_LIST: [
    {
      amperage: 11,
      section: 0.5
    },
    {
      amperage: 15,
      section: 0.75
    },
    {
      amperage: 17,
      section: 1
    },
    {
      amperage: 23,
      section: 1.5
    },
    {
      amperage: 26,
      section: 2
    },
    {
      amperage: 30,
      section: 2.5
    },
    {
      amperage: 41,
      section: 4
    },
    {
      amperage: 50,
      section: 6
    },
    {
      amperage: 80,
      section: 10
    },
    {
      amperage: 100,
      section: 16
    },
    {
      amperage: 140,
      section: 25
    },
    {
      amperage: 170,
      section: 35
    },
  ],

  sectionByAmperage(amperage) {
    for (const section of this.CROSS_SECTION_LIST) {
      if (amperage < section.amperage) {
        return section.section;
      }
    }

    return null;
  }
}
