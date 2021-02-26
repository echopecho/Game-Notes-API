const bcrypt = require("bcryptjs");
const db = require("../dbConfig.js");

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(() => {
      // Inserts seed entries
      const hash = bcrypt.hashSync("test123", 10);
      return knex("users").insert({
        username: "testuser",
        password: hash,
        email: "test@test.com",
        firstName: "John",
        lastName: "Johnson",
      });
    })
    .then(() => {
      return knex("campaigns").del();
    })
    .then(() => {
      return knex("kingdoms").del();
    })
    .then(() => {
      return knex("notes").del();
    })
    .then(async () => {
      const user = await knex("users").first();
      await knex("campaigns").insert([
        {
          name: "The Wild West",
          DM: "Dave",
          description:
            "Shoot first, shoot again and when everyone is dead try to ask a few questions.",
          author_id: user.id,
        },
        {
          name: "Wildmount",
          DM: "Mercer",
          description: "Critical Role",
          author_id: user.id,
        },
      ]);
      const campaigns = await knex("campaigns");
      await knex("kingdoms").insert([
        {
          name: "The Empire",
          description: "The greatest place on Earth",
          author_id: user.id,
          campaign_id: campaigns[0].id,
        },
        {
          name: "The Bad Place",
          description: "Obviously the home of evil",
          author_id: user.id,
          campaign_id: campaigns[0].id,
        },
        {
          name: "Taldorei",
          description: "Where all the things are happen",
          author_id: user.id,
          campaign_id: campaigns[1].id,
        },
      ]);
      const kingdoms = await knex("kingdoms");
      await knex("locations").insert([
        {
          name: "The Capital",
          description: "The largest city in the realm",
          kingdom_id: kingdoms[0].id,
          campaign_id: campaigns[0].id,
          author_id: user.id,
        },
        {
          name: "Small Villiage",
          description: "Tiny little town",
          kingdom_id: kingdoms[0].id,
          campaign_id: campaigns[0].id,
          author_id: user.id,
        },
        {
          name: "Doomtown",
          description: "Nothing good happens here",
          kingdom_id: kingdoms[1].id,
          campaign_id: campaigns[0].id,
          author_id: user.id,
        },
        {
          name: "Creepy Forest",
          description: "Did you hear that...?",
          kingdom_id: kingdoms[1].id,
          campaign_id: campaigns[0].id,
          author_id: user.id,
        },
        {
          name: "Whitestone",
          description: "Where whitestone comes from",
          kingdom_id: kingdoms[2].id,
          campaign_id: campaigns[0].id,
          author_id: user.id,
        },
        {
          name: "Daggermaw",
          description: "Bad shit went down",
          kingdom_id: kingdoms[2].id,
          campaign_id: campaigns[0].id,
          author_id: user.id,
        },
      ]);
      const locations = await knex("locations");
      await knex("journies").insert([
        {
          location_id: locations[0].id,
          campaign_id: campaigns[0].id,
          author_id: user.id,
        },
        {
          location_id: locations[1].id,
          campaign_id: campaigns[0].id,
          author_id: user.id,
        },
        {
          location_id: locations[2].id,
          campaign_id: campaigns[0].id,
          author_id: user.id,
        },
      ]);
      await knex("notes").insert([
        {
          text: "We started here",
          location_id: locations[0].id,
          campaign_id: campaigns[0].id,
          author_id: user.id,
          created_at: new Date(Date.UTC(2020, 1, 1)),
        },
        {
          text: "We met a guy",
          location_id: locations[0].id,
          campaign_id: campaigns[0].id,
          author_id: user.id,
          created_at: new Date(Date.UTC(2020, 1, 1)),
        },
        {
          text: "We fought a bear",
          location_id: locations[0].id,
          campaign_id: campaigns[0].id,
          author_id: user.id,
          created_at: new Date(Date.UTC(2020, 1, 1)),
        },
        {
          text: "Beginning of session two",
          location_id: locations[0].id,
          campaign_id: campaigns[0].id,
          author_id: user.id,
          created_at: new Date(Date.UTC(2020, 1, 2)),
        },
        {
          text: "End of session two",
          location_id: locations[0].id,
          campaign_id: campaigns[0].id,
          author_id: user.id,
          created_at: new Date(Date.UTC(2020, 1, 2)),
        },
        {
          text: "Session three",
          location_id: locations[0].id,
          campaign_id: campaigns[0].id,
          author_id: user.id,
          created_at: new Date(Date.UTC(2020, 1, 3)),
        },
        {
          text: "Beginning of session four",
          location_id: locations[0].id,
          campaign_id: campaigns[0].id,
          author_id: user.id,
          created_at: new Date(Date.UTC(2020, 1, 4)),
        },
        {
          text: "End of session four",
          location_id: locations[0].id,
          campaign_id: campaigns[0].id,
          author_id: user.id,
          created_at: new Date(Date.UTC(2020, 1, 4)),
        },
      ]);
    });
};
