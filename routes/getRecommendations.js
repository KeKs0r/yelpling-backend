module.exports = {
    method: 'GET',
    path: '/',
    config: {
      // auth: 'simple',
      handler: function (request, reply) {
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
