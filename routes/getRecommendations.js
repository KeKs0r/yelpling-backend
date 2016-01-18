const Map = require('immutable').Map;
const BUSINESS = 'business'
const BAR = 'Bar';
const REST = 'Restaurant';
const CLUB = 'Club';
const CAFE = 'Cafe';
const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.`

const locationFixtures =  new Map()
  .set(1, new Map({
    business_id: 1,
    name: 'Hopfenreich',
    typ: BUSINESS,
    categories: [BAR, REST],
    longitude: 13.32080,
    latitude: 52.51275,
    stars: 3,
    review_count: 12,
    image: 'http://lorempixel.com/600/337/nightlife/1',
    description: lorem,
    optDescription: lorem,
    city: 'Los Angeles'
  }))
  .set(2, new Map({
    business_id: 2,
    name: 'Schnelle Quelle',
    typ: BUSINESS,
    longitude: 13.32724,
    latitude: 52.51745,
    stars: 3,
    categories: [BAR],
    review_count: 12,
    image: 'http://lorempixel.com/600/337/nightlife/2',
    description: lorem,
    city: 'Los Angeles'
  }))
  .set(3, new Map({
    business_id: 3,
    name: 'Burgermeister',
    typ: BUSINESS,
    stars: 3,
    categories: [REST, BAR],
    review_count: 12,
    longitude: 13.34080,
    latitude: 52.51375,
    image: 'http://lorempixel.com/600/337/nightlife/3',
    description: lorem,
    optDescription: lorem,
    city: 'Los Angeles'
  }))
  .set(4, new Map({
    business_id: 4,
    name: 'Piris',
    typ: BUSINESS,
    stars: 3,
    categories: [REST],
    review_count: 12,
    longitude: 13.31080,
    latitude: 52.51875,
    image: 'http://lorempixel.com/600/337/nightlife/4',
    city: 'New York'
  }))

module.exports = {
    method: 'GET',
    path: '/',
    config: {
      cors: true,
      // auth: 'simple',
      handler: function (request, reply) {
        return reply(locationFixtures.toList());
        const server = request.server;
          const userid = request.headers.authorization;
          const query = server.plugins.pg.query;
          const q = `
            SELECT * FROM scores
                  LEFT JOIN locations ON
                      location = business_id
                  WHERE "user" = ${userid}
                  ORDER BY score
          `;
          query(q, (err,res) => {
            if(err){
              return reply(err);
            }
            reply(res.rows);
          })
      }
    }
};
