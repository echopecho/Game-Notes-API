exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("characters")
    .del()
    .then(async () => {
      const { id } = await knex("users").first();
      const campaigns = await knex("campaigns");
      const locations = await knex("locations");

      const data = [
        {
          char_name: "Warion",
          player_name: "Me",
          description: "This is the character I play",
          author_id: id,
          campaign_id: campaigns[0].id,
          location_id: null,
          level: 6,
          class: "Warlock",
          backstory:
            "Parents were killed by bats, so he fights nature dressed as a criminal",
          player_char: 1,
          user_char: 1
        },
        {
          char_name: "Throden",
          player_name: "Jess",
          description: "The worst lizard person",
          author_id: id,
          campaign_id: campaigns[0].id,
          location_id: null,
          level: 6,
          class: "Druid",
          backstory: "Doesn't understand a thing",
          player_char: 1,
          user_char: 0
        },
        {
          char_name: "Johniffer",
          player_name: null,
          description: "D'what!?",
          author_id: id,
          campaign_id: campaigns[0].id,
          location_id: locations[0].id,
          level: 1,
          class: null,
          backstory: "Filler text",
          player_char: 0,
          user_char: 0
        },
        {
          char_name: "Karen",
          player_name: null,
          description: "No manager is safe.",
          author_id: id,
          campaign_id: campaigns[0].id,
          location_id: locations[0].id,
          level: 1,
          class: null,
          backstory: "Filler text",
          player_char: 0,
          user_char: 0
        },
        {
          char_name: "Fjord",
          player_name: null,
          description: "What is he",
          author_id: id,
          campaign_id: campaigns[0].id,
          location_id: locations[1].id,
          level: 1,
          class: "Paladin",
          backstory: "Filler text",
          player_char: 0,
          user_char: 0
        }
      ];

      // Inserts seed entries
      return knex("characters").insert(data);
    });
};
